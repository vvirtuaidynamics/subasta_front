<template>
  <q-page>
    <div id="login" class="page row gradient-bg-blue">
      <div
        id="form"
        :class="
          $q.screen.gt.sm
            ? 'form-div col-6 flex flex-center'
            : 'form-div col-12 flex flex-center'
        "
      >
        <q-card bordered class="shadow-5 login-card q-pb-md">
          <q-card-section class="q-mb-xs">
            <q-avatar
              :style="`${'background: #2c2c2c99'}`"
              class="absolute-center shadow-2"
              size="120px"
              style="border: 2px solid #c0c0c0"
            >
              <q-img
                :src="images.appLogo"
                fit="contain"
                style="width: 110px; height: 110px"
              />
            </q-avatar>

            <q-btn
              id="home"
              class="animated faa-pulse absolute-top-left q-mr-md"
              dense
              flat
              round
              to="/"
            >
              <q-icon name="mdi-home"></q-icon>
              <q-tooltip class="info">
                {{ $t("labelGoHome") }}
              </q-tooltip>
            </q-btn>
          </q-card-section>

          <q-card-section>
            <q-form
              ref="loginForm"
              autocapitalize="off"
              autocomplete="off"
              autocorrect="off"
              class="q-gutter q-gutter-y-sm q-mt-md q-px-md"
              spellcheck="false"
              greedy
            >
              <div class="q-py-xs"></div>

              <q-input
                v-model="formData.username"
                label="usuario"
                :rules="[(val) => !!val || 'Requerido.']"
                @keyup.enter="onSubmit"
              >
                <template v-slot:prepend>
                  <q-icon name="fas fa-user-tie" />
                </template>
              </q-input>
              <q-input
                v-model="formData.password"
                label="Contraseña"
                :type="hidePassword ? 'password' : 'text'"
                :rules="[(val) => !!val || 'Requerido.']"
                @keyup.enter="onSubmit"
              >
                <template v-slot:prepend>
                  <q-icon name="mdi-lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="hidePassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="hidePassword = !hidePassword"
                  />
                </template>
              </q-input>
            </q-form>
          </q-card-section>

          <q-card-section>
            <q-toggle
              v-model="formData.rememberMe"
              checked-icon="check"
              color="positive"
              label="Recuérdame"
              unchecked-icon="clear"
            />
          </q-card-section>

          <q-card-actions class="justify-around items-center">
            <q-btn-component
              label="Autenticarse"
              class="full-width"
              square
              size="md"
              :loading="wait"
              @click="onSubmit"
            ></q-btn-component>
          </q-card-actions>
        </q-card>
      </div>

      <transition
        appear
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight"
      >
        <div v-if="$q.screen.gt.sm" class="logo-div col-6">
          <q-img
            fit="fill"
            class="login-cover-img"
            :src="images.loginCover"
            alt="logo"
          />
        </div>
      </transition>

      <q-bar
        class="login-footer absolute-bottom"
        :class="texts.footer"
        dense
        style="height: 50px"
      >
        <div class="row login-footer-header">
          <q-btn flat @click="navigateTo({ path: '/' })" :title="$t('homeTip')">
            <img :src="images.appLogo" alt="SUBASTA" style=":40px " />

            <div class="text-h6 text-uppercase">
              {{ appConfig.name }}
            </div>
          </q-btn>
        </div>
        <q-space />
        <div class="q-mx-sm">
          {{ $q.platform.is.desktop ? $t("copyright") : "Copyright " }} &copy;
          {{ year }}
        </div>
        <q-separator vertical />
      </q-bar>
    </div>
  </q-page>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useQuasar } from "quasar";
import { $t } from "src/services/i18n";

import QBtnComponent from "src/components/base/QBtnComponent.vue";
import { texts } from "src/config/theme/texts";
import images from "src/config/theme/images";
import appConfig from "src/config/app";

import { useAuthStore } from "src/stores/auth";
import { useRouter } from "vue-router";

const year = new Date().getFullYear();
const $q = useQuasar();

const wait = ref(false);
const loginForm = ref(null);
const hidePassword = ref(true);
// Form Data
const formData = reactive({
  username: "maricela",
  password: "maricela",
  rememberMe: false,
});

const router = useRouter();
const authStore = useAuthStore();

async function onSubmit() {
  loginForm.value.validate().then(async (success) => {
    if (success) {
      try {
        wait.value = true;
        await authStore.login(formData.username, formData.password);
        if (authStore.user.active) {
          if (router.currentRoute.value.query.next) {
            router.replace(router.currentRoute.value.query.next);
          } else {
            router.replace({ name: "crud" });
          }
        } else {
          $q.notify({
            position: "top-right",
            closeBtn: true,
            icon: "fa fa-times-circle",
            message: "Su cuenta ha sido bloqueda, consulte al administrador.",
            type: "negative",
            progress: true,
          });
        }
      } catch (error) {
        $q.notify({
          position: "top-right",
          closeBtn: true,
          icon: "fa fa-times-circle",
          message:
            error.response.message !== undefined
              ? "Usuario o contraseña incorrecta"
              : "No hay conexión con el servidor de base de datos",
          type: "negative",
          progress: true,
        });
      } finally {
        wait.value = false;
      }
    } else {
      $q.notify({
        position: "top-right",
        closeBtn: true,
        icon: "fa fa-times-circle",
        message: "Rectifique los errores",
        type: "negative",
        progress: true,
      });
    }
  });
}
</script>

<style lang="scss" scoped>
#login {
  min-width: 400px;
  min-height: 100vh;
  overflow: hidden;
  background-image: linear-gradient(to bottom, #0e4b8a, #00c6ff);

  .login-card {
    width: 350px;
    border-radius: 15px;
    border: 2px solid #c0c0c0;
  }

  .login-footer {
    background-color: #1976d29f;
    margin: 0;
    padding: 0;
  }

  .login-footer-header {
    min-width: 250px;
    transform: skewX(-10deg) translateX(-50px);
    background-color: $dark;
    margin: 0;
    padding-left: 50px;
    border: solid 1px $dark;

    img {
      margin: 0 10px 0 0;
      max-height: 40px;
    }
  }

  .form-div {
    height: 100vh;
  }

  .logo-div {
    height: 100vh;
  }

  .login-cover-img {
    height: 100vh;
    background-position: center;
    background-size: cover;
    transform: skewX(-10deg) translateX(90px);
    border-left: solid 4px $dark;
    border-top: solid 2px $dark;
  }

  .gradient-bg-blue {
    background: linear-gradient(to bottom, #0e4b8a, #00c6ff);
  }
}
</style>
