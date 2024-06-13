<template>
  <q-btn-component
    :tooltips="$q.lang.label.remove"
    :size="size"
    icon="mdi-minus"
    color="red"
    @click="handleDelete"
  />
</template>

<script setup>
import { useQuasar } from "quasar";
import QBtnComponent from "src/components/base/QBtnComponent.vue";
defineOptions({
  name: "DeleteComponent",
});

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
