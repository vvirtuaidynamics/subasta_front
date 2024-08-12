<template>
  <q-list separator>
    <q-item style="min-height: 49px; font-size: 21px">
      <q-item-section avatar>
        <q-icon name="img:/src/assets/images/default.png" size="28px"></q-icon>
      </q-item-section>
      <q-item-section class="text-uppercase">{{
        appConfig.name
      }}</q-item-section>
    </q-item>
    <q-item
      clickable
      :active="isActive('crud')"
      @click="navigateTo({ name: 'crud' })"
    >
      <q-item-section avatar>
        <q-icon name="home" />
      </q-item-section>
      <q-item-section>{{ $t("modules.home") }}</q-item-section>
      <q-tooltip-component
        :title="$t('modules.home')"
        anchor="center right"
        self="center left"
        v-if="mini"
      ></q-tooltip-component>
    </q-item>
  </q-list>
  <q-list
    separator
    v-for="(o, indexOption) in current_modules"
    :key="`menu-option-${indexOption}`"
  >
    <q-item
      clickable
      :active="isActive(o.url)"
      @click="navigateTo({ name: o.url })"
      v-if="!o.models"
    >
      <q-item-section avatar>
        <q-icon :name="o.ico" />
      </q-item-section>
      <q-item-section>{{ $t(`models.${o.name}`) }}</q-item-section>
      <q-tooltip-component
        :title="$t(`models.${o.name}`)"
        anchor="center right"
        self="center left"
        v-if="mini"
      ></q-tooltip-component>
    </q-item>
    <q-item
      clickable
      :class="isActiveParent(o) ? 'text-primary' : ''"
      :id="`menu-mini-${indexOption}`"
      v-else-if="o.models && mini"
    >
      <q-item-section avatar>
        <q-icon :name="o.ico" />
      </q-item-section>
      <q-tooltip-component
        :title="$t(`modules.${o.name}`)"
        anchor="center right"
        self="center left"
      ></q-tooltip-component>
      <q-menu
        anchor="top right"
        self="top left"
        :offset="[5, 0]"
        transition-show="scale"
        transition-hide="scale"
      >
        <q-list>
          <q-item class="bg-primary text-white">
            <q-item-section avatar>
              <q-icon :name="o.ico" />
            </q-item-section>
            <q-item-section>{{ $t(`modules.${o.name}`) }}</q-item-section>
          </q-item>
          <q-item
            v-for="(m, indexSubOpt) in o.models"
            :key="`menu_suboption-${indexSubOpt}`"
            clickable
            class="custom-item"
            :active="isActive(m.url)"
            @click="navigateTo({ name: m.url })"
          >
            <q-item-section avatar>
              <q-icon :name="m.ico" />
            </q-item-section>
            <q-item-section>{{
              $t(`models.${m.plural_label}`)
            }}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-item>
    <q-expansion-item
      group="somegroup"
      :icon="o.ico"
      :label="$t(`modules.${o.name}`)"
      :default-opened="isActiveParent(o)"
      :header-class="isActiveParent(o) ? 'text-primary' : ''"
      class="custom-expansion"
      v-else
    >
      <q-card>
        <q-card-section style="padding: 0">
          <q-list>
            <q-item
              v-for="(m, indexSubOpt) in o.models"
              :key="`menu_suboption-${indexSubOpt}`"
              clickable
              class="custom-item"
              :active="isActive(m.url)"
              :inset-level="0.2"
              @click="navigateTo({ name: m.url })"
            >
              <q-item-section avatar>
                <q-icon :name="m.ico" />
              </q-item-section>
              <q-item-section>{{
                $t(`models.${m.plural_label}`)
              }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import QTooltipComponent from "../base/QTooltipComponent.vue";
import appConfig from "src/config/app.js";
import { $t } from "src/services/i18n";
import { useAuthStore } from "src/stores/auth";
defineOptions({
  name: "MenuComponent",
});

const props = defineProps({
  title: {
    type: String,
  },
  class: { type: String, default: "bg-primary" },
  mini: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["change-url"]);

const authStore = useAuthStore();

const $router = useRouter();

const current_modules = ref([]);

onBeforeMount(() => {
  current_modules.value = authStore.user.app_list;
});

onMounted(() => {
  let name = $router.currentRoute.value.name;
  emit("change-url", name ? getCurrentModuleByRoute(name) : null);
});

function navigateTo(payload) {
  if (payload) {
    if (typeof payload === "string") {
      if (payload.startsWith("http") || payload.startsWith("https")) {
        window.open(payload, "_blank");
      } else {
        $router.push({ name: payload });
        emit("change-url", getCurrentModuleByRoute(payload));
      }
    } else if (typeof payload === "object") {
      $router.push({ name: payload.name });
      emit("change-url", getCurrentModuleByRoute(payload.name));
    }
  }
}

const isActive = (name) => {
  return $router.currentRoute.value.name === name;
};

const isActiveParent = (module) => {
  let routes = [];
  module.models.forEach((m) => {
    routes.push(`/crud/${m.url}`);
  });
  return routes.includes($router.currentRoute.value.path);
};

const getCurrentModuleByRoute = (route) => {
  if (route === "crud") return null;
  let modules = current_modules.value;
  for (let i = 0; i < modules.length; i++) {
    if (modules[i].url === route) {
      return modules[i];
    } else if (modules[i].models) {
      for (let j = 0; j < modules[i].models.length; j++) {
        if (modules[i].models[j].url === route) {
          return modules[i].models[j];
        }
      }
    }
  }
  return null;
};
</script>

<style>
.q-item__section--avatar {
  min-width: 20px;
}
</style>
