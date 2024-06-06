<template>
  <q-btn
    round
    color="secondary"
    icon="mdi-table-check"
    size="sm"
    v-if="fullVisibleColums.length > 0"
  >
    <q-tooltip class="bg-brown">{{ $q.lang.table.columns }}</q-tooltip>
    <q-menu transition-show="scale" transition-hide="scale">
      <q-list dense>
        <q-item
          clickable
          v-for="(c, index) in fullVisibleColums"
          :key="`visible-columns-${index}`"
          @click="onChange(c)"
        >
          <q-item-section> {{ c.label }} </q-item-section>
          <q-item-section side>
            <q-icon name="check" size="xs" v-if="c.checked"></q-icon>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup>
defineOptions({
  name: "VisibleColumnsComponent",
});

import { ref, onMounted, watch } from "vue";

const props = defineProps({
  columns: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emit = defineEmits(["change"]);

const visibleColumns = ref([]);
const fullVisibleColums = ref([]);

onMounted(() => {
  fullVisibleColums.value = props.columns.filter(
    (c) => c.type !== "hidden" && !c.required
  );
  fullVisibleColums.value.forEach((c) => {
    c["checked"] = true;
  });
  visibleColumns.value = fullVisibleColums.value.map((c) => c.field);
});

const onChange = (c) => {
  c.checked = !c.checked;
  if (c.checked) {
    visibleColumns.value.push(c.name);
  } else {
    visibleColumns.value = visibleColumns.value.filter((v) => v !== c.name);
  }
  emit("change", visibleColumns.value);
};
</script>
