<template>
  <q-list separator>
    <q-item style="min-height: 49px; font-size: 21px">
      <q-item-section avatar>
        <q-icon name="img:/src/assets/images/default.png" size="28px"></q-icon>
      </q-item-section>
      <q-item-section class="text-uppercase">{{
          appConfig.name
        }}
      </q-item-section>
    </q-item>
    <q-item
      clickable
      :active="isActive('app')"
      @click="navigate({ name: 'app' })"
    >
      <q-item-section avatar>
        <q-icon name="home"/>
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
      @click="navigate({ name: o.url })"
      v-if="!o.modules?.length > 0"
    >
      <q-item-section avatar>
        <q-icon :name="o.icon"/>
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
      v-else-if="o.modules?.length > 0 && mini"
    >
      <q-item-section avatar>
        <q-icon :name="o.icon"/>
      </q-item-section>
      <q-tooltip-component
        :title="o.title"
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
              <q-icon :name="o.icon"/>
            </q-item-section>
            <q-item-section>{{ o.label }}</q-item-section>
          </q-item>
          <q-item
            v-for="(m, indexSubOpt) in o.modules"
            :key="`menu_suboption-${indexSubOpt}`"
            clickable
            class="custom-item"
            :active="isActive(m.url)"
            @click="navigate({ name: m.url })"
          >
            <q-item-section avatar>
              <q-icon :name="m.icon"/>
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
              @click="navigate({ name: m.url })"
            >
              <q-item-section avatar>
                <q-icon :name="m.icon"/>
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
import {onBeforeMount, onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import QTooltipComponent from "../base/QTooltipComponent.vue";
import appConfig from "src/config/app.js";
import {$t} from "src/services/i18n";
import {useApp} from "src/composables/useApp";

defineOptions({
  name: "MenuComponent",
});

const props = defineProps({
  title: {
    type: String,
  },
  class: {type: String, default: "bg-primary"},
  mini: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["change-url"]);

const {modules, navigateTo} = useApp();

const $router = useRouter();
const $route = useRoute();


const permissions = ["user:create", "user:edit", "group:view"];

const current_modules = ref([]);


const navigate = (payload) => {
  navigateTo(payload, $router, $route)
}

const isActive = (name) => {
  return $router.currentRoute.value.name === name;
};

const isActiveParent = (module) => {
  let routes = [];
  module.modules.forEach((m) => {
    routes.push(`/app/${m.url}`);
  });
  return routes.includes($router.currentRoute.value.path);
};

const getCurrentModuleByRoute = (route) => {
  if (route === "app") return null;
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

const getParentModules = () => {

  let parentModules = [];
  parentModules = modules.value.filter((m) => m.parent === '').sort((a, b) => a.order - b.order);
  if (parentModules.length) parentModules.forEach((m) => {
    m.modules = getChildrenModules(m.name).sort((a, b) => a.order - b.order);
  })
  parentModules.forEach((m) => {
    m.title = $t(m.title)
    m.label = $t(m.label)
  });
  return parentModules;
}

const getChildrenModules = (parent) => {
  if (!parent) return [];
  let childrenModules = modules.value.filter((m) => m.parent === parent).sort((a, b) => a.order - b.order);
  if (childrenModules?.length === 0) return [];
  childrenModules.forEach((m) => {
    m.title = $t(m.title);
    m.label = $t(m.label);
    m.modules = getChildrenModules(m.name);
  });
  return childrenModules;
}

onBeforeMount(() => {
  current_modules.value = getParentModules();
});

onMounted(() => {
  let name = $router.currentRoute.value.name;
  emit("change-url", name ? getCurrentModuleByRoute(name) : null);
});

watch(() => modules.value, (newValue) => {
  current_modules.value = getParentModules();
})

</script>

<style>
.q-item__section--avatar {
  min-width: 20px;
}
</style>
