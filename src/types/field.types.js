import {$t} from "src/services/i18n";
import dataTypes from "src/types/data.types"

export default function useField() {

  function field({name, label, type, ..._props}) {
    this.name = props?.name;
    this.label = $t(`fields.${props?.label}`) || props?.label;
    this.type = props?.type || dataTypes.string;
    this.component = props?.component || 'TextField';
    this.props = this._props || {}

    return {
      name: this.name,
      label: this.label,
      type: this.type,
      component: this.component,
      props: this._props
    }

  }

  return {
    field,
    dataTypes

  }
}
