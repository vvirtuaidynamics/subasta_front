<template>
  <q-btn-component
    :tooltips="title"
    :icon="icon"
    :size="size"
    @click="showDialog = true"
  />

  <q-dialog v-model="showDialog" full-height>
    <q-card style="width: 600px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">
          <q-icon :name="icon" size="25px"></q-icon> {{ title }}
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-gutter-md"> </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
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
import QBtnComponent from "src/components/base/QBtnComponent.vue";

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
});

const emit = defineEmits(["save"]);

const title = ref(null);
const icon = ref(null);

const showDialog = ref(false);

onMounted(() => {
  if (props.object != null) {
    title.value = "Editar";
    icon.value = "edit";
  } else {
    title.value = "Adicionar";
    icon.value = "add";
  }
});
</script>
