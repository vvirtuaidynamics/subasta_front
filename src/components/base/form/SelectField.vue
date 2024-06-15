<template>
  div class="full-width">
  <q-select ref="refSelect" :name="props.name" :label="props.label" :v-bind="fieldOptions"
            :rules="fieldRules"
            :option-value="props.optionValue" :options="OptionsFilters" :model-value="selectedModel"
            @filter="(val, update, abort) => filterFn(val, update, abort)" :options-cover="!useInput ? true : false"
            :reset-validation="resetValidation ?? null" @update:model-value="(val) => updateModel(val)" :error="error"
            :stack-label="props.stackLabel" @remove="({ index, value }) => onRemove(index, value)">
    <template v-slot:no-option>
      <q-item>
        <q-item-section avatar>
          <q-icon name="mdi-alert-outline"/>
        </q-item-section>
        <q-item-section class="text-grey">
          {{ $t('components.select.noptions') }}
        </q-item-section>
      </q-item>
    </template>
    <template v-slot:prepend v-if="props.prependIcon">
      <q-icon :name="props.prependIcon"/>
    </template>
  </q-select>
</template>

<script setup>
import {computed, onBeforeMount, onMounted, ref} from "vue";
import {forms} from "src/config/theme/forms";
import {required} from "src/services/validators";
import {useQuasar} from "quasar";

defineOptions({
  name: "SelectField",
});

const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  data_url: {type: String},
  data: {
    type: Object,
    default: () => ({})
  },
  mapData: {
    type: Object,
    default: () => {
    }
  },
  options: {
    type: Object,
    default: () => ({})
  }
})

const emits = defineEmits(["update", "error"])

const $q = useQuasar();
const refEl = ref()
let textValue = ref("")
const rules = ref([])
const fieldOptions = {...forms.text, ...props.options}
const fieldRules = {...rules.value, ...props.options?.rules ?? []}
/** Variables */
const selectedModel = ref()
const refSelect = ref()
const Options = ref([]);
const error = ref(false);
/** Options */
let OptionsFilters = ref([]);

onBeforeMount(() => {
  if (props.field && props.field?.options) {
    if (props.field.required) {
      rules.value.push(required)

    }
    if (props.field.options.min && !Number.isNaN(props.field.options.min)) {
      rules.value.push(minLength(field?.options.min))
    }
    if (props.field.options.max && !Number.isNaN(props.field.options.max)) {
      rules.value.push(maxLength(props.field.options.max))
    }
  }
})
onMounted(() => {
  if (props.options && props.options?.value) {
    textValue.value = props.options.value
  }
  if (props.modelValue.length > 0)
    textValue.value = props.modelValue

  // console.log("obj: ", textField.value)
})

function updateModel(val) {
  if (!props.multiple)
    selectedModel.value = val
  else
    selectedModel.value = val


  if (selectedModel.value) {
    refSelect.value.resetValidation()
    emits('hasError', false)
  } else {
    emits('hasError', true)
  }
  emits('updateModelValue', val)
}

function onRemove(index, value) {
  if (!props.multiple) {
    if (selectedModel.value.length === 0)
      selectedModel.value = []

  } else {
    selectedModel.value = ''
  }

}

function validate() {
  refSelect.value.validate()
}

function resetValidation() {
  error.value = false
  refSelect.value.resetValidation()
}

function reset() {
  if (!props.multiple) {
    selectedModel.value = []
  } else {
    selectedModel.value = ''
  }
  refSelect.value.reset()
  resetValidation()

}

function update(val) {
  textValue.value = val
  emits('update', textValue.value)
}

const value = computed(() => {
  return textValue.value
})
defineExpose({
  reset, validate, resetValidation, value
})

</script>

<style scoped lang="scss">

</style>

