<template>
  <q-page padding>
    <table-component
      title="Grupos"
      icon="mdi-account-group-outline"
      :columns="columns"
      :rows="rows"
      :searchFields="searchFields"
    ></table-component>
  </q-page>
</template>

<script setup>
import TableComponent from "components/shared/crud/table/TableComponent.vue";

defineOptions({
  name: "IndexPage",
});

const searchFields = [
  {
    value: "name",
    label: "Nombre",
  },
];

const columns = [
  {
    field: "name",
    required: true,
    name: "name",
    label: "Nombre",
    align: "left",
    sortable: true,
    type: "text",
  },
  {
    field: "actions",
    name: "actions",
    label: "Acciones",
    type: "actions",
  },
];

const rows = [];

for (let i = 1; i < 101; i++) {
  rows.push({
    id: i,
    name: `Grupo${i}`,
  });
}
</script>
