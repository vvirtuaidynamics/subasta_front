<template>
  <q-input
    :ref="refEl"
    :name="props.name"
    :label="props.label"
    :rules="fieldRules"
    hide-bottom-space
    bottom-slots
    lazy-rules
    reactive-rules
    v-bind="fieldOptions"
    v-model="textValue"
    class="full-width"
    @update:model-value="(val) => update(val)"
  >
    <template #hint v-if="fieldHelp.length > 0">
      <ul style="padding: 0; margin-top: 0px; margin-bottom: 0px">
        <li
          v-for="(h, index) in fieldHelp"
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
import { onBeforeMount, onMounted, ref } from "vue";
import { forms } from "src/config/theme/forms";
import { validations } from "src/helpers/validations";

defineOptions({
  name: "TextField",
});

const props = defineProps({
  modelValue: String,
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
});

const emits = defineEmits(["update"]);

const refEl = ref();
let textValue = ref("");
const fieldRules = ref([]);
const fieldHelp = ref([]);
const fieldOptions = { ...forms.text, ...props.options };

onBeforeMount(() => {
  const { rules, help } = validations.getRules(props.options);
  fieldRules.value = rules;
  fieldHelp.value = help;
});
onMounted(() => {
  textValue.value = props.modelValue;
});

function update(val) {
  textValue.value = val;
  emits("update", props.name, textValue.value);
}
</script>
