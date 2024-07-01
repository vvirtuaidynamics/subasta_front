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
      :createFields="fields"
      :updateFields="fields"
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

const name = "group";
const labelPlural = $t("models.groups");
const labelSingular = $t("models.group");
const toStr = null;
const icon = "mdi-account-multiple-outline";

const searchFields = [
  {
    value: "name",
    label: $t("fields.name"),
  },
];

const columns = [
  {
    field: "name",
    required: true,
    name: "name",
    label: $t("fields.name"),
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

const fields = [
  {
    name: "name",
    label: $t("fields.name"),
    type: "text",
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
