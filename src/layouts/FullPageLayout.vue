<template>
  <q-layout view="lHh LpR lff">
    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition
          appear
          enter-active-class="animated slideInRight"
          leave-active-class="animated slideOutLeft"
        >
          <component :is="Component"/>
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import {onBeforeMount, onMounted, ref, watch} from "vue";
import {useRouter} from "vue-router";

const $router = useRouter();
let breadcrumbs = ref();

function navigateTo(payload) {
  // console.log("payload: ", payload);
  if (payload && typeof payload === "string") {
    if (payload.startsWith("http") || payload.startsWith("https")) {
      window.open(payload, "_blank");
    }
    if (payload.startsWith("#")) {
      document.getElementById(payload).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  }
  if (payload && typeof payload === "object") {
    const path = payload.path;
    if (path && $route.path !== path) {
      $router.push(path);
    }
    if (payload.name) $router.push({name: payload.name});
    if (payload.path) $router.push({path: payload.path});
  }
}

const refresh = () => $router.go(0);


onBeforeMount(() => {

});

onMounted(() => {
});
</script>
