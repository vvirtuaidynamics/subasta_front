import {$t} from "src/services/i18n";

export default function useField() {

  const fieldTypes = {
    boolean: 'boolean',
    datetime: 'datetime',
    image: 'image',
    images: 'images',
    json: 'json',
    object: 'object',
    number: 'number',
    password: 'password',
    string: 'string',
    text: 'text',
    geojson: 'geojson',
  }


  function field({name, label, type, component, order, group, ..._props}) {
    this.name = props?.name;
    this.label = $t(`fields.${props?.label}`) || props?.label;
    this.type = props?.type || fieldTypes.string;
    this.component = props?.component || 'TextField';
    this.order = props?.order || 0;
    this.group = props?.group || '';
    this.props = this._props || {}

    return {
      name: this.name,
      label: this.label,
      type: this.type,
      component: this.component,
      order: this.order,
      group: this.group,
      props: this._props
    }

  }

  return {
    field,
    fieldTypes,


  }
}
