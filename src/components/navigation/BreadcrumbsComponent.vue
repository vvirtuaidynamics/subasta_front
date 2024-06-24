<template>
  <div class="q-pa-md">
    <q-breadcrumbs separator-color="primary" style="font-size: 14px">
      <q-breadcrumbs-el
        :label="$t('models.home')"
        icon="home"
        class="cursor-pointer"
        @click="setHome"
      />
      <q-breadcrumbs-el :label="nav.label" :icon="nav.icon" disable />
    </q-breadcrumbs>
  </div>
  <q-separator></q-separator>
</template>
<script setup>
import { useRouter } from "vue-router";
import { $t } from "src/services/i18n";
defineOptions({
  name: "BreadcrumbsComponent",
});
const props = defineProps({
  nav: {
    type: Object,
    required: true,
    default: () => {},
  },
});
const emit = defineEmits(["change-url"]);
const $router = useRouter();
function setHome() {
  $router.push({ name: "crud" });
  emit("change-url", null);
}
</script>
