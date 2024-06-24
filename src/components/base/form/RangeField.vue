<template>
  <label v-if="label">{{ label }}</label>
  <q-range
    v-model="model"
    :min="min"
    :max="max"
    label-always
    switch-label-side
    drag-range
    @update:model-value="onUpdate"
  />
</template>
<script setup>
import { ref, onMounted } from "vue";

defineOptions({
  name: "RangeField",
});

const props = defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits(["update"]);

const model = ref({
  min: 0,
  max: 0,
});

onMounted(() => {
  if (props.modelValue) {
    model.value = {
      min: props.modelValue.min,
      max: props.modelValue.max,
    };
  } else {
    model.value = {
      min: props.min,
      max: props.max,
    };
  }
});

const onUpdate = (val) => {
  if (val.min === props.min && val.max === props.max) {
    emits("update", null);
  } else {
    emits("update", val);
  }
};
</script>
