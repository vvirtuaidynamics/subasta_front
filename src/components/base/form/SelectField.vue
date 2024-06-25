<template>
  <!--
    SelectField
      props.name --- name
      props.label --- label
      props.options --- options [resto de opciones] estas tienen prioridad sobre las opciones generales.
        props.options.optionLabel --- [mapear un label desde una data] || default label
        props.options.optionValue --- [mapear un valor desde una data] || default value
      props.data ---- Permite pasar la data se toma id como valor y label como name por defecto.
      props.data_url --- Se pasa la url completa. Permite obtener los datos a partir de un endpoint y
        luego podemos mapear value por options.optionValue (default: id) y label por options.optionLabel


  -->
  <q-select
    ref="refEl"
    :dense="props.dense"
    :options-dense="props.dense"
    :name="props.name"
    :label="props.label"
    v-bind="fieldOptions"
    :loading="loading"
    :rules="fieldRules"
    multiple
    :option-label="props.options?.optionLabel ?? 'label'"
    :option-value="
      props.options?.optionValue ?? props.data_url?.length ? 'id' : 'value'
    "
    :option-disable="props.options?.optionDisable || 'disable'"
    :options="OptionsFilters"
    :model-value="selectedModel"
    transition-hide="flip-up"
    transition-show="flip-down"
    style="width: 100%"
    @click="handleClick()"
    @popup-show="handleClick()"
    @filter="(val, update, abort) => filterFn(val, update, abort)"
    :reset-validation="resetValidation ?? null"
    @update:model-value="(val) => updateModel(val)"
    :error="error"
    @remove="({ index, value }) => onRemove(index, value)"
  >
    <template #loading>
      <q-item>
        <q-item-section class="text-uppercase text-subtitle1">
          {{ $t("labels.loading") || "Loading" }}
        </q-item-section>
        <q-item-section avatar>
          <q-spinner-facebook size="xs"></q-spinner-facebook>
        </q-item-section>
      </q-item>
    </template>
    <template v-slot:no-option>
      <q-item>
        <q-item-section avatar>
          <q-icon name="mdi-alert-outline" />
        </q-item-section>
        <q-item-section class="text-grey">
          {{ $t("labels.noOptions") }}
        </q-item-section>
      </q-item>
    </template>
    <template v-slot:prepend v-if="props.prependIcon">
      <q-icon :name="props.prependIcon" />
    </template>
  </q-select>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, ref, watch } from "vue";
import { forms } from "src/config/theme/forms";
import { required } from "src/services/validators";
import { useQuasar } from "quasar";

defineOptions({
  name: "SelectField",
});

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  dense: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  emitValues: {
    type: Boolean,
    default: true,
  },
  preload: {
    type: Boolean,
    required: false,
  },
  data_url: { type: String, required: false },
  data: {
    type: Object,
    required: false,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
});

const emits = defineEmits(["update", "error"]);

const $q = useQuasar();
const refEl = ref(null);
let textValue = ref("");
const rules = ref([]);
const fieldOptions = ref({ ...forms.select, ...props.options });
const fieldRules = [...rules.value, ...(props.options?.rules ?? [])];
const loading = ref(false);
/** Variables */
const selectedModel = ref();
const Options = ref([]); //Total de <options>
let OptionsFilters = ref([]);

const error = ref(false);
/** Options */

onBeforeMount(async () => {
  if (props.data_url?.length && props.preload) {
    const data = await getDataFromUrl();
    Options.value = [...data];
    setLoading();
  }
  if (props.data && !props.data_url) {
    Options.value = [...props.data];
  }

  if (fieldOptions.value?.required) {
    rules.value.push(required);
  }

  if (props.options?.value) selectedModel.value = props.options?.value;

  if (props.modelValue.length > 0) selectedModel.value = props.modelValue;
});
onMounted(() => {
  selectedModel.value = refEl.value?.multiple ? [] : null;

  // console.log("obj: ", textField.value)
});

async function getDataFromUrl() {
  if (props.data_url?.length) {
    setLoading(true);
    try {
      const response = await fetch(props.data_url);
      return response.json();
    } catch (e) {
      setLoading();

      console.error(e);
    }
  }
}

async function handleClick() {
  if (!props.preload && props.data_url?.length) {
    const data = await getDataFromUrl();
    Options.value = [...data];
    setLoading();
  }
}

function setLoading(state = false) {
  loading.value = state;
}

function updateModel(val) {
  if (!props.multiple) {
    selectedModel.value = val;
  } else {
    selectedModel.value = val;
  }

  if (selectedModel.value) {
    refEl.value.resetValidation();
  } else {
    emits("error", true);
  }
  emits("update", val);
}

function onRemove(index, value) {
  if (!props.multiple) {
    if (selectedModel.value.length === 0) selectedModel.value = [];
  } else {
    selectedModel.value = "";
  }
}

function validate() {
  refEl.value.validate();
}

function resetValidation() {
  error.value = false;
  refEl.value.resetValidation();
}

function reset() {
  if (!props.multiple) {
    selectedModel.value = [];
  } else {
    selectedModel.value = "";
  }
  refEl.value.reset();
  resetValidation();
}

function update(val) {
  selectedModel.value = val;
  emits("update", selectedModel.value);
}

function filterFn(val, update, abort) {
  update(
    (sel) => {
      if (val === "") {
        OptionsFilters.value = [];
        Options.value.forEach((opt) => OptionsFilters.value.push(opt));
        return;
      } else {
        const needle = val.toLowerCase();
        //if (typeof (v.value) === 'string')
        OptionsFilters.value = Options.value.filter(
          (v) =>
            v[props.options?.optionLabel || "label"]
              ?.toLowerCase()
              .indexOf(needle) > -1
        );
      }
    },
    // "ref" is the Vue reference to the QSelect
    (refEl) => {
      if (
        val !== "" &&
        refEl.options?.length > 0 &&
        refEl.getOptionIndex() === -1
      ) {
        refEl.moveOptionSelection(1, true); // focus the first selectable option and do not update the input-value
        refEl.toggleOption(refEl.options[refEl.optionIndex], true); // toggle the focused option
      }
    }
  );
}

function abortFilterFn() {
  // console.log('delayed filter aborted')
}

const value = computed(() => {
  return selectedModel.value;
});

watch(
  () => Options.value,
  (new_opts) => {
    if (!props.preload && props.data_url?.length)
      OptionsFilters.value = [...new_opts];
  }
);

defineExpose({
  refEl,
  reset,
  validate,
  resetValidation,
  value,
});
</script>

<style scoped lang="scss"></style>
