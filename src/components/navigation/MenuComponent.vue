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
      <q-item-section>{{ $t("models.home") }}</q-item-section>
      <q-tooltip-component
        :title="$t('models.home')"
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
      v-if="!o.modules"
    >
      <q-item-section avatar>
        <q-icon :name="o.icon" />
      </q-item-section>
      <q-item-section>{{ o.label }}</q-item-section>
      <q-tooltip-component
        :title="o.label"
        anchor="center right"
        self="center left"
        v-if="mini"
      ></q-tooltip-component>
    </q-item>
    <q-item
      clickable
      :class="isActiveParent(o) ? 'text-primary' : ''"
      :id="`menu-mini-${indexOption}`"
      v-else-if="o.modules && mini"
    >
      <q-item-section avatar>
        <q-icon :name="o.icon" />
      </q-item-section>
      <q-tooltip-component
        :title="o.label"
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
              <q-icon :name="o.icon" />
            </q-item-section>
            <q-item-section>{{ o.label }}</q-item-section>
          </q-item>
          <q-item
            v-for="(m, indexSubOpt) in o.modules"
            :key="`menu_suboption-${indexSubOpt}`"
            clickable
            class="custom-item"
            :active="isActive(m.url)"
            @click="navigateTo({ name: m.url })"
          >
            <q-item-section avatar>
              <q-icon :name="m.icon" />
            </q-item-section>
            <q-item-section>{{ m.label }}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-item>
    <q-expansion-item
      group="somegroup"
      :icon="o.icon"
      :label="o.label"
      :default-opened="isActiveParent(o)"
      :header-class="isActiveParent(o) ? 'text-primary' : ''"
      class="custom-expansion"
      v-else
    >
      <q-card>
        <q-card-section style="padding: 0">
          <q-list>
            <q-item
              v-for="(m, indexSubOpt) in o.modules"
              :key="`menu_suboption-${indexSubOpt}`"
              clickable
              class="custom-item"
              :active="isActive(m.url)"
              :inset-level="0.2"
              @click="navigateTo({ name: m.url })"
            >
              <q-item-section avatar>
                <q-icon :name="m.icon" />
              </q-item-section>
              <q-item-section>{{ m.label }}</q-item-section>
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

const all_modules = [
  {
    label: $t("models.administration"),
    icon: "mdi-account-cog-outline",
    modules: [
      {
        label: $t("models.groups"),
        icon: "mdi-account-multiple-outline",
        url: "groups",
        model: "group",
        permissions: [],
      },
      {
        label: $t("models.users"),
        icon: "mdi-account-outline",
        url: "users",
        model: "user",
        permissions: [],
      },
      {
        label: $t("models.history"),
        icon: "mdi-account-clock-outline",
        url: "history",
        model: "history",
        permissions: [],
      },
    ],
  },
  {
    label: $t("models.persons"),
    icon: "mdi-account-multiple-outline",
    modules: [
      {
        label: $t("models.carriers"),
        icon: "mdi-human-male",
        url: "carriers",
        model: "carrier",
        permissions: [],
      },
      {
        label: $t("models.clients"),
        icon: "mdi-briefcase-variant-outline",
        url: "clients",
        model: "client",
        permissions: [],
      },
    ],
  },
  {
    label: $t("models.bearings"),
    icon: "mdi-cube-outline",
    url: "bearings",
    model: "bearing",
    permissions: [],
  },
  {
    label: $t("models.validationtasks"),
    icon: "mdi-calendar-multiple-check",
    url: "validation_tasks",
    model: "validationtasks",
    permissions: [],
  },
];

const $router = useRouter();

const permissions = ["user:create", "user:edit", "group:view"];

const current_modules = ref([]);

onBeforeMount(() => {
  all_modules.forEach((m) => {
    current_modules.value.push(m);
  });
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
  module.modules.forEach((m) => {
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
    } else if (modules[i].modules) {
      for (let j = 0; j < modules[i].modules.length; j++) {
        if (modules[i].modules[j].url === route) {
          return modules[i].modules[j];
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
