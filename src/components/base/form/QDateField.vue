<template>

  <div id="QDateField" class="full-width">
      <q-input :name="`${name}_input`" ref="refInput" :v-bind="bindsProp"
               v-model="qdate_input" @click="() => qdate_pop = !qdate_pop"
               :rules="setRules()" readonly lazy-rules
               :label="props.label" class="cursor-pointer q-my-xs full-width"
               :error="qdate_error">
        <template v-slot:append>
          <q-btn flat round icon="mdi-eraser" v-if="qdate_input" @click="() => reset()" />
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="fade" transition-hide="scale" v-model="qdate_pop" :breakpoint="600">
              <q-date :name="`${props.name}_qdate`" :ref="refQDate" v-model="qdate_data" :locale="$q.lang.date" today-btn
                      :minimal="props.minimal" :multiple="props.multiple"
                      :landscape="props.landscape" :range="props.range" :error="qdate_error"
                      @update:model-value="(val) => qdateUpdate(val)" :rules="props.rules" >
<!--                <div class="row items-center justify-end">-->
<!--                  <q-btn v-close-popup :label="$q.lang.label.close" color="primary" flat />-->
<!--                </div>-->
              </q-date>

            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeMount } from 'vue';
import { useQuasar, date } from 'quasar';
import { DateTime, Interval } from 'luxon';
import {$t} from 'src/services/i18n';
import {forms} from "src/config/theme/forms";

defineOptions({
  name: "QDateField",
});

/**
 * Props
 */
const props = defineProps({
  name: {
    type: String, //name, label, title
    required: true
  },
  label: {
    type: String, //name, label, title
    required: true
  },
  rules: Array,
  modelValue: String,
  landscape: Boolean,
  minimal: Boolean,
  required: Boolean,
  range: Boolean,
  multiple: Boolean,
  options: {
    type: Object,
    default: () => ({})
  }
});

/**
 * Const
 */
const emits = defineEmits(["update", "error", "reset"]);
const $q = useQuasar();
const refEl = ref();
const bindsProp = {...forms.text, ...props.options};
let refQDate = ref()
let refInput = ref()
const qdate_pop = ref(false)
const qdate_error = ref(false)

const qdate_data = ref()
const qdate_input = ref('')
const qdate_emit = ref('')
const esLocale = $q.lang.date;

const ValidateDateInputRule = (val) => date.isValid(val) || $t('validations.validDate');
const requiredRule = (val) => !!val || $t('validations.required');

function validate() {
  refInput.value.validate()
  refQDate.value.validate()
}
function setRules() {
  const rules= []
  if (props.required) {
    rules.push(requiredRule)
  }
  if (props.rules) {
    props.rules?.forEach((r) => {
      rules.push(r)
    })
  }
  return rules
}
function reset() {
  qdate_emit.value = '';

  if (props.multiple) {

    qdate_data.value = []
    qdate_input.value = '';
  } else {
    qdate_data.value = ''
    qdate_input.value = '';
  }
  emits('update', qdate_emit.value)

}
function updateFromValue() {

  if (props.modelValue) {

    let dates = []
    let input = ''
    let temp_dates = []
    if (props.multiple) {
      // con multiple
      if (props.range) {
        //con rango
        temp_dates = props.modelValue.split(';')

        temp_dates.forEach((dt) => {
          if (dt) {

            let from = DateTime.fromISO(dt.split('|')[0]).toUTC() //, 'yyyy-MM-dd'
            let to = DateTime.fromISO(dt.split('|')[1]).toUTC() //, 'yyyy-MM-dd'

            let dif = Interval.fromDateTimes(from, to).length('days')

            if (dif === 0) {
              //SI LA DIFERENCIA ES MENOR A 1 DIA
              dates.push(from.toFormat('yyyy/MM/dd'))
              if (input.length === 0)
                input += `${from.toFormat('dd/MM/yyyy')}` //, esLocale
              else
                input += `, ${from.toFormat('dd/MM/yyyy')}` //, esLocale

            } else {
              //SI LA DIFERENCIA ES MAYOR A 1 DIA ENTONCES ES UN RANGO

              dates.push({ from: from.toFormat('yyyy/MM/dd'), to: to.toFormat('yyyy/MM/dd') })
              if (input.length === 0)
                input += `${$t('from')}: ${from.toFormat('dd/MM/yyyy')} ${$t('to')}: ${to.toFormat('dd/MM/yyyy')}`
              else
                input += `, ${$t('from')}: ${from.toFormat('dd/MM/yyyy')} ${$t('to')}: ${to.toFormat('dd/MM/yyyy')}`

            }
          }
        })
      } else {
        // sin rango
        temp_dates = props.modelValue.split(';')
        temp_dates.forEach((dt) => {
          let from = DateTime.fromISO(dt.split('|')[0]).toUTC()

          dates.push(from.toFormat('yyyy/MM/dd'))
          if (input.length === 0)
            input += `${from.toFormat('dd/MM/yyyy')}`
          else
            input += `, ${from.toFormat('dd/MM/yyyy')}`

        })
      }
    } else {
      //NO MULTIPLE
      if (props.range) {
        //con rango
        let from = DateTime.fromISO(props.modelValue.split('|')[0]).toUTC()
        let to = DateTime.fromISO(props.modelValue.split('|')[0]).toUTC()
        let dif = Interval.fromDateTimes(from, to).length('days')
        if (dif === 0) {
          //SI LA DIFERENCIA ES MENOR A 1 DIA
          dates.push(from.toFormat('yyyy/MM/dd'))
          if (input.length === 0)
            input = `${from.toFormat('dd/MM/yyyy')}`
          else
            input = `, ${from.toFormat('dd/MM/yyyy')}`
        } else {
          //SI LA DIFERENCIA ES MAYOR A 1 DIA ENTONCES ES UN RANGO
          dates = { from: from.toFormat('yyyy/MM/dd'), to: to.toFormat('yyyy/MM/dd') }
          if (input.length === 0)
            input = `${$t('from')}: ${from.toFormat('dd/MM/yyyy')} ${$t('to')}: ${to.toFormat('dd/MM/yyyy')}`
          else
            input = `, ${$t('from')}: ${from.toFormat('dd/MM/yyyy')} ${$t('to')}: ${to.toFormat('dd/MM/yyyy')}`

        }
      } else {
        //sin rango
        let oneDate = DateTime.fromISO(props.modelValue.split('|')[0]).toUTC()
        dates = oneDate.toFormat('yyyy/MM/dd')
        input = `${oneDate.toFormat('dd/MM/yyyy')}`

      }
    }
    qdate_data.value = dates
    qdate_input.value = input

    return { date: dates, input: input }
  }
  return false
}
function qdateUpdate(val) {

  qdate_input.value = '';
  qdate_emit.value = '';
  let temp_dates = []
  let input = ''
  let dates = []
  if (val) {
    qdate_data.value = val;

    if (!props.multiple) {
      //SIN MULTIPLE
      if (!props.range) {
        //SIN RANGO
        qdate_emit.value = `${date.formatDate(val, 'YYYY-MM-DD')}|${date.formatDate(val, 'YYYY-MM-DD')}`;
        qdate_input.value = date.formatDate(val, 'DD-MM-YYYY', esLocale);
      } else {
        //CON RANGO
        const desde = date.formatDate(val.from ?? val, 'DD/MM/YYYY', esLocale)
        const hasta = date.formatDate(val.to ?? val, 'DD/MM/YYYY', esLocale)
        qdate_emit.value = `${date.formatDate(val.from ?? val, 'YYYY-MM-DD')}|${date.formatDate(val.to ?? val, 'YYYY-MM-DD')}`;

        let dif = date.getDateDiff(date.formatDate(val.from ?? val, 'YYYY/MM/DD'), date.formatDate(val.to ?? val, 'YYYY/MM/DD'), $q.lang.date.days||'days')
        if (dif === 0) {
          if (qdate_input.value.length === 0) {
            qdate_input.value = `${desde}`
          } else {
            qdate_input.value = `, ${desde}`
          }
        } else {
          if (qdate_input.value.length === 0) {
            qdate_input.value = `${$t('from')}: ${desde} ${$t('to')}: ${hasta}`
          } else {
            qdate_input.value = `, ${$t('from')}: ${desde} ${$t('to')}: ${hasta}`
          }

        }

      }

    } else {
      //CON MULTIPLE
      if (!props.range) {
        //SIN RANGO
        qdate_input.value = '';
        qdate_emit.value = '';
        if (Array.isArray(val)) {
          let dtCount = 0
          val.forEach((dt) => {
            if (dtCount === 0) {
              qdate_input.value += date.formatDate(dt, 'DD/MM/YYYY', esLocale);
              qdate_emit.value += `${date.formatDate(dt, 'YYYY-MM-DD')}|${date.formatDate(dt, 'YYYY-MM-DD')}`;
            } else {
              qdate_emit.value += `;${date.formatDate(dt, 'YYYY-MM-DD')}|${date.formatDate(dt, 'YYYY-MM-DD')}`;
              qdate_input.value += `, ${date.formatDate(dt, 'DD/MM/YYYY', esLocale)}`;

            }
            dtCount++
          })
        }

      } else {

        //CON RANGO
        qdate_input.value = ''
        qdate_emit.value = '';
        if (Array.isArray(val)) {

          const dep_val = depureRangeDates(val);

          let dtCount = 0
          dep_val.forEach((dt) => {
            let dif = date.getDateDiff(date.formatDate(dt.from ?? dt, 'YYYY/MM/DD'), date.formatDate(dt.to ?? dt, 'YYYY/MM/DD'), 'days')

            if (dtCount === 0) {
              qdate_emit.value += `${date.formatDate(dt.from ?? dt, 'YYYY-MM-DD')}|${date.formatDate(dt.to ?? dt, 'YYYY-MM-DD')}`;
              if (dif === 0) {
                //SI LA DIFERENCIA ES MENOR A 1 DIA
                qdate_input.value += `${date.formatDate(date.formatDate(dt.from ?? dt, 'YYYY/MM/DD'), 'DD/MM/YYYY', esLocale)}`

              } else {
                //SI LA DIFERENCIA ES MAYOR A 1 DIA ENTONCES ES UN RANGO
                qdate_input.value += `${$t('from')}: ${date.formatDate(date.formatDate(dt.from ?? dt, 'YYYY/MM/DD'), 'DD/MM/YYYY', esLocale)} ${$t('to')}: ${date.formatDate(date.formatDate(dt.to ?? dt, 'YYYY/MM/DD'), 'DD/MM/YYYY', esLocale)}`
              }
            } else {
              qdate_emit.value += `;${date.formatDate(dt.from ?? dt, 'YYYY-MM-DD')}|${date.formatDate(dt.to ?? dt, 'YYYY-MM-DD')}`;

              if (dif === 0) {
                //SI LA DIFERENCIA ES MENOR A 1 DIA
                qdate_input.value += `, ${date.formatDate(date.formatDate(dt.from ?? dt, 'YYYY/MM/DD'), 'DD/MM/YYYY', esLocale)}`

              } else {
                //SI LA DIFERENCIA ES MAYOR A 1 DIA ENTONCES ES UN RANGO
                qdate_input.value += `, ${$t('from')}: ${date.formatDate(date.formatDate(dt.from ?? dt, 'YYYY/MM/DD'), 'DD/MM/YYYY', esLocale)} ${$t('to')}: ${date.formatDate(date.formatDate(dt.to ?? dt, 'YYYY/MM/DD'), 'DD/MM/YYYY', esLocale)} `
              }
            }
            dtCount++
          })
        }
      }

    }
    emits('update', qdate_emit.value)
  }
}
/**
 * depureRangeDates funcion que depura los rangos cuando multiple esta habilitado de forma tal que si un
 * rango contiene un value, lo quite.
 * @param dates
 * @return Array<{ from: string, to: string, Value: string }>
 */
function depureRangeDates(dates) {
  let v_result = []
  let r_result= []
  let qt_val = []
  if (dates.length > 0) {
    const values = dates.filter(d => typeof d === 'string')
    const ranges = dates.filter(d => typeof d === 'object')

    if (ranges && ranges.length > 0) {
      //ordenamos por fecha de inicio
      ranges.sort((a, b) => (new Date(a.from).getTime()) - (new Date(b.from).getTime()))
      values.sort((a, b) => (new Date(a).getTime()) - (new Date(b).getTime()))

      //creamos arreglo que contendra rangos sin intercepciones
      r_result.push(ranges[0])
      for (let i = 1; i < ranges.length; i++) {
        const rangoActual = ranges[i]
        const ultimoRango = r_result[r_result.length - 1];
        if ((new Date(rangoActual.from).getTime()) > (new Date(ultimoRango.to).getTime())) { r_result.push(rangoActual) }
        else if ((new Date(rangoActual.to).getTime()) > (new Date(ultimoRango.to).getTime())) { ultimoRango.to = rangoActual.to }
      }
    }
    if (values) {
      v_result = []
      values.forEach((v) => {
        if (r_result.length > 0) {
          r_result.forEach((r) => {
            if (!date.isBetweenDates((new Date(v).getTime()), (new Date(r.from).getTime()), (new Date(r.to).getTime()), { inclusiveFrom: true, inclusiveTo: true, onlyDate: true }))
              if (!v_result.includes(v))
                v_result.push(v)
          })
        } else {
          v_result.push(v)
        }
      })
      if (v_result.length > 0) {
        v_result.forEach((v) => {
          if (r_result.length > 0) {
            r_result.forEach((r) => {
              if (date.isBetweenDates((new Date(v).getTime()), (new Date(r.from).getTime()), (new Date(r.to).getTime()), { inclusiveFrom: true, inclusiveTo: true, onlyDate: true })) {
                let index = v_result.indexOf(v)
                v_result.splice(index, 1)
              }
            })
          }
        })
      }
    }
    v_result.forEach((v) => qt_val.push(v))
    r_result.forEach((r) => qt_val.push(r))

    qdate_data.value = qt_val

    return qt_val
  }

}
defineExpose({
  reset,
})

onBeforeMount(() => {
  if (props.modelValue) updateFromValue()

})

onMounted(() => {
})

</script>

<style scoped lang="scss">
#QDateField{}
</style>
