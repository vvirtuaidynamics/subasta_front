<template>
  <q-btn-component
    :tooltips="$t(object === null ? 'labels.add' : 'labels.edit')"
    :icon="icon"
    :size="size"
    @click="showDialog = true"
  />

  <q-dialog v-model="showDialog">
    <q-card style="width: 600px">
      <dialog-header-component :icon="icon" :title="title" closable />
      <q-card-section>
        asdfasdf asdf adsf gsdfg sdfg sdfg sdgf sdfgs dfgs dfgsd fgsdfg dsg sdfg
        sdfgs dfg sdfgs dfg sdfg</q-card-section
      >
      <q-card-actions align="right">
        <q-btn flat color="secondary">Adicionar</q-btn>
        <q-btn flat color="secondary">Adicionar y crear otro</q-btn>
        <q-btn flat :label="$q.lang.label.cancel" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
defineOptions({
  name: "FormComponent",
});

import { ref, onMounted, watch } from "vue";
import DialogHeaderComponent from "src/components/base/DialogHeaderComponent.vue";
import QBtnComponent from "src/components/base/QBtnComponent.vue";
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
</script>
