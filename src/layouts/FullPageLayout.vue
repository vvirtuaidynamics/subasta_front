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
import {useRouter, useRoute} from "vue-router";
import {useApp} from "src/composables/useApp";


const $router = useRouter();
const $route = useRoute();
let breadcrumbs = ref();
const {navigateTo} = useApp();

const navigate = (payload) => {
  navigateTo(payload, $router, $route);
}

const refresh = () => $router.go(0);


onBeforeMount(() => {

});

onMounted(() => {
});
</script>
