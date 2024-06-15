import {$t} from "src/services/i18n";

export default function useField() {

  const fieldTypes = {
    boolean: 'boolean',
    datetime: 'datetime',
    timestamps: 'timestamps',
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


  function field({name, label, type, ..._props}) {
    this.name = props?.name;
    this.label = $t(`fields.${props?.label}`) || props?.label;
    this.type = props?.type || fieldTypes.string;
    this.props = this._props || {}

    return {
      name: this.name,
      label: this.label,
      type: this.type,
      props: this._props
    }

  }

  return {
    field,
    fieldTypes,


  }
}
