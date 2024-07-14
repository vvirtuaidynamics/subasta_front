export function field(name, field, label, type, options = {}) {
  return {
    name,
    field,
    label,
    type,
    sortable: options.sortable || false,
    align: options.align || "left",
    filterable: options.filterable || false,
    show: options.show || true,
    width: options.width || 150,
    formatter: options.formatter || null,
    component: options.component || 'inputText'
  }
}
