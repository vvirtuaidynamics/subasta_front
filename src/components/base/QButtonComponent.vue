<template>
  <q-btn
    :label="props.label"
    :class="props.class"
    v-bind="forms.button"
    type="button"
    :color="props.color"
    @click="onClick"
    @dblclick="onDblClick"
    :loading="props.loading"
    :icon="props.icon"
  >
    <q-tooltip v-if="props.title"> {{ props.title }}</q-tooltip>
    <template #loading>
      <span class="text-caption text-uppercase q-gutter q-gutter-x-sm">{{
          props.label
        }}</span>
      <q-spinner-facebook size="xs" class="q-ml-sm" color="accent"/>
    </template>
  </q-btn>
</template>

<script setup>
import {forms} from "src/config/theme/forms";

defineOptions({
  name: "QButtonComponent",
});

const props = defineProps({
  label: String,
  title: String,
  icon: {type: String, require: false},
  class: {type: String, default: 'shadow-3 text-uppercase'},
  color: {type: String, default: "primary"},
  loading: {type: Boolean, require: false},
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
