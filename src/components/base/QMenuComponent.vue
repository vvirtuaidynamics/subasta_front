<script setup>

import {$t} from "src/services/i18n";
</script>

<template>
  <q-menu
    class="z-max"
    style="border-radius: 15px"
    transition-hide="jump-up"
    transition-show="jump-down"
    :offset="[0, 10]"
  >
    <q-list
      class="text-black text-caption text-uppercase"
      style="min-width: 180px"
    >
      <q-item
        v-if="!false"
        clickable
        @click="navigate({ name: !isAuthenticated ? page_login_name : page_app_name})"
      >
        <q-item-section avatar>
          <q-icon v-if="!isAuthenticated" name="fas fa-door-closed" size="sm"/>
          <q-icon v-else name="fas fa-door-open" size="sm" class="text-positive"/>
        </q-item-section>
        <q-item-section class="text-body1 text-uppercase"
        >{{ !isAuthenticated ? $t("login") : $t("Desktop") }}
        </q-item-section>
      </q-item>
      <q-item clickable @click="navigate({ name: 'register' })" v-if="!isAuthenticated">
        <q-item-section avatar>
          <q-icon name="fas fa-id-badge" size="sm"/>
        </q-item-section>
        <q-item-section class="text-body1 text-uppercase"
        >{{ $t("register") }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<style scoped lang="scss">

</style>
