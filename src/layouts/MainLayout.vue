<template>
  <q-layout view="lHh LpR lff">
    <q-header elevated :class="$q.dark.isActive ? 'bg-dark' : 'bg-primary'">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <img
          alt="Quasar logo"
          src="~assets/images/default.png"
          style="width: 32px; height: 32px; margin-left: 10px"
          v-if="!leftDrawerOpen"
        />

        <q-toolbar-title style="padding-left: 2px">
          <span class="text-uppercase" v-if="!leftDrawerOpen">{{
            appConfig.name
          }}</span>
        </q-toolbar-title>
        <LangSwitcher class="z-max q-ml-sm" />
        <DarkSwitcher
          class="z-max"
          size="md"
          colorDark="blue-6"
          colorLight="yellow-6"
          :model-value="$q.dark.isActive"
          @update="(val) => $q.dark.set(val)"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :mini="true"
      v-if="mini"
    >
      <menu-component @change-url="(nav) => (currentNav = nav)" :mini="true" />
    </q-drawer>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered v-else>
      <menu-component @change-url="(nav) => (currentNav = nav)" />
    </q-drawer>

    <q-page-container>
      <breadcrumbs-component
        :nav="currentNav"
        @change-url="currentNav = null"
        v-if="currentNav"
      />
      <router-view />
      <q-page-scroller
        position="bottom-right"
        :scroll-offset="150"
        :offset="[18, 18]"
      >
        <q-btn fab icon="mdi-arrow-up" color="primary" padding="sm" />
      </q-page-scroller>
    </q-page-container>

    <q-footer elevated :class="$q.dark.isActive ? 'bg-dark' : 'bg-primary'">
      <q-toolbar>
        <img
          alt="Quasar logo"
          src="~assets/images/default.png"
          style="width: 32px; height: 32px"
        />
        <q-toolbar-title
          class="text-uppercase"
          shrink
          style="font-size: 14px; padding-left: 2px"
        >
          {{ appConfig.name }}</q-toolbar-title
        >
        <q-icon name="email" size="sm"></q-icon>
        <q-toolbar-title shrink style="font-size: 14px; padding-left: 2px">
          {{ appConfig.email }}</q-toolbar-title
        >
        <q-icon name="phone" size="sm"></q-icon>
        <q-toolbar-title style="font-size: 14px; padding-left: 2px">
          {{ appConfig.phone }}</q-toolbar-title
        >
        <span>{{ $t("copyright") }} &copy; 2024</span>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import LangSwitcher from "src/components/base/LangSwitcher.vue";
import DarkSwitcher from "src/components/base/DarkSwitcher.vue";
import MenuComponent from "src/components/navigation/MenuComponent.vue";
import BreadcrumbsComponent from "src/components/navigation/BreadcrumbsComponent.vue";
import { useQuasar } from "quasar";
import appConfig from "src/config/app.js";
import { $t } from "src/services/i18n";
import { useApp } from "src/composables/useApp";

const $q = useQuasar();
const $app = useApp();

defineOptions({
  name: "MainLayout",
});
const currentNav = ref(null);
const mini = ref(false);
const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
  mini.value = !leftDrawerOpen.value;
}
</script>
<style>
::-webkit-scrollbar-thumb {
  background: rgb(175, 174, 174) !important;
  border-radius: 8px;
}
::-webkit-scrollbar-thumb:hover {
  background: grey !important;
}
::-webkit-scrollbar-track {
  background: #fff !important;
  border-radius: 8px;
}
::-webkit-scrollbar {
  width: 8px !important;
}
::-webkit-scrollbar:horizontal {
  height: 8px !important;
}
</style>
