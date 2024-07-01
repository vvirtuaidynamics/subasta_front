<template>
  <q-input
    :ref="refEl"
    :name="props.name"
    :label="props.label"
    :rules="rules"
    hide-bottom-space
    bottom-slots
    hide-hint
    lazy-rules
    reactive-rules
    v-bind="fieldOptions"
    v-model="textValue"
    class="full-width"
    @update:model-value="(val) => update(val)"
  >
    <template #hint v-if="options?.help">
      <ul style="padding: 0; margin-top: 0px; margin-bottom: 0px">
        <li
          v-for="(h, index) in options?.help"
          :key="`help-${index}`"
          style="list-style: none"
        >
          {{ h }}
        </li>
      </ul>
    </template>
    <template #append v-if="props.options && props.options?.appendIcon">
      <q-icon :name="props.options?.appendIcon" />
    </template>
    <template #prepend v-if="props.options && props.options?.prependIcon">
      <q-icon :name="props.options?.prependIcon" />
    </template>
    <template #loading="props" v-if="props.data && props.data['loading']">
      <q-spinner-facebook color="info" />
    </template>
  </q-input>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { forms } from "src/config/theme/forms";
import { $t } from "src/services/i18n";
import { rules as defaultRules } from "src/helpers/validations";

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
  options: {
    type: Object,
    default: () => ({}),
  },
});

const emits = defineEmits(["update", "error"]);

const refEl = ref();
let textValue = ref("");
const rules = ref([]);
const fieldOptions = { ...forms.text, ...props.options };
const fieldRules = { ...rules.value, ...(props.options?.rules ?? []) };

onBeforeMount(() => {
  if (props.options?.required) {
    rules.value.push(defaultRules.required);
  }
  if (props.options?.maxLength) {
    console.log(defaultRules.maxLength(props.options.maxLength));
    rules.value.push(
      defaultRules.maxLength(textValue, props.options.maxLength)
    );
  }
  if (props.options?.type === "email") {
    rules.value.push(defaultRules.email);
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
  resetValidation();
}

function update(val) {
  textValue.value = val;
  emits("update", props.name, textValue.value);
}

const value = computed(() => {
  return textValue.value;
});
defineExpose({
  reset,
  value,
});
</script>

<style scoped lang="scss"></style>
