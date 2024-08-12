<template>
  <q-page padding>
    <table-component
      :collection="collection"
      :labelPlural="labelPlural"
      :labelSingular="labelSingular"
      :toStr="toStr"
      :icon="icon"
      :columns="columns"
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

const collection = "products";
const labelPlural = $t("models.products");
const labelSingular = $t("models.product");
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
    field: "price",
    required: true,
    name: "price",
    label: $t("fields.price"),
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
</script>
