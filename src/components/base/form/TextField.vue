<template>
  <q-input
    ref="refEl"
    :name="name"
    :label="label"
    :readonly="readonly"
    :rules="rules"
    hide-bottom-space
    lazy-rules
    reactive-rules
    v-bind="fieldOptions"
    v-model="textValue"
    class="full-width"
    @update:model-value="(val) => update(val)"
  >
    <template #append v-if="options && options?.appendIcon">
      <q-icon :name="options?.appendIcon"/>
    </template>
    <template #prepend v-if="options && options?.prependIcon">
      <q-icon :name="options?.prependIcon"/>
    </template>
    <template #loading="props" v-if="props.data && props.data['loading']">
      <q-spinner-facebook color="info"/>
    </template>
  </q-input>
</template>

<script setup>
import {computed, onBeforeMount, onMounted, ref, watch} from "vue";
import {forms} from "src/config/theme/forms";
import {$t} from "src/services/i18n";

defineOptions({
  name: "TextField",
});

const props = defineProps({
  modelValue: String,
  name: {
    type: String, //name, label, title
    required: true,
  },
  label: {
    type: String, //name, label, title
    required: true,
  },
  readonly: {
    type: Boolean, //name, label, title
    default: false,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
});

const emits = defineEmits(["update", "error"]);

const refEl = ref(null);
let textValue = ref("");
const rules = ref([]);
const fieldOptions = {...forms.text, ...props.options};
const fieldRules = {...rules.value, ...(props.options?.rules ?? [])};

onBeforeMount(() => {
  if (props.options?.required) {
    rules.value.push((val) => {
      return !!val || $t("validations.required");
    });
  }
  if (props.options?.type === "email") {
    rules.value.push((val, rules) => {
      return rules.email(val) || "Please enter a valid email address";
    });
  }
  if (props.options?.rules) {
    props.options.rules.map((rule) => {
      rules.value.push(rule);
    });
  }
});
onMounted(() => {
  if (props.options && props.options?.value) {
    textValue.value = props.options.value;
  }
  textValue.value = props.modelValue;
});

const myRules = (val, rules) => {
  return new Promise((resolve, reject) => {
    resolve(!!val || $t("validations.required"));
  });
};

function reset() {
  textValue.value = "";
  emits("update", textValue.value);
  refEl.value[0].resetValidation();
}

function validate() {
  refEl.value[0].validate();
}


function update(val) {
  textValue.value = val;
  emits("update", textValue.value);
}

const value = computed(() => {
  return textValue.value;
});

watch(() => props.modelValue, (newValue) => {
  textValue.value = newValue
})

defineExpose({
  validate,
  reset,
  value,
});
</script>

<style scoped lang="scss"></style>
