<template>
  <q-checkbox
    v-model="model"
    :label="label"
    :left-label="leftLabel"
    :name="name"
    :dense="dense"
    @update:model-value="onUpdate"
  />
</template>
<script setup>
import { ref, onMounted } from "vue";

defineOptions({
  name: "CheckboxField",
});

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  leftLabel: {
    type: Boolean,
    default: false,
  },
  dense: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update"]);

const model = ref([]);

onMounted(() => {
  model.value = props.modelValue;
});

const onUpdate = (val) => {
  emits("update", props.name, val);
};
</script>
