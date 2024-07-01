<template>
  <q-select
    v-model="model"
    :dense="dense"
    :options-dense="dense"
    :name="name"
    :label="label"
    :multiple="multiple"
    :clearable="clearable"
    :options="allOptions"
    :use-input="filterable"
    hide-bottom-space
    emit-value
    map-options
    transition-hide="flip-up"
    transition-show="flip-down"
    class="full-width"
    @filter="filterFn"
    @update:model-value="(val) => updateModel(val)"
  >
  </q-select>
</template>

<script setup>
import { ref, onMounted } from "vue";

defineOptions({
  name: "SelectField",
});

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  dense: {
    type: Boolean,
    default: true,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  filterable: {
    type: Boolean,
    default: true,
  },
  hidde_bottom_space: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
  },
  label: {
    type: String,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default: () => [],
  },
  url_to_options: String,
});

const emits = defineEmits(["update", "error"]);

const model = ref(null);

const currentOptions = ref([]);
const allOptions = ref([]);

onMounted(() => {
  setData();
});

const setData = async () => {
  await setDataFromServer(props.url_to_options);
  if (currentOptions.value.length === 0) {
    currentOptions.value = props.options;
  } else {
    props.options.forEach((o) => {
      currentOptions.value.push(o);
    });
  }
  allOptions.value = currentOptions.value;
  setModelValue();
};

const setDataFromServer = async () => {
  if (props.url_to_options) {
    await axios
      .get(props.url_to_options)
      .then((response) => {
        currentOptions.value = response.data.items;
      })
      .catch((error) => {
        currentOptions.value = [];
      });
  }
};

const setModelValue = () => {
  if (props.modelValue?.length > 0) {
    let current_selected = [];
    props.modelValue.forEach((o) => {
      let option = currentOptions.value.find((opt) => opt.value === o);
      if (option) {
        current_selected.push(option);
      }
    });
    model.value = props.multiple ? current_selected : current_selected[0];
  } else {
    model.value = null;
  }
};

const filterFn = (val, update, abort) => {
  setTimeout(() => {
    update(
      () => {
        if (val === "") {
          currentOptions.value = allOptions.value;
        } else {
          const needle = val.toLowerCase();
          currentOptions.value = allOptions.value.filter((v) =>
            v.label
              ? v.label.toLowerCase().indexOf(needle) > -1
              : v.toLowerCase().indexOf(needle) > -1
          );
        }
      },
      (ref) => {
        if (
          val !== "" &&
          ref.options.length > 0 &&
          ref.getOptionIndex() === -1
        ) {
          ref.moveOptionSelection(1, true);
          ref.toggleOption(ref.options[ref.optionIndex], true);
        }
      }
    );
  }, 100);
};

const updateModel = (val) => {
  emits("update", props.name, val);
};
</script>
