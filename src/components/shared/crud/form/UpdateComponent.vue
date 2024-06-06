<template>
  <q-btn
    round
    @click="showDialog = true"
    icon="fa fa-edit"
    color="secondary"
    size="xs"
  >
    <q-tooltip class="bg-brown">{{ $q.lang.label.update }}</q-tooltip>
  </q-btn>

  <q-dialog v-model="showDialog" full-height>
    <q-card style="width: 600px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">
          <q-icon name="edit" size="25px"></q-icon> {{ $q.lang.label.update }}
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
  name: "UpdateComponent",
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
