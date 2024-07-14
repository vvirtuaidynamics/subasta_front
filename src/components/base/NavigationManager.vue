<script setup>
import {useRouter, useRoute} from 'vue-router';
import {$t} from "src/services/i18n";
import {useApp} from "src/composables/useApp";
import {onBeforeMount} from "vue";

defineOptions({
  name: "NavigationManager",
});


const $router = useRouter();
const $route = useRoute();

const $app = useApp();
const {setAppState, isAuthenticated} = $app

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
    if (payload.name) $router.push({name: payload.name});
    if (payload.path) $router.push({path: payload.path});
  }
}

function setBreadcrumbs() {
  const matchedRoutes = $route.matched;
  const breadcrumb = matchedRoutes.map((route) => ({
    to: $route.path,
    label: $route.meta.breadcrumb || $t("Home"),
  }));
  const unique_breadcrumb = breadcrumb.reduce((accumulator, currentValue) => {
    if (accumulator.filter((a) => a.to === currentValue.to).length === 0) {
      accumulator.push(currentValue);
    }
    return accumulator;
  }, []);
  unique_breadcrumb.unshift({to: "/", label: $t("Home")});
  $app.setAppState({breadcrumbs: unique_breadcrumb});
  return unique_breadcrumb;
}

const goBack = () => {
  $router.back()
}

const goHome = () => {
  $router.push('/')
}

const goLogin = () => {
  $router.push('login')
}

defineExpose({
  navigateTo,
  goHome,
  goLogin,
  goBack
})
onBeforeMount(() => {
    if (!isAuthenticated && $route.meta.requiredAuth) {
      goLogin()
    }
    setBreadcrumbs();
  }
)
</script>

<template>
  <slot></slot>
</template>

<style scoped lang="scss">

</style>
