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
const label_plural = $t("models.history");
const label_singular = $t("models.history");
const to_str = null;
const icon = "mdi-account-clock-outline";

const searchFields = [];

const filterFields = [];

const columns = [
  {
    field: "created_at",
    name: "created_at",
    label: $t("fields.created_at"),
    align: "left",
    sortable: true,
    type: "date",
    required: true,
  },
  {
    field: "user",
    name: "user",
    label: $t("fields.user"),
    align: "left",
    sortable: true,
    type: "text",
  },
  {
    field: "action",
    name: "action",
    label: $t("fields.action"),
    align: "left",
    sortable: true,
    type: "text",
  },
  {
    field: "model",
    name: "model",
    label: $t("fields.model"),
    align: "left",
    sortable: true,
    type: "text",
  },
  {
    field: "object",
    name: "object",
    label: $t("fields.object"),
    align: "left",
    sortable: true,
    type: "text",
  },
  {
    field: "message",
    name: "message",
    label: $t("fields.message"),
    align: "center",
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
    created_at: new Date(),
    user: `Usuario ${i}`,
    model: i % 3 === 0 ? "Usuario" : "Grupo",
    action: i % 3 === 0 ? "Adicionar" : "Modificar",
    object: `Objeto ${i}`,
    message: i % 3 === 0 ? "Adicionado" : "Modificado",
  });
}
</script>
