import {$t} from "src/services/i18n";
import dataTypes from "src/types/data.types"

export default function useField() {

  function Field(name, type, props) {
    return {
      name: name,
      type: type,
      props: {...props}
    }
  }


  return {
    Field,
    dataTypes
  }
}
