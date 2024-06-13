<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
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
          style="width: 32px; height: 32px"
        />

        <q-toolbar-title> Subasta App </q-toolbar-title>

        <div>v{{ "0.0.1" }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <!-- <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list> -->
      <q-menu-component />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import QMenuComponent from "components/navigation/QMenuComponent.vue";

defineOptions({
  name: "MainLayout",
});

const linksList = [
  {
    title: "Usuarios",
    caption: "Lista de usuarios",
    icon: "user",
    link: "users",
  },
  {
    title: "Grupos",
    caption: "Lista de grupos",
    icon: "users",
    link: "groups",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
