<template>
  <q-btn
    :color="color"
    :round="round"
    :size="size"
    :icon="icon"
    :flat="flat"
    :no-caps="no_caps"
    :disable="disable"
    :rounded="rounded"
    :square="square"
    :dense="dense"
    :align="align"
    :padding="padding"
    :text-color="text_color"
    @click="onClick"
  >
    <q-tooltip-component
      :title="tooltips"
      v-if="tooltips"
      :class="`bg-${color}`"
    />
    <slot></slot>
  </q-btn>
</template>

<script setup>
import QTooltipComponent from "./QTooltipComponent.vue";
defineOptions({
  name: "QBtnComponent",
});

const props = defineProps({
  tooltips: String,
  class: String,
  label: String,
  round: {
    type: Boolean,
    default: true,
  },
  flat: {
    type: Boolean,
    default: false,
  },
  no_caps: {
    type: Boolean,
    default: false,
  },
  disable: {
    type: Boolean,
    default: false,
  },
  outline: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  square: {
    type: Boolean,
    default: false,
  },
  dense: {
    type: Boolean,
    default: false,
  },
  align: {
    type: String,
    default: "center",
  },
  padding: String,
  color: { type: String, default: "primary" },
  text_color: String,
  icon: String,
  size: {
    type: String,
    default: "sm",
  },
});

const emits = defineEmits(["click"]);

const onClick = () => {
  emits("click");
};
</script>

<style lang="scss" scoped></style>
