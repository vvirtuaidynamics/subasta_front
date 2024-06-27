<template>
  <select-field
    :name="name"
    :label="label"
    :dense="dense"
    :hidde-bottom-space="hidde_bottom_space"
    :options="options"
    :modelValue="modelValue"
    :filterable="false"
    @update="onUpdate"
  />
</template>

<script setup>
import { ref } from "vue";
import SelectField from "./SelectField.vue";
import { $t } from "src/services/i18n";

defineOptions({
  name: "BooleanSelectField",
});

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  dense: {
    type: Boolean,
    default: true,
  },
  hidde_bottom_space: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
  },
  label: {
    type: String,
  },
});

const emits = defineEmits(["update", "error"]);

const model = ref(null);

const options = [
  {
    label: $t("labels.yes"),
    value: true,
  },
  {
    label: $t("labels.no"),
    value: false,
  },
];

const onUpdate = (name, val) => {
  emits("update", name, val);
};
</script>
