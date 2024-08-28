<template>
  <q-file
    v-model="model"
    ref="modelRef"
    :label="label"
    :multiple="multi_files"
    :clearable="clearable"
    class="full-width"
    :class="file_icons.length <= 1 ? '' : 'hidden'"
    :dense="dense"
    @update:model-value="updateIcons"
    @clear="onClear"
    :v-bind="fieldOptions"
  >
    <template v-slot:prepend v-if="file_icons.length > 0">
      <q-icon :name="file_icons[0]"/>
    </template>
    <template v-slot:append>
      <q-icon
        name="attachment"
        class="cursor-pointer"
        color="primary"
        @click="modelRef.pickFiles()"
      >
        <q-tooltip-component :title="$t('file.select')"
        />
      </q-icon>
    </template>
  </q-file>
  <q-list dense v-if="model?.length > 1" class="full-width">
    <q-item>
      <q-item-section v-if="label">
        {{ label }}
      </q-item-section>
      <q-item-section thumbnail>
        <q-btn-component
          icon="add"
          size="xs"
          :tooltips="$t('file.add')"
          @click="changeFile(-1)"
        ></q-btn-component>
      </q-item-section>
      <q-item-section thumbnail>
        <q-btn-component
          icon="mdi-trash-can-outline"
          size="xs"
          color="negative"
          :tooltips="$t('file.clear')"
          @click="onClear"
        ></q-btn-component>
      </q-item-section>
    </q-item>
    <q-item v-for="(f, index) in model" :key="`file-${index}`">
      <q-item-section avatar style="min-width: 10px; padding-right: 2px">
        <q-icon :name="file_icons[index]" size="xs"/>
      </q-item-section>
      <q-item-section>
        <q-item-label lines="1">
          {{ f.name }}
          <q-tooltip-component :title="f.name"/>
        </q-item-label>
      </q-item-section>
      <q-item-section thumbnail>
        <q-btn-component
          icon="sync"
          size="xs"
          :tooltips="$t('file.change')"
          @click="changeFile(index)"
        ></q-btn-component>
      </q-item-section>
      <q-item-section thumbnail>
        <q-btn-component
          icon="mdi-trash-can-outline"
          size="xs"
          color="negative"
          :tooltips="$t('file.delete')"
          @click="removeFile(index)"
        ></q-btn-component>
      </q-item-section>
    </q-item>
  </q-list>

  <q-file
    ref="modelChangeRef"
    class="hidden"
    @update:model-value="onChangeFile"
  />
</template>
<script setup>
import {ref, onMounted, watch} from "vue";
import {useQuasar} from "quasar";
import QBtnComponent from "../QBtnComponent.vue";
import QTooltipComponent from "../QTooltipComponent.vue";
import {$t} from "src/services/i18n";
import {forms} from "src/config/theme/forms";

defineOptions({
  name: "FileField",
});

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  dense: {
    type: Boolean,
    default: true,
  },
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emits = defineEmits(["update"]);

const model = ref(null);
const modelRef = ref(null);
const modelChangeRef = ref(null);
const multi_files = ref(false);
const change_file_index = ref(null);
const file_icons = ref([]);
const $q = useQuasar();
const rules = ref([])

const fieldOptions = {...forms.text, ...props.options};
const fieldRules = {...rules.value, ...(props.options?.rules ?? [])};

onMounted(() => {
  multi_files.value = props.multiple;
});

const removeFile = (index) => {
  file_icons.value.splice(index, 1);
  modelRef.value.removeAtIndex(index);
  emits("update", model.value);
};

const changeFile = (index) => {
  change_file_index.value = index;
  modelChangeRef.value.pickFiles();
};

const onChangeFile = (f) => {
  let fileExists = model.value.find(
    (m) => m.name === f.name && m.type === f.type
  );
  if (!fileExists) {
    if (change_file_index.value === -1) {
      model.value.push(f);
      file_icons.value.push(getIconFromFile(f));
    } else {
      model.value[change_file_index.value] = f;
      file_icons.value[change_file_index.value] = getIconFromFile(f);
    }
    emits("update", model.value);
  } else {
    $q.notify({
      position: "top-right",
      message: $t("file.exists"),
      type: "negative",
      progress: true,
    });
  }
};

const onClear = () => {
  model.value = null;
  file_icons.value = [];
  emits("update", null);
};

const updateIcons = () => {
  file_icons.value = [];
  if (model.value) {
    if (Array.isArray(model.value)) {
      model.value.forEach((f) => {
        file_icons.value.push(getIconFromFile(f));
      });
    } else {
      file_icons.value.push(getIconFromFile(model.value));
    }
    emits("update", model.value);
  }
};

const getIconFromFile = (f) => {
  return f.type.indexOf("video/") === 0
    ? "movie"
    : f.type.indexOf("image/") === 0
      ? "photo"
      : f.type.indexOf("audio/") === 0
        ? "audiotrack"
        : "insert_drive_file";
};
</script>
