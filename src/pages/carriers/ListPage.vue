<template>
  <q-page padding>
    <table-component
      :name="name"
      :label_plural="label_plural"
      :label_singular="label_singular"
      :to_str="to_str"
      :icon="icon"
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
  name: "ListPage",
});

const name = "carrier";
const label_plural = "Transportistas";
const label_singular = "Transportista";
const to_str = null;
const icon = "mdi-human-male";

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
    field: "first_name",
    name: "first_name",
    label: "Nombre(s)",
    align: "left",
    sortable: true,
    type: "text",
    required: true,
  },
  {
    field: "last_name",
    name: "last_name",
    label: "Apellidos",
    align: "left",
    sortable: true,
    type: "text",
    required: true,
  },
  {
    field: "email",
    name: "email",
    label: "Correo",
    align: "left",
    sortable: true,
    type: "text",
    required: true,
  },
  {
    field: "gender",
    name: "gender",
    label: "Género",
    align: "left",
    sortable: true,
    type: "text",
  },
  {
    field: "date_of_birth",
    name: "date_of_birth",
    label: "F. nacimiento",
    align: "left",
    sortable: true,
    type: "text",
  },
  {
    field: "address",
    name: "address",
    label: "Dirección",
    align: "left",
    sortable: false,
    type: "text",
  },
  {
    field: "phone",
    name: "phone",
    label: "Teléfono",
    align: "left",
    sortable: true,
    type: "text",
  },
  {
    field: "company",
    name: "company",
    label: "Compañía",
    align: "left",
    sortable: true,
    type: "text",
  },
  {
    field: "industry",
    name: "industry",
    label: "Industria",
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
    first_name: `nombre ${i}`,
    last_name: `apellidos ${i}`,
    email: `usuario${i}@correo.com`,
    active: i % 3 === 0,
  });
}
</script>
