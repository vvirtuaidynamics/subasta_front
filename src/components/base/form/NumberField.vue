<template>
  <!--
  Requirement:

  * Params:
      options: {prepend_icon: string};
	  data: {...}; //input all props
 -->
  <div id="numberInput" class="full-width">
    <q-input :id="props.name" :name="props?.name" :label="getFormatValue()" :ref="refEl" reverse-fill-mask
             v-model.number="numValue" class="full-width" clearable @clear="reset" :rules="rules"
             @click="() => showOnClick ? showNumpad() : ''" @keydown.prevent="(key) => KeyPress(key)" lazy-rules
             :error="props.error ?? false" :error-message="props.errorMessage ?? ''" v-bind="fieldProps ?? null">
      <template #append>
        <q-btn v-if="numValue && hover" icon="mdi-delete-outline" @click="reset()"/>
        <q-btn icon="mdi-dialpad" flat class="cursor-pointer" round v-if="!isReadonly">
          <q-popup-proxy :model-value="showDialog" transition-show="flip-up" transition-hide="flip-down"
                         class="numpad-dialog" :breakpoint="400" :offset="[180, 5]" @before-hide="hideNumpad()">
            <div class="keyboard" style="width: 220px">
              <q-card :class="props.dark ? 'bg-blue-grey-10' : 'bg-blue-grey-1'">
                <q-card-section>
                  <div class="row q-col-gutter-sm">
                    <div class="col-4" v-for="(btn, index) in botones" :key="index">
                      <q-btn class="full-width" :class="setColor(btn)" @click="update(btn)">{{
                          btn
                        }}
                      </q-btn>
                    </div>
                    <div class="col-12">
                      <q-btn class=" full-width" color="positive" :label="$t('labels.done')" v-close-popup></q-btn>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-popup-proxy>
        </q-btn>
      </template>
      <template #prepend v-if="props.prependIcon || props.currency">
        <q-icon :name="props.currency ? 'attach_money' : props.prependIcon"/>
      </template>
    </q-input>
  </div>
</template>

<script setup>
import {computed, onBeforeMount, onMounted, ref, watch} from 'vue';
import {uid} from 'quasar';
import {$t} from 'src/services/i18n';
import {forms} from "src/config/theme/forms";

defineOptions({
  name: "NumberField",
});

/**
 * Props
 */
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String, //name, label, title
    required: false
  },
  showOnClick: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: String,
    default: '',
  },
  prependIcon: {
    type: String,
    default: '',
  },
  dark: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
    required: false

  },
  errorMessage: {
    type: String,
    default: '',
    required: false

  },
  options: {
    type: Object,
    default: () => {
    },
    required: false

  },
  currency: {
    type: Boolean,
    default: false,
  },
  unidad: {
    type: String, //CURRENCY CUP MLC USD EUR uds
    default: 'uds',
  },
});

/**
 * Const
 */
const refEl = ref()
const rules = ref([]);
let showDialog = ref(false)
const botones = [7, 8, 9, 4, 5, 6, 1, 2, 3, '.', 0, '<'];
const regexNum = /^[0-9.]+$/;
let keypad = ref(false);
const fieldProps = ref({...forms.number, ...props.options});

const uuid = ref(uid());
let numValue = ref('')
let hover = ref(false)

const isReadonly = computed(() => refEl.value?.readonly ?? false)
let unidad = props.currency && !props.unidad ? '(CUP)' : props.unidad ? `(${props.unidad})` : '(uds.)';

const showNumpad = () => showDialog.value = true
const hideNumpad = () => showDialog.value = false

const emits = defineEmits(['update', 'errors']);


onBeforeMount(() => {
  if (props.modelValue) {
    numValue.value = props.modelValue;
  }
  //valido el númerico
  if (props.required) {
    rules.value.push((val) => !!val || $t('validators.required'));
    rules.value.push(
      (value) =>
        (regexNum.test(value) && !Number.isNaN(value)) ||
        $t('validators.isNaN')
    );
  }


});
onMounted(() => {
});
const setColor = (v) => {
  if (!isNaN(v))
    return 'bg-blue-1 text-subtitle2 text-dark';
  else if (v === '<')
    return 'bg-red-8 text-white';
  else
    return 'bg-brown-6 text-white';
}

const reset = () => {
  numValue.value = '';
  emits('update', numValue.value);
}
const setCurrency = (value, currency, fraction) => {
  currency = currency || "USD";
  fraction = fraction || 2;
  var formatter = new Intl.NumberFormat("es", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: fraction,
  });
  return formatter.format(value);
}

const update = (val) => {
  // console.log(val);
  if (val.toString() === '<' && numValue.value.length > 0) {
    numValue.value = numValue.value.slice(0, numValue.value.length - 1)
  }

  if (isNaN(val?.toString())) {
    if (val === '.' && numValue.value.indexOf('.') === -1) {
      if (numValue.value.length === 0)
        numValue.value = '0.';
      else
        numValue.value += '.';

    }
    if (val === 'OK') {
      keypad.value = !keypad.value;


    }
  }
  if (!isNaN(val.toString())) {
    if (numValue.value.length === 0) {
      numValue.value = ''
    }
    if (val === 0 && numValue.value !== '0') {
      numValue.value += val.toString();
    }
    if (val !== 0) {
      if (numValue.value === '0')
        numValue.value = val.toString();
      else
        numValue.value += val.toString();
    }

  }
  emits('update', numValue.value);


}

const KeyPress = (e) => {
  let key = null
  key = e ?? null
  if (!numValue.value) numValue.value = ''
  if (!isNaN(e.key) || e.key === '.') {
    if (numValue.value.length > 0 && e.key === '.' && numValue.value.indexOf('.') === -1) {
      numValue.value += e.key;
    }
    if (numValue.value.length === 0 && e.key === '.' && numValue.value.indexOf('.') === -1) {
      numValue.value = '0.';
    }
    if (!isNaN(e.key) && numValue.value !== '0' && e.key !== '.')
      numValue.value += e.key
    if (!isNaN(e.key) && numValue.value === '0')
      numValue.value = e.key
  }

  //return;
}

const formatValue = (moneda, fraction = 2) => {
  return setCurrency(numValue.value, moneda ?? 'CUP', fraction)
}

function validate() {
  refEl.value.validate();
}

function resetValidation() {
  refEl.value.resetValidation();
}

function getFormatValue() {
  const label = ref(props.label || props.options?.label)

  if(label.value?.length) return label.value

  if (props.currency) {
    return setCurrency(numValue.value, props.unidad ?? 'CUP', 2)
  } else {

    return `${numValue.value} ${props.unidad ?? 'uds.'}`;
  }
}


watch(() => keypad.value, (n, o) => {
  keypad.value = n;
})
watch(() => numValue.value, (n, o) => {
  emits('update', numValue.value)
})
defineExpose({
  reset,
  validate,
  resetValidation,
  getFormatValue,
  formatValue
});
</script>

<style scoped lang="scss">
#numberInput {
  .numpad-dialog {
    width: max-content;
  }

  .picker {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    max-width: 80%;
    height: 300px;
    margin: 16px auto 0;
    background-color: #f8f8fa;
    border-radius: 4px;
    text-align: center;
    font-size: 18px;
    color: #bbbcc9;
  }

  .picker_chosen {
    background-color: #f8f8fa;
    border-top: 1px solid #dddde4;
    border-bottom: 1px solid #dddde4;
    color: #121212;
    font-size: 20px;
  }
}
</style>
