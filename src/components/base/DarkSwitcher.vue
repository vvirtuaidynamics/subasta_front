<template>
  <q-btn
    :color="isDark  ? colorLight : colorDark"
    :icon="isDark ? 'wb_sunny' : 'nights_stay'"
    :size="size"
    flat
    @click="handleUpdate(!isDark)"
  >
    <q-tooltip class="bg-amber text-black text-caption text-center">
      {{ `${isDark ? $t("darkDeactivateTip") : $t("darkActivateTip")}` }}
    </q-tooltip>
  </q-btn>
</template>

<script setup>
import {onBeforeMount, onMounted, ref} from "vue";
import {useQuasar} from "quasar";

defineOptions({
  name: "DarkSwitcher",
});
const $q = useQuasar();
const props = defineProps({
  modelValue: {
    type: Boolean,
    require: true,
  },
  overDark: {type: Boolean, default: false},
  size: {type: String, default: 'sm'},
  colorDark: {type: String, default: 'black'},
  colorLight: {type: String, default: 'yellow-6'},


});

const emits = defineEmits(["update"]);

const isDark = ref(props.modelValue);
const isOverDark = ref(props.overDark);
const size = ref(props.size);
const colorLight = ref(props.colorLight);
const colorDark = ref(props.colorDark);

const handleUpdate = (val) => {
  isDark.value = val;
  $q.dark.set(val);
  emits("update", val);
};

onBeforeMount(() => {
});

onMounted(() => {

});
</script>
