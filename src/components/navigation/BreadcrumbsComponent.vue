<template>
  <div class="q-pa-md" style="max-height: 24px">
    <q-breadcrumbs
      style="font-size: 14px;"
      :active-color="$q.dark.isActive ? 'white' : 'dark'"
      class="text-primary breadcrumb-component"
    >
      <template v-slot:separator>
        <q-icon
          size="1.2em"
          name="arrow_forward"
          :color="$q.dark.isActive ? 'white' : 'dark'"
        />
      </template>
      <q-breadcrumbs-el
        :label="$t('models.home')"
        icon="home"
        class="cursor-pointer"
        @click="setHome"
      />
      <q-breadcrumbs-el :label="nav.label" :icon="nav.icon"/>
    </q-breadcrumbs>
  </div>
  <q-separator/>
</template>
<script setup>
import {useRouter} from "vue-router";
import {$t} from "src/services/i18n";
import {useQuasar} from "quasar";

defineOptions({
  name: "BreadcrumbsComponent",
});
const props = defineProps({
  nav: {
    type: Object,
    required: true,
    default: () => {
    },
  },
});
const emit = defineEmits(["change-url"]);
const $router = useRouter();
const $q = useQuasar();

function setHome() {
  $router.push({name: "app"});
  emit("change-url", null);
}
</script>
<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.breadcrumb-component {
  padding-left: 10px;
  padding-top: 3px;
  margin-bottom: 3px;
}
</style>
