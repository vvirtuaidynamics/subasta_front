<script setup>
import {forms} from "src/config/theme/forms";
import {useQuasar, date} from "quasar";
import {onBeforeMount, ref} from "vue";
import QBtnComponent from "components/base/QBtnComponent.vue";
import {useApp} from "src/composables/useApp";

const $q = useQuasar();
const {locale, dateLocale} = useApp();

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  datetime: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
  modelValue: {
    type: String,
    required: false
  },


})

const emits = defineEmits(["update"]);


const modelInputValue = ref('')
const modelDate = ref(null)
const modelTime = ref(null)
const refInput = ref(null)
const refDate = ref(null)
const refTime = ref(null)
const datePop = ref(false)
const rules = ref([])
const fieldOptions = {...forms.date, ...props.options};
const fieldRules = [...rules.value, ...(props.options?.rules ?? [])];

const dateNow = () => {
  if (datetime)
    return new Date().toISOString().slice(0, 19).replace("T", " ");
  else
    return new Date().toISOString().split("T")[0];
}
const timeNow = () => {
  const dateTimeNow = Date.now();
  return date.formatDate(dateTimeNow, 'HH:mm:ss')
}

const formatDate = (dateValue) => {
  let format = 'YYYY-MM-DD HH:mm:ss';
  if (props.datetime && locale.value === 'es')
    format = 'DD-MM-YYYY HH:mm:ss';
  if (!props.datetime && locale.value === 'es')
    format = 'DD-MM-YYYY';
  if (!props.datetime && locale.value !== 'es')
    format = 'YYYY-MM-DD';
  return date.formatDate(dateValue, format)
}


const ok = () => {
  if (!modelTime.value && props.datetime) {
    refTime.value.focus();
    return;
  }
  modelInputValue.value = props.datetime ? formatDate(`${modelDate.value.includes('T') ? modelDate.value.split('T')[0] : modelDate.value} ${modelTime.value || '00:00:00'}`)
    : formatDate(`${modelDate.value}`);
  const emitDate = props.datetime
    ? date.formatDate(`${modelDate.value} ${modelTime.value}:00`, 'YYYY-MM-DD HH:mm:ss')
    : date.formatDate(`${modelDate.value}`, 'YYYY-MM-DD');
  emits("update", emitDate);
};

const clear = () => {
  modelInputValue.value = null;
  modelDate.value = null;
  modelTime.value = null;
  emits("update", props.name, null);
};

onBeforeMount(() => {
  if (props.datetime)
    modelTime.value = timeNow()
  if (props.modelValue) {
    modelDate.value = props.modelValue.split(' ')[0] + 'T00:00:00';
    if (props.datetime) {
      modelTime.value = props.modelValue.split(' ')[1];
    }
    ok()
  }

})
const validate = () => {
  if (props.datetime) {
    return date.isValid(`${modelDate.value} ${modelTime.value}`)
  }
  return date.isValid(`${modelDate.value}T00:00:00`)
}
const resetValidation = () => {
  refInput.value.resetValidation()
}


defineExpose({
  validate,
  resetValidation,
});
</script>

<template>
  <q-input ref="refInput" v-model="modelInputValue" :rules="fieldRules" class="full-width"
           readonly :v-bind="fieldOptions" :label="label"
           @click="datePop=!datePop"

  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy :cover="$q.screen.lt.lg" transition-show="scale"
                       transition-hide="scale" :model-value="datePop"
                       @hide="datePop=false">
          <q-date ref="refDate" v-model="modelDate" mask="YYYY-MM-DD"
                  @update:model-value="ok" :locale="dateLocale.date">
            <q-bar class="q-pa-sm text-red-3" style="border-radius: 10px">
              <q-input ref="refTime" borderless
                       v-if="props.datetime"
                       v-model="modelTime"
                       type="time" @update:model-value="ok"/>
              <q-space/>
              <div class="q-gutter no-margin q-gutter-xs ">
                <q-btn-component
                  icon="check"
                  v-close-popup
                  :tooltips="dateLocale.label.ok"
                  @click="ok"
                  v-if="modelDate"
                />
                <q-btn-component
                  icon="mdi-cancel"
                  color="brown-5"
                  :tooltips="dateLocale.label.cancel"
                  v-close-popup
                />

                <q-btn-component
                  icon="mdi-eraser"
                  color="red"
                  :tooltips="dateLocale.label.clear"
                  v-close-popup
                  @click="clear"
                  v-if="modelDate || modelTime"
                />
              </div>
            </q-bar>

          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>

</template>

<style scoped lang="scss">

</style>
