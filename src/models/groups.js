export default useTable(() => {
  const columns = [
    {
      field: "name",
      required: true,
      name: "name",
      label: "Nombre",
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
  const search_fields = [];
  const filter_fields = [];
  return {
    columns,
    search_fields,
    filter_fields,
  };
});
