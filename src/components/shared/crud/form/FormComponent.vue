<template>
  <q-btn-component
    :tooltips="$t(object === null ? 'labels.add' : 'labels.edit')"
    :icon="icon"
    :size="size"
    @click="showDialog = true"
  />

  <q-dialog v-model="showDialog" persistent @show="onShow">
    <q-card style="width: 500px">
      <dialog-header-component :icon="icon" :title="fullTitle" closable />
      <q-card-section style="max-height: 50vh" class="scroll">
        <q-form class="q-gutter-md" ref="form" greedy>
          <form-body
            :object="object"
            :fields="fields"
            @update="onUpdateField"
          />
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
import FormBody from "./FormBody.vue";
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
  fieldToStr: {
    type: String,
    default: "id",
  },
  title: {
    type: String,
    default: "Object",
  },
  fields: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["save"]);

const fullTitle = ref(null);
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
    fullTitle.value = `${$t("labels.edit")} ${props.title}`;
    icon.value = "edit";
  } else {
    fullTitle.value = `${$t("labels.add")} ${props.title}`;
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
