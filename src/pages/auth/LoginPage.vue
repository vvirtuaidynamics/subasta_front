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
        <q-card bordered class="shadow-5  login-card q-pb-md">
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
                ref="fInputIdentity"
                v-model="formData.identity"
                :label="$t('fields.identity',null,'first')"
                :rules="IdentityRule"
                lazy-rules
                v-bind="forms.text"
              >
                <template v-slot:prepend>
                  <q-icon name="fas fa-user-tie"/>
                </template>
              </q-input>
              <q-input
                ref="fInputPassword"
                v-model="formData.password"
                :label="$t('fields.password',null,'first')"
                :rules="PasswordRule"
                lazy-rules
                type="password"
                v-bind="forms.text"
                @keyup.enter="onSubmit()"
              >
                <template v-slot:prepend>
                  <q-icon name="mdi-lock"/>
                </template>
              </q-input>

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

          <q-card-actions class="justify-around items-center">
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
              @handleClick="navigate({ name: 'register' })"
            ></q-button-component>
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

      <q-bar class="login-footer absolute-bottom " :class="texts.footer" dense style="height: 50px">
        <div class="row login-footer-header" style="min-width: 230px">
          <q-btn flat @click="navigate({name: page_home_name})" :title="$t('homeTip')">
            <img
              :src="images.appLogo"
              alt="SUBASTA"
              style=": 40px"
            />
            <div class="text-h6 text-uppercase">
              {{ appConfig.name }}
            </div>
          </q-btn>
        </div>
        <q-space/>
        <div class="q-mx-sm q-pr-sm" v-if="$q.screen.gt.xs">
          {{ $q.platform.is.desktop ? $t("copyright") : "Copyright " }} &copy;
          {{ year }}
        </div>
        <q-separator vertical v-if="$q.screen.gt.sm"/>
        <LangSwitcher/>
        <dark-switcher
          size="16px"
          :model-value="dark"
          @update="(val) => handleDarkMode(val)"
        />
      </q-bar>
    </div>
  </q-page>
</template>
<script setup>
import {reactive, ref, watch, onBeforeMount, onMounted} from "vue";
import {useQuasar} from "quasar";
import {useRoute, useRouter} from "vue-router";

import {useApp} from "src/composables/useApp";
import useApi from "src/composables/useApi";
import {$t} from "src/services/i18n";
import authService from "src/services/authService";

import QButtonComponent from "components/base/QButtonComponent.vue";
import DarkSwitcher from "src/components/base/DarkSwitcher.vue";
import LangSwitcher from "src/components/base/LangSwitcher.vue";
import {utils} from "src/helpers/utils";
import {forms} from "src/config/theme/forms";
import {texts} from "src/config/theme/texts";
import images from "src/config/theme/images";
import appConfig from "src/config/app";

const year = new Date().getFullYear();
const $app = useApp();
const {login, logout} = authService();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();

const {
  loading,
  token,
  dark,
  locale,
  isAuthenticated,
  notificationsPosition,
  fullscreen,
  handleDarkMode,
  navigateTo,
  setAppState,
} = $app;

const {page_app_name, page_home_name} = appConfig;

const IdentityRule = [(val) => !!val || $t("validations.required")];
const PasswordRule = [(val) => !!val || $t("validations.required")];
const fInputIdentity = ref();
const fInputPassword = ref();

const formData = reactive({
  identity: "",
  password: "",
  rememberMe: false,
});

function Validate() {
  let result = false;
  fInputIdentity.value.validate();
  fInputPassword.value.validate();
  if (fInputIdentity.value.hasError || fInputPassword.value.hasError)
    return result;
  return true;
}

function frmReset() {
  formData.identity = "";
  formData.password = "";
  fInputIdentity.value.focus();
  fInputIdentity.value.resetValidation();
  fInputPassword.value.resetValidation();
}

const navigate = (payload) => {
  navigateTo(payload, $router, $route)
}

async function onSubmit() {
  setAppState({loading: true});
  if (Validate()) {
    let result = null;
    try {
      result = await login({
        identity: formData.identity.toLowerCase(),
        password: formData.password,
        rememberMe: formData.rememberMe
      });
      if (result && result.success) {
        const {user, token, modules} = result.data;
        setAppState({loading: false, user, token, modules});
        let addAvatar = {}
        if (user.avatar) addAvatar = {avatar: user.avatar}
        utils.sendMsg({
          msg: $t(result.message),
          type: "positive",
          position: notificationsPosition?.value || 'bottom',
          ...addAvatar
        });
        navigate({name: page_app_name});
      } else {
        utils.sendMsg({
          msg: $t(result?.message),
          type: "negative",
          position: notificationsPosition?.value || 'bottom',
        });
        frmReset();
      }
    } catch (error) {
      console.log(error)
      const {data} = error.response;
      utils.sendMsg({
        msg: error.message || `${error}`,
        type: "negative",
        position: notificationsPosition?.value || 'bottom',
      });
      frmReset();

    } finally {
      setAppState({loading: false});
    }
  } else {
    utils.sendMsg({type: "negative", msg: `${$t("errorValidation")}`});
    if (formData.identity?.length === 0) fInputIdentity.value.focus();
    else if (formData.password?.length === 0) fInputPassword.value.focus();
    $app.setAppState({loading: false});
  }
}

onBeforeMount(async () => {
  $q.dark.set(dark.value);
  if (isAuthenticated.value)
    navigate({name: page_app_name});

});

onMounted(() => {

});

watch(dark, (current) => {
  $q.dark.set(current);
  handleDarkMode(current);
});
</script>
<style lang="scss" scoped>
#login {
  min-width: 350px;
  min-height: 100vh;
  overflow: hidden;
  background-image: linear-gradient(to bottom, #0e4b8a, #00c6ff);

  .login-card {
    width: 340px;
    border-radius: 25px;
    border: 2px solid #c0c0c0;
  }

  .login-footer {
    background-color: #1976d29f;
    margin: 0;
    padding: 0;
  }

  .login-footer-header {
    min-width: auto;
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
