<template>
  <q-tel-input v-model="phone" :search="true" lo default-country="ES" strictness="FULL" v-bind="props.options"
  ></q-tel-input>
</template>

<script setup>
import {QTelInput} from 'quasar-ui-q-tel-input'
import {ref, watch} from "vue";

defineOptions({
  name: "PhoneField",
});

const props = defineProps({
  modelValue: {type: String, required: false},
  options: {
    type: Object, default: () => {
    }
  }
})

const phone = ref('')
const emits = defineEmits(['update'])

const reset = () => phone.value = ''

watch(() => phone.value, (newValue) => {
  emits('update', newValue);

})

</script>
<style src="quasar-ui-q-tel-input/dist/index.css"></style>
<style scoped lang="scss">
</style>
