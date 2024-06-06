<script setup>
import { reactive, ref, watch, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import { useApp } from "src/composables/useApp";
import { $t } from "src/services/i18n";

// Component
import QButtonComponent from "src/components/base/QButtonComponent.vue";
import DarkSwitcher from "src/components/base/DarkSwitcher.vue";
import LangSwitcher from "src/components/base/LangSwitcher.vue";
import { createRouter as $router } from "vue-router";
import { utils } from "src/helpers/utils";
import { formsStyle } from "src/config/formStyle";

const year = new Date().getFullYear();
const $app = useApp();
const $q = useQuasar();

const {
  appData,
  appDataLoaded,
  Login,
  loading,
  loginRedirect,
  Auth,
  Avatar,
  navigateTo,
} = $app;
const UsernameRule = [(val) => !!val || $t("validations.required")];
const PasswordRule = [(val) => !!val || $t("validations.required")];
const fInputUsername = ref();
const fInputPassword = ref();

// Form Data
const formData = reactive({
  username: "",
  password: "",
  rememberMe: false,
});

function Validate() {
  let result = false;

  fInputUsername.value.validate();
  fInputPassword.value.validate();
  if (fInputUsername.value.hasError || fInputPassword.value.hasError)
    return result;

  return true;
}

function frmReset() {
  formData.username = "";
  formData.password = "";
  fInputUsername.value.focus();
  fInputUsername.value.resetValidation();
  fInputPassword.value.resetValidation();
}

async function onSubmit() {
  $app.setLoading(true);
  if (Validate()) {
    let result = null;
    try {
      result = await Login({
        identity: formData.username.toLowerCase(),
        password: formData.password,
      });
      // console.log("res: ", result);

      if (result) {
        // auth.value.avatar = app_logo.value;
        // $router.push({ name: "app" });
      } else {
        $app.setLoading();
        //await Avatar("");
        frmReset();
        // fInputUsername.value.focus();
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") console.log("error:", error);
      $app.setLoading();
    }
  } else {
    utils.sendMsg({ type: "negative", msg: `${$t("errorValidation")}` });

    if (formData.username.length === 0) fInputUsername.value.focus();
    else if (formData.password.length === 0) fInputPassword.value.focus();
    $app.setLoading();
    return false;
  }
}

onBeforeMount(() => {
  // if (isAuth) {
  //   loginRedirect();
  // }
  // if (!appDataLoaded.value) $app.setAppData();
});

// watch(
//   () => avatar,
//   (newAvatar) => {
//     userAvatar.value = newAvatar;
//   }
// );
</script>

<template>
  <q-page>
    <div id="login" class="full-width no-padding no-margin flex flex-center">
      <div class="div-index-content no-margin no-padding">
        <q-card bordered class="shadow-5 absolute-center login-card">
          <q-card-section class="q-mb-lg">
            <q-avatar
              :style="`${'background: #2c2c2c99'}`"
              class="absolute-center shadow-2"
              size="120px"
              style="border: 2px solid #c0c0c0"
            >
              <q-img
                :src="Auth?.avatar ?? 'src/assets/images/default.png'"
                fit="contain"
                style="width: 110px; height: 110px"
              />
            </q-avatar>

            <dark-switcher
              class="absolute-top-right"
              :model-value="$q.dark.isActive"
              @update="(val) => $q.dark.set(val)"
            />
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
            >
              <div class="q-py-xs"></div>

              <q-input
                ref="fInputUsername"
                v-model="formData.username"
                :label="$t('labels.user')"
                :rules="UsernameRule"
                lazy-rules
                v-bind="formsStyle.text"
                @change="(user) => Avatar(user)"
              >
                <template v-slot:prepend>
                  <q-icon name="fas fa-user-tie" />
                </template>
              </q-input>
              <q-input
                ref="fInputPassword"
                v-model="formData.password"
                :label="$t('labels.password')"
                :rules="PasswordRule"
                lazy-rules
                type="password"
                v-bind="formsStyle.text"
                @keyup.enter="onSubmit()"
              >
                <template v-slot:prepend>
                  <q-icon name="mdi-lock" />
                </template>
              </q-input>
              <div class="q-py-xs"></div>

              <div class="flex bg-image flex-center q-mt-lg"></div>
            </q-form>
          </q-card-section>
          <q-card-section>
            <q-toggle
              v-model="formData.rememberMe"
              checked-icon="check"
              color="positive"
              :label="$t('rememberMe')"
              unchecked-icon="clear"
            />
          </q-card-section>
          <q-card-actions class="justify-around items-center q-pb-lg">
            <q-button-component
              icon="mdi-login"
              :label="$t('login')"
              :title="$t('loginTip')"
              @handleClick="onSubmit()"
              :loading="loading"
            ></q-button-component>

            <q-button-component
              icon="mdi-account-arrow-up"
              :label="$t('register')"
              :title="$t('loginTip')"
              @handleClick="navigateTo({ name: 'register' })"
            ></q-button-component>
          </q-card-actions>
        </q-card>
      </div>
      <q-bar class="login-footer absolute-bottom" dense style="height: 50px">
        <q-space />
        <div class="text-weight-bold text-grey-5 text-caption q-mx-sm">
          {{ $q.platform.is.desktop ? $t("copyright") : "Copyright " }} &copy;
          {{ year }}
        </div>
        <q-separator vertical />
        <LangSwitcher />
      </q-bar>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
#login {
  min-width: 400px;

  .div-index-content {
    width: 100vw;
    height: 100vh;
    min-width: 400px;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url($background1);
  }

  .login-card {
    width: 350px;
    border-radius: 15px;
    border: 2px solid #c0c0c0;
  }

  .login-footer {
    background-color: #1976d29f;
  }
}
</style>
