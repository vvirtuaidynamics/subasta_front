<script setup>

import {useApp} from "src/composables/useApp";

const $app = useApp();
const {
  user,
  modules,
  token
} = $app;
</script>

<template>
  <q-page padding>
    <div class="flex flex-center full-width">
      <h1>DASHBOARD</h1><br/>
      {{
        user
      }}

    </div>
  </q-page>
</template>

<style scoped lang="scss">

</style>
