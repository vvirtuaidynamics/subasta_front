<template>
  <q-btn-component
    :tooltips="$t(object === null ? 'labels.add' : 'labels.edit')"
    :icon="icon"
    :size="size"
    @click="showDialog = true"
  />

  <q-dialog v-model="showDialog">
    <q-card style="width: 500px">
      <dialog-header-component :icon="icon" :title="title" closable />
      <q-card-section>
        <div
          class="row"
          v-for="(f, index) in fields"
          :key="`field-${index}`"
          style="margin-bottom: 10px"
        >
          <text-field
            :label="f.label"
            :name="f.name"
            :modelValue="object ? object[f.name] : null"
            :options="f.props"
            v-if="f.type === 'text'"
          />
          <checkbox-field
            :label="f.label"
            :name="f.name"
            :modelValue="object ? object[f.name] : false"
            :options="f.props"
            v-if="f.type === 'checkbox'"
          />
          <select-field
            :label="f.label"
            :name="f.name"
            :modelValue="object ? (object[f.name] ? [object[f.name]] : []) : []"
            :options="f.options"
            :filterable="f.filterable"
            v-if="f.type === 'select'"
          />
          <date-field
            :label="f.label"
            :name="f.name"
            :modelValue="object ? object[f.name] : null"
            :options="f.props"
            v-if="f.type === 'date'"
          />
        </div>
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

import { ref, onMounted, watch, readonly } from "vue";
import DialogHeaderComponent from "src/components/base/DialogHeaderComponent.vue";
import QBtnComponent from "src/components/base/QBtnComponent.vue";
import TextField from "src/components/base/form/TextField.vue";
import SelectField from "src/components/base/form/SelectField.vue";
import CheckboxField from "src/components/base/form/CheckboxField.vue";
import DateField from "src/components/base/form/DateField.vue";
import RadioField from "src/components/base/form/RadioField.vue";
import { $t } from "src/services/i18n";

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

onMounted(() => {
  if (props.object != null) {
    title.value = `${$t("labels.edit")} ${props.object_label}`;
    icon.value = "edit";
  } else {
    title.value = `${$t("labels.add")} ${props.object_label}`;
    icon.value = "add";
  }
});

const save = (add) => {};
</script>
