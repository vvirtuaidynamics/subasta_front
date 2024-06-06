<template>
  <q-btn
    round
    @click="showDialog = true"
    icon="fa fa-history"
    color="secondary"
    size="xs"
  >
    <q-tooltip class="bg-brown">Hist&oacute;rico</q-tooltip>
  </q-btn>

  <q-dialog v-model="showDialog" full-height>
    <q-card style="width: 600px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">
          <q-icon name="fa fa-history" size="18px"></q-icon> Hist&oacute;rico
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-gutter-md"> </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat :label="$q.lang.label.close" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
defineOptions({
  name: "HistoryComponent",
});

import { ref, onMounted, watch } from "vue";

const props = defineProps({
  object: {
    type: Object,
    required: true,
  },
});

const showDialog = ref(false);
</script>
