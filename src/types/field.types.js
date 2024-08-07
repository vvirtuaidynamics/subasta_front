import {$t} from "src/services/i18n";
import dataTypes from "src/types/data.types"

export default function useField() {

  function field(name, type, props) {
    return {
      name: name,
      type: type,
      props: {...props}
    }
  }

  return {
    field,
    dataTypes

  }
}
