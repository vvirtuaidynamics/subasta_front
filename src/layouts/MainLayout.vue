<template>
  <q-layout view="lHh LpR lff" class="no-scroll scroll-x scroll--mobile">
    <q-header class="header" :elevated="!$q.dark.isActive" :class="$q.dark.isActive ? 'bg-dark' : 'bg-primary'">
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
          alt="Logo"
          src="~assets/images/default.png"
          style="width: 40px; height: 40px; margin-left: 10px"
          v-if="!leftDrawerOpen"
        />

        <q-toolbar-title style="padding-left: 2px">
          <span class="text-uppercase" v-if="!leftDrawerOpen">{{
              appConfig.name
            }}</span>
        </q-toolbar-title>
        <LangSwitcher class="z-max q-ml-sm"/>
        <DarkSwitcher
          class="z-max"
          size="md"
          colorDark="blue-6"
          colorLight="yellow-6"
          :model-value="$q.dark.isActive"
          @update="(val) => $q.dark.set(val)"
        />

        <user-menu></user-menu>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :mini="true"
      v-if="mini"
    >
      <menu-component @change-url="(nav) => handleNavigate(nav)" :mini="true"/>
    </q-drawer>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered v-else>
      <menu-component @change-url="(nav)=>handleNavigate(nav)"/>
    </q-drawer>
    <q-page-container class="page">
      <breadcrumbs-component
        :nav="currentNav"
        @change-url="currentNav = null"
        v-if="currentNav"
      />
      <router-view v-slot="{ Component }">
        <transition
          appear
          enter-active-class="animated slideInRight"
          leave-active-class="animated slideOutLeft"
        >
          <q-scroll-area class="page-area full-width q-pa-xs"
                         :style="`${pageHeight}`">
            <component :is="Component"/>

          </q-scroll-area>
        </transition>
      </router-view>
      <q-page-scroller
        position="bottom-right"
        :scroll-offset="150"
        :offset="[18, 18]"
      >
        <q-btn fab icon="mdi-arrow-up" color="primary" padding="sm"/>
      </q-page-scroller>
    </q-page-container>

    <q-footer reveal :elevated="!$q.dark.isActive" :class="$q.dark.isActive ? 'bg-dark' : 'bg-primary'">
      <q-bar class="footer absolute-bottom bg-primary" :class="texts.footer" dense>
        <div class="q-mx-sm q-pr-sm row q-gutter-x-md">
          <div>
            <q-icon name="email" size="xs"/>
            {{ appConfig.email }}
          </div>
          <div>
            <q-icon name="phone" size="xs"/>
            {{ appConfig.phone }}
          </div>
        </div>
        <q-space v-if="$q.screen.gt.sm"/>
        <div class="q-mx-sm q-pr-sm" v-if="$q.screen.gt.xs">
          {{ $q.platform.is.desktop ? $t("copyright") : "Copyright " }} &copy;
          {{ date.formatDate(Date.now(), 'YYYY') }}
        </div>
        <q-separator vertical v-if="$q.screen.gt.sm"/>
      </q-bar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import {onBeforeMount, onMounted, ref, watch} from "vue";
import LangSwitcher from "src/components/base/LangSwitcher.vue";
import DarkSwitcher from "src/components/base/DarkSwitcher.vue";
import MenuComponent from "src/components/navigation/MenuComponent.vue";
import BreadcrumbsComponent from "src/components/navigation/BreadcrumbsComponent.vue";
import {date, useQuasar} from "quasar";
import appConfig from "src/config/app.js";
import {$t} from "src/services/i18n";
import {useApp} from "src/composables/useApp";
import {useRouter, useRoute} from "vue-router";
import UserMenu from "components/base/UserMenu.vue";
import {texts} from "src/config/theme/texts";
import images from "src/config/theme/images";

defineOptions({
  name: "MainLayout",
});

const $q = useQuasar();
const $app = useApp();
const $router = useRouter();
const $route = useRoute();

const {user, avatar, navigateTo, isAuthenticated} = $app;

const currentNav = ref(null);
const mini = ref(false);
const leftDrawerOpen = ref(false);

const pageHeight = `height: calc( 100vh - 50px ${currentNav.value ? '- 10px' : ''} )`;

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
  mini.value = !leftDrawerOpen.value;
}

const navigate = (payload) => {
  navigateTo(payload, $router, $route);
}

const handleNavigate = (nav) => {
  currentNav.value = nav
}

watch(() => isAuthenticated.value, (newValue) => {
  if (!newValue) navigate(appConfig.page_login_name)
})

onBeforeMount(() => {
  if (!isAuthenticated.value) {
    navigate({name: appConfig.page_login_name});
  }
})

onMounted(() => {

})


</script>
<style>
.header {
  border-bottom: 1px solid;
  height: 50px;
}


.footer {
  background-color: #1976d29f;
  margin: 0;
  padding: 0;
}

.footer-header {
  min-width: auto;
  transform: skewX(-10deg) translateX(-50px);
  background-color: $dark;
  margin: 0;
  padding-left: 50px;
  border: solid 1px $dark;

  img {
    margin: 0 10px 0 0;
    max-height: 40px;
  }

}


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
