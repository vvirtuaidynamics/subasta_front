<template>
  <q-page padding>
    <table-component
      :name="name"
      :labelPlural="labelPlural"
      :labelSingular="labelSingular"
      :toStr="toStr"
      :icon="icon"
      :columns="columns"
      :rows="rows"
      :searchFields="searchFields"
      :filterFields="filterFields"
    ></table-component>
  </q-page>
</template>

<script setup>
import TableComponent from "components/shared/crud/table/TableComponent.vue";
import { $t } from "src/services/i18n";

defineOptions({
  name: "ListPage",
});

const name = "bearing";
const labelPlural = $t("models.bearings");
const labelSingular = $t("models.bearing");
const toStr = null;
const icon = "mdi-cube-outline";

const searchFields = [
  {
    value: "user",
    label: "Usuario",
  },
  {
    value: "first_name",
    label: "Nombre(s)",
  },
  {
    value: "last_name",
    label: "Apellidos",
  },
  {
    value: "email",
    label: "Correo",
  },
];

const filterFields = [
  {
    value: "active",
    type: "select",
  },
];

const columns = [
  {
    field: "weight",
    name: "weight",
    label: "Peso",
    align: "left",
    sortable: true,
    type: "text",
    required: true,
  },
  {
    field: "total_packages",
    name: "total_packages",
    label: "Cant. paquetes",
    align: "left",
    sortable: true,
    type: "text",
  },
  {
    field: "content_description",
    name: "content_description",
    label: "Descripción",
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
    user: `usuario${i}`,
    first_name: `nombre ${i}`,
    last_name: `apellidos ${i}`,
    email: `usuario${i}@correo.com`,
    active: i % 3 === 0,
  });
}
</script>
