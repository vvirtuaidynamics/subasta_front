<template>
  <q-btn
    :label="$t(`${props.label}`)"
    class="shadow-3 text-uppercase"
    :class="props.class"
    v-bind="formsStyle.button"
    type="button"
    :color="props.color"
    @click="onClick"
    @dblclick="onDblClick"
    :loading="props.loading"
    :icon="props.icon ? props.icon : ''"
  >
    <q-tooltip v-if="props.title?.length"> {{ `${props.title}` }}</q-tooltip>
    <template #loading>
      <span class="text-caption text-uppercase q-gutter q-gutter-x-sm">{{
        $t(`${loadingMsg}`)
      }}</span>
      <q-spinner-facebook size="xs" class="q-ml-sm" color="secondary" />
    </template>
  </q-btn>
</template>

<script setup>
import { formsStyle } from "src/config/formStyle";

defineOptions({
  name: "QButtonComponent",
});

const props = defineProps({
  label: String,
  title: String,
  icon: { type: String, require: false },
  class: { type: String, require: false },
  color: { type: String, default: "primary" },
  loading: { type: Boolean, require: false },
});

const emits = defineEmits(["handleClick", "handleDblClick"]);

const onClick = () => {
  emits("handleClick");
};
const onDblClick = () => {
  emits("handleDblClick");
};
</script>

<style lang="scss" scoped></style>
