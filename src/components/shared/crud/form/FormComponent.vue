<template>
  <q-btn-component
    :tooltips="$t(object === null ? 'labels.add' : 'labels.edit')"
    :icon="icon"
    :size="size"
    @click="showDialog = true"
  />

  <q-dialog v-model="showDialog" persistent @show="onShow">
    <q-card style="width: 500px">
      <dialog-header-component :icon="icon" :title="title" closable />
      <q-card-section>
        <q-form class="q-gutter-md" ref="form" greedy>
          <div
            class="form-field"
            v-for="(f, index) in fields"
            :key="`field-${index}`"
          >
            <text-field
              :label="f.label"
              :name="f.name"
              :modelValue="object ? object[f.name] : null"
              :options="f.props"
              @update="onUpdateField"
              v-if="f.type === 'text'"
            />
            <checkbox-field
              :label="f.label"
              :name="f.name"
              :modelValue="object ? object[f.name] : false"
              :options="f.props"
              @update="onUpdateField"
              v-else-if="f.type === 'checkbox'"
            />
            <select-field
              :label="f.label"
              :name="f.name"
              :modelValue="
                object ? (object[f.name] ? [object[f.name]] : []) : []
              "
              :options="f.options"
              :filterable="f.filterable"
              @update="onUpdateField"
              v-else-if="f.type === 'select'"
            />
            <date-field
              :label="f.label"
              :name="f.name"
              :modelValue="object ? object[f.name] : null"
              :options="f.props"
              @update="onUpdateField"
              v-else-if="f.type === 'date'"
            />
          </div>
        </q-form>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn
          outline
          :label="$t('labels.save')"
          color="primary"
          @click="save(false)"
        />
        <q-btn
          outline
          :label="$t('labels.saveAndAddOther')"
          color="primary"
          @click="save(true)"
          v-if="!object"
        />
        <q-btn
          outline
          :label="$q.lang.label.cancel"
          color="red"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
defineOptions({
  name: "FormComponent",
});

import { ref, onMounted, onBeforeMount } from "vue";
import DialogHeaderComponent from "src/components/base/DialogHeaderComponent.vue";
import QBtnComponent from "src/components/base/QBtnComponent.vue";
import TextField from "src/components/base/form/TextField.vue";
import SelectField from "src/components/base/form/SelectField.vue";
import CheckboxField from "src/components/base/form/CheckboxField.vue";
import DateField from "src/components/base/form/DateField.vue";
import RadioField from "src/components/base/form/RadioField.vue";
import { $t } from "src/services/i18n";
import { useQuasar } from "quasar";

const props = defineProps({
  fields: {
    type: Array,
    default: () => [],
  },
  size: {
    type: String,
    default: "xs",
  },
  object: {
    type: Object,
    default: null,
  },
  object_str: {
    type: String,
    default: "id",
  },
  object_label: {
    type: String,
    default: "Object",
  },
  fields: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["save"]);

const title = ref(null);
const icon = ref(null);

const showDialog = ref(false);

const form = ref(null);

const $q = useQuasar();

let formData = {};

onBeforeMount(() => {
  setDefaultData();
});

onMounted(() => {
  if (props.object != null) {
    title.value = `${$t("labels.edit")} ${props.object_label}`;
    icon.value = "edit";
  } else {
    title.value = `${$t("labels.add")} ${props.object_label}`;
    icon.value = "add";
  }
});

const setDefaultData = () => {
  props.fields.forEach((f) => {
    formData[f.name] = props.object
      ? props.object[f.name]
        ? props.object[f.name]
        : f.type === "checkbox"
        ? false
        : null
      : null;
  });
};

const onUpdateField = (name, val) => {
  formData[name] = val;
};

const save = (add) => {
  form.value.validate().then((success) => {
    if (success) {
      if (Object.keys(formData).length === 0) {
        $q.notify({
          position: "top-right",
          message: $t("alerts.noChanges"),
          type: "info",
          progress: true,
        });
        showDialog.value = false;
      } else {
        console.log(formData);
      }
    } else {
      $q.notify({
        position: "top-right",
        message: $t("errorValidation"),
        type: "negative",
        progress: true,
      });
    }
  });
};

const onShow = () => {
  setDefaultData();
};
</script>
