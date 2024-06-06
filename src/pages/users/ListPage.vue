<template>
  <q-page padding>
    <table-component
      title="Usuarios"
      icon="mdi-account"
      :columns="columns"
      :rows="rows"
      :searchFields="searchFields"
      :filterFields="filterFields"
      :has_delete="false"
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
    field: "user",
    name: "user",
    label: "Usuario",
    align: "left",
    sortable: true,
    type: "text",
    required: true,
  },
  {
    field: "first_name",
    name: "first_name",
    label: "Nombre(s)",
    align: "left",
    sortable: true,
    type: "text",
  },
  {
    field: "last_name",
    name: "last_name",
    label: "Apellidos",
    align: "left",
    sortable: true,
    type: "text",
  },
  {
    field: "email",
    name: "email",
    label: "Correo",
    align: "left",
    sortable: true,
    type: "text",
  },
  {
    field: "active",
    name: "active",
    label: "Activo",
    align: "center",
    type: "boolean",
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
