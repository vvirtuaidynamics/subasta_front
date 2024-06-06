<template>
  <q-layout view="lHh LpR lff">
    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition
          appear
          enter-active-class="animated slideInRight"
          leave-active-class="animated slideOutLeft"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { onBeforeMount, onMounted, ref, watch } from "vue";

let breadcrumbs = ref();
const refresh = () => window.location.reload();

onBeforeMount(() => {});

onMounted(() => {});
</script>
