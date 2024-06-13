import { $t } from "src/services/i18n";

export default {
  name: "users",
  urlBase: "",
  formActions: "",
  icon: "",
  columns: [
    {
      field: "user",
      name: "user",
      label: $t("label.user"),
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
  ],
};
