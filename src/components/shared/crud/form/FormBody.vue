<template>
  <div class="form-field" v-for="(f, index) in fields" :key="`field-${index}`">
    <text-field
      :label="f.label"
      :name="f.name"
      :modelValue="object ? object[f.name] : null"
      :options="f.props"
      @update="onUpdate"
      v-if="f.type === 'text'"
    />
    <checkbox-field
      :label="f.label"
      :name="f.name"
      :modelValue="object ? object[f.name] : false"
      :options="f.props"
      @update="onUpdate"
      v-else-if="f.type === 'checkbox'"
    />
    <select-field
      :label="f.label"
      :name="f.name"
      :modelValue="object ? (object[f.name] ? [object[f.name]] : []) : []"
      :options="f.options"
      :filterable="f.filterable"
      @update="onUpdate"
      v-else-if="f.type === 'select'"
    />
    <date-field
      :label="f.label"
      :name="f.name"
      :modelValue="object ? object[f.name] : null"
      :options="f.props"
      @update="onUpdate"
      v-else-if="f.type === 'date'"
    />
  </div>
</template>

<script setup>
defineOptions({
  name: "FormBody",
});

import { ref, onMounted, onBeforeMount } from "vue";

import TextField from "src/components/base/form/TextField.vue";
import SelectField from "src/components/base/form/SelectField.vue";
import CheckboxField from "src/components/base/form/CheckboxField.vue";
import DateField from "src/components/base/form/DateField.vue";
import RadioField from "src/components/base/form/RadioField.vue";

const props = defineProps({
  object: {
    type: Object,
    default: null,
  },
  fields: {
    type: Array,
    default: () => [],
  },
});

const emits = defineEmits(["update"]);

const onUpdate = (name, val) => {
  emits("update", name, val);
};
</script>
