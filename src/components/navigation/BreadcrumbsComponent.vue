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
        :label="$t('Home')"
        icon="home"
        class="cursor-pointer"
        @click="setHome"
      />
      <q-breadcrumbs-el :label="$t(currentNav.label)" :icon="currentNav.icon"/>
    </q-breadcrumbs>
  </div>
  <q-separator/>
</template>
<script setup>
import {onBeforeMount, ref, watch} from "vue"
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
const emit = defineEmits(["change-url", "home"]);
const $router = useRouter();
const $q = useQuasar();
const currentNav = ref(null)

function setHome() {
  $router.push({name: "app"});
  emit("change-url", null);
}

onBeforeMount(() => {
  currentNav.value = props.nav
})

watch(() => props.nav, (newValue) => {
  currentNav.value = newValue;
})

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
