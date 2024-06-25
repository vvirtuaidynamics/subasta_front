<template>
  <q-input
    dense
    v-model="model"
    readonly
    :label="label"
    :clearable="clearable"
    style="width: 100%"
  >
    <template v-slot:append>
      <q-icon
        name="mdi-close-circle-outline"
        class="cursor-pointer"
        @click="clear"
        v-if="model"
      />
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy
          @before-show="updateProxy"
          cover
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date v-model="proxy" range mask="DD/MM/YYYY">
            <div class="row items-center justify-end q-gutter-sm">
              <q-btn-component
                icon="check"
                v-close-popup
                :tooltips="$q.lang.label.ok"
                @click="save"
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
                v-if="model"
              />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { date } from "quasar";
import QBtnComponent from "../QBtnComponent.vue";
import { $t } from "src/services/i18n";

defineOptions({
  name: "DateRangeField",
});

const props = defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
  dense: {
    type: Boolean,
    default: true,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
  },
  label: {
    type: String,
  },
});

const emit = defineEmits(["update"]);

const model = ref(null);
const proxy = ref(null);

onMounted(() => {
  if (props.modelValue) {
    model.value = `${normalizeDate(
      props.modelValue.from,
      "YYYY-MM-DD",
      "DD/MM/YYYY"
    )} - ${normalizeDate(props.modelValue.to, "YYYY-MM-DD", "DD/MM/YYYY")}`;
  }
});

const updateProxy = () => {
  if (model.value !== null) {
    const val = model.value.split(" - ");
    proxy.value =
      val[0] === val[1]
        ? model.value
        : {
            from: val[0],
            to: val[1],
          };
  }
};
const clear = () => {
  proxy.value = null;
  model.value = null;
  emit("update", props.name, null);
};
const save = () => {
  if (proxy.value !== null) {
    const { from, to } = proxy.value;
    model.value = from ? `${from} - ${to}` : `${proxy.value} - ${proxy.value}`;
    const temp = model.value.split(" - ");
    const dateToSend = {
      from: normalizeDate(temp[0], "DD/MM/YYYY", "YYYY-MM-DD"),
      to: normalizeDate(temp[1], "DD/MM/YYYY", "YYYY-MM-DD"),
    };
    emit("update", props.name, dateToSend);
  } else {
    emit("update", props.name, null);
  }
};
const normalizeDate = (d, currentFormat, outputFormat) => {
  const newDate = date.extractDate(d, currentFormat);
  return date.formatDate(newDate, outputFormat);
};
</script>
