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

const name = "user";
const label_plural = $t("models.users");
const label_singular = $t("models.user");
const to_str = null;
const icon = "mdi-account-outline";

const searchFields = [
  {
    value: "username",
    label: $t("fields.username"),
  },
  {
    value: "first_name",
    label: $t("fields.first_name"),
  },
  {
    value: "last_name",
    label: $t("fields.last_name"),
  },
  {
    value: "email",
    label: $t("fields.email"),
  },
];

const filterFields = [
  {
    scope: "active",
    label: $t("fields.active"),
    type: "boolean",
    value: null,
  },
];

const columns = [
  {
    field: "username",
    name: "username",
    label: $t("fields.username"),
    align: "left",
    sortable: true,
    type: "text",
    required: true,
  },
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
    username: `usuario${i}`,
    first_name: `nombre ${i}`,
    last_name: `apellidos ${i}`,
    email: `usuario${i}@correo.com`,
    active: i % 3 === 0,
  });
}
</script>
