<template>
  <q-btn round color="red" icon="mdi-minus" :size="size" @click="handleDelete">
    <q-tooltip class="bg-red">{{ $q.lang.label.remove }}</q-tooltip>
  </q-btn>
</template>

<script setup>
defineOptions({
  name: "DeleteComponent",
});

import { useQuasar } from "quasar";

const props = defineProps({
  objects: {
    type: Array,
    required: true,
    default: () => [],
  },
  size: {
    type: String,
    default: "sm",
  },
});

const emit = defineEmits(["deleted"]);

const $q = useQuasar();

const handleDelete = () => {
  if (props.objects.length === 0) {
    $q.notify({
      position: "top-right",
      message: "Seleccione los objetos a eliminar",
      type: "negative",
      progress: true,
    });
  } else {
    $q.notify({
      position: "top-right",
      message: `Objetos a eliminar ${props.objects.map((o) => o.id)}`,
      type: "positive",
      progress: true,
    });
  }
};
</script>
