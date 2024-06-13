<template>
  <q-list style="padding: 5px">
    <q-item
      clickable
      :active="isActive('crud')"
      @click="navigateTo({ name: 'crud' })"
    >
      <q-item-section avatar>
        <q-icon name="home" />
      </q-item-section>
      <q-item-section>Inicio</q-item-section>
    </q-item>
    <q-expansion-item
      group="somegroup"
      icon="mdi-account-cog-outline"
      label="Administración"
      :default-opened="isActiveParent(['/crud/users', '/crud/groups'])"
      :header-class="
        isActiveParent(['/crud/users', '/crud/groups']) ? 'text-primary' : ''
      "
      :style="{
        'background-color': isActiveParent(['/crud/users', '/crud/groups'])
          ? '#dee2e6'
          : '',
      }"
    >
      <q-card>
        <q-card-section style="padding: 0">
          <q-list>
            <q-item
              clickable
              :active="isActive('groups')"
              @click="navigateTo({ name: 'groups' })"
            >
              <q-item-section avatar>
                <q-icon name="mdi-account-multiple-outline" />
              </q-item-section>
              <q-item-section>Grupos</q-item-section>
            </q-item>

            <q-item
              clickable
              :active="isActive('users')"
              @click="navigateTo({ name: 'users' })"
            >
              <q-item-section avatar>
                <q-icon name="mdi-account-outline" />
              </q-item-section>
              <q-item-section>Usuarios</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script setup>
import { useRouter } from "vue-router";
defineOptions({
  name: "QMenuComponent",
});

const props = defineProps({
  title: {
    type: String,
  },
  class: { type: String, default: "bg-primary" },
});

const $router = useRouter();

function navigateTo(payload) {
  if (payload) {
    if (typeof payload === "string") {
      if (payload.startsWith("http") || payload.startsWith("https")) {
        window.open(payload, "_blank");
      } else {
        $router.push({ name: payload });
      }
    } else if (typeof payload === "object") {
      const path = payload.path ?? false;
      if (path && $route.path !== path) {
        $router.push(path);
      }
      if (payload.name) $router.push({ name: payload.name });
      if (payload.path) $router.push({ path: payload.path });
    }
  }
}

const isActive = (name) => {
  return $router.currentRoute.value.name === name;
};

const isActiveParent = (routes) => {
  console.log(
    routes,
    $router.currentRoute.value.path,
    routes.includes($router.currentRoute.value.path)
  );
  return routes.includes($router.currentRoute.value.path);
};
</script>

<style lang="scss" scoped></style>
