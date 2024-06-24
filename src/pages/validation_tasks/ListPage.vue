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
const label_plural = $t("models.validationtasks");
const label_singular = $t("models.validationtasks");
const to_str = null;
const icon = "mdi-calendar-multiple-check";

const searchFields = [];

const filterFields = [
  {
    label: $t("fields.active"),
    type: "select",
  },
];

const columns = [
  {
    field: "type",
    name: "type",
    label: $t("fields.type"),
    align: "left",
    sortable: true,
    type: "text",
    required: true,
  },
  {
    field: "status",
    name: "status",
    label: $t("fields.status"),
    align: "left",
    sortable: true,
    type: "text",
  },
  {
    field: "validated",
    name: "validated",
    label: $t("fields.validated"),
    align: "left",
    sortable: true,
    type: "text",
  },
  {
    field: "validated_by",
    name: "validated_by",
    label: $t("fields.validated_by"),
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
    type: i % 3 === 0 ? "Tipo 1" : "Tipo 2",
    status: i % 3 === 0 ? "Pendiente" : "Validado",
    validated: i % 3 === 0 ? null : new Date(),
    validated_by: i % 3 === 0 ? `Usuario ${i}` : `Usuario ${i}`,
  });
}
</script>
