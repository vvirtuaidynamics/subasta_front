<template>
  <q-page>
    <div class="page row gradient-bg-blue">
      <div
        id="form"
        :class="
          $q.screen.gt.sm
            ? 'form-div col-6 flex flex-center'
            : 'form-div col-12 flex flex-center'
        "
      >
        {{ "LOGIN" }}
      </div>

      <div v-if="$q.screen.gt.sm" class="logo-div col-6">
        <q-img
          fit="fill"
          class="login-cover-img"
          src="/images/backgrounds/default.jpeg"
          alt="logo"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import IconPickerField from "src/components/base/IconPickerField.vue";
const $q = useQuasar();
document.title = document.title + " - Iconos";
</script>

<style scoped lang="css">
* {
  padding: 0;
  margin: 0;
  box-sizing: 0;
}
.page {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
}
.form-div {
}
.logo-div {
}
.login-cover-img {
  background-position: center;
  background-size: cover;
  transform: skewX(-10deg) translateX(50px);
}
.gradient-bg-blue {
  background: linear-gradient(to bottom, #0e4b8a, #00c6ff);
}
</style>
