<template>
  <q-btn
    :color="isDark ? 'yellow-6' : 'black'"
    :icon="isDark ? 'wb_sunny' : 'nights_stay'"
    class="absolute-top-right"
    flat
    round
    @click="handleUpdate(!isDark)"
  >
    <q-tooltip class="bg-amber text-black text-caption text-center">
      {{ `${isDark ? $t("darkDeactivateTip") : $t("darkActivateTip")}` }}
    </q-tooltip>
  </q-btn>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from "vue";

defineOptions({
  name: "DarkSwitcher",
});

const props = defineProps({
  modelValue: {
    type: Boolean,
    require: true,
  },
});

const emits = defineEmits(["update"]);

const isDark = ref(props.modelValue);

const handleUpdate = (val) => {
  isDark.value = val;
  emits("update", val);
};

onBeforeMount(() => {});

onMounted(() => {});
</script>
