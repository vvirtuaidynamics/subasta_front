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
import { $t } from "src/services/i18n";

defineOptions({
  name: "ListPage",
});

const name = "client";
const label_plural = $t("models.clients");
const label_singular = $t("models.client");
const to_str = null;
const icon = "mdi-briefcase-variant-outline";

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
    label: $t("fields.first_name"),
    align: "left",
    sortable: true,
    type: "text",
  },
  {
    field: "last_name",
    name: "last_name",
    label: $t("fields.last_name"),
    align: "left",
    sortable: true,
    type: "text",
  },
  {
    field: "email",
    name: "email",
    label: $t("fields.email"),
    align: "left",
    sortable: true,
    type: "text",
  },
  {
    field: "gender",
    name: "gender",
    label: $t("fields.gender"),
    align: "left",
    sortable: true,
    type: "text",
  },
  {
    field: "date_of_birth",
    name: "date_of_birth",
    label: $t("fields.birthday"),
    align: "left",
    sortable: true,
    type: "text",
  },
  {
    field: "address",
    name: "address",
    label: $t("fields.address"),
    align: "left",
    sortable: false,
    type: "text",
  },
  {
    field: "phone",
    name: "phone",
    label: $t("fields.phone"),
    align: "left",
    sortable: true,
    type: "text",
  },
  {
    field: "company",
    name: "company",
    label: $t("fields.company"),
    align: "left",
    sortable: true,
    type: "text",
  },
  {
    field: "industry",
    name: "industry",
    label: $t("fields.industry"),
    align: "left",
    sortable: true,
    type: "text",
  },
  {
    field: "active",
    name: "active",
    label: $t("fields.active"),
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
