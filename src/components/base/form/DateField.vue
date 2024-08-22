<template>
  <q-input
    filled
    v-model="model"
    :rules="rules"
    :name="props.name"
    :readonly="props.readonly"
    :label="props.label"
    v-bind="fieldOptions"
    class="full-width"
    @update:model-value="onUpdate"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="proxy" mask="DD/MM/YYYY">
            <div class="row items-center justify-end q-gutter-sm">
              <q-btn-component
                icon="check"
                v-close-popup
                :tooltips="$q.lang.label.ok"
                @click="ok(proxy)"
                v-if="proxy"
              />
              <q-btn-component
                icon="mdi-cancel"
                color="brown-5"
                :tooltips="$q.lang.label.cancel"
                v-close-popup
              />

              <q-btn-component
                icon="mdi-eraser"
                color="red"
                :tooltips="$q.lang.label.clear"
                v-close-popup
                @click="clear"
                v-if="proxy"
              />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup>
import {computed, onBeforeMount, onMounted, ref} from "vue";
import {forms} from "src/config/theme/forms";
import {required} from "src/services/validators";
import QBtnComponent from "../QBtnComponent.vue";

defineOptions({
  name: "DateField",
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
  readonly: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
});

const emits = defineEmits(["update"]);

const refEl = ref();
const model = ref(null);
const proxy = ref(null);
const rules = ref([]);
const fieldOptions = {...forms.date, ...props.options};
const fieldRules = {...rules.value, ...(props.options?.rules ?? [])};

onBeforeMount(() => {
  if (props.field && props.field?.options) {
    if (props.options?.required) {
      rules.value.push(required);
    }
  }
});

onMounted(() => {
  model.value = props.modelValue;
});

function onUpdate(val) {
  emits("update", props.name, val);
}

function validate() {
  refEl.value.validate();
}

function resetValidation() {
  refEl.value.resetValidation();
}

const ok = (val) => {
  model.value = val;
  emits("update", props.name, val);
};

const clear = () => {
  proxy.value = null;
  model.value = null;
  emits("update", props.name, null);
};

defineExpose({
  validate,
  resetValidation,
});
</script>

<style scoped lang="scss"></style>
