<template>
  <q-page padding>

    <div class="flex flex-center full-height q-gutter-x-md">

      <q-btn label="login" @click="Login"></q-btn>
      <q-btn label="profile" @click="Profile"></q-btn>
      <q-btn label="logout" @click="Logout"></q-btn>
      <div class="full-width  flex flex-center q-pa-lg">
        {{ token || "No token." }}
      </div>
      <div class="full-width full-height flex flex-center q-pa-lg">
        {{ data || "No data." }}
      </div>
    </div>

  </q-page>
</template>

<script setup>
import {useQuasar} from "quasar";
import {ref} from "vue";
import IconPickerField from "src/components/base/IconPickerField.vue";
import {$t} from "src/services/i18n";
import LoaderPage from "components/base/LoaderPage.vue";
import authService from "src/services/auth";
import {StorageService} from "src/services/storage";

const $q = useQuasar();
const {login, profile} = authService();
document.title = document.title + " - Debug";

const text = ref("");
const data = ref();
const token = ref('');

function Login() {
  data.value = "Login ...";

  login({identity: "admin", password: "password", rememberMe: false}).then((res) => {
    data.value = "Logged in successfully!";
    data.value = res;
    // token.value = StorageService.setToken()

  }).catch((error) => {
    data.value = "Error: " + error.message;
  });
}

function Profile() {
  profile().then((res) => {

    data.value = "Logged in successfully!";
    data.value = res;
    // token.value = StorageService.setToken()

  }).catch((error) => {
    data.value = "Error: " + error.message;
  });
}

function Logout() {
  // StorageService.removeToken();
  token.value = '';
  data.value = "Logged out successfully!";
}
</script>

<style scoped lang="css"></style>
