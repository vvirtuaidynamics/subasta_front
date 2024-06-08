<script setup>
import {computed, onBeforeMount, onMounted, ref} from "vue";
import {forms} from "src/config/theme/forms";
import {maxLength, minLength, required} from "src/services/validators";

const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  },
  name: {
    type: String, //name, label, title
    required: true
  },
  label: {
    type: String, //name, label, title
    required: true
  },
  options: {
    type: Object,
    default: () => ({})
  }
})

const emits = defineEmits(["update", "error"])

const refEl = ref()
let textValue = ref("")
const rules = ref([])
const fieldOptions = {...forms.text, ...props.options}
const fieldRules = {...rules.value, ...props.options?.rules ?? []}
// const bus = inject('bus');


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

function reset() {
  textValue.value = ''
  emits('update', textValue.value)
}

function update(val) {
  textValue.value = val
  emits('update', textValue.value)
}

function validate() {
  refEl.value.validate()
}

function resetValidation() {
  refEl.value.resetValidation()
}

const value = computed(() => {
  return textValue.value
})
defineExpose({
  reset, validate, resetValidation, value
})

</script>

<template>
  <q-input :ref="refEl" :name="props.name" :label="props.label" type="text" v-bind="fieldOptions" v-model="textValue" class="full-width"
           @update:model-value="(val)=>update(val)" >
    <template #append v-if="props.options && props.options.appendIcon">
      <q-icon :name="props.options.appendIcon"/>
    </template>
    <template #prepend v-if="props.options && props.options?.prependIcon">
      <q-icon :name="props.options.prependIcon"/>
    </template>
    <template #loading="props" v-if="props.data && props.data['loading']">
      <q-spinner-facebook color="info"/>
    </template>

  </q-input>

</template>

<style scoped lang="scss">

</style>

