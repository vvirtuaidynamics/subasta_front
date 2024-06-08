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
import {useRouter} from "vue-router";

const $router = useRouter();

let breadcrumbs = ref();
const refresh = () => $router.go(0);


onBeforeMount(() => {

});

onMounted(() => {});
</script>
