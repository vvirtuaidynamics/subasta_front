import {$t} from "src/services/i18n";
import useField from "src/types/field"

export default function useFields() {
  const {field, fieldTypes} = useField();

  const fields = {
    name: field({name: 'name', label: 'name'}),
    last_name: field({name: 'last_name', label: 'last_name'}),
    email: field({name: 'email', label: 'email'}),
    phone: field({name: 'phone', label: 'phone'}),
    company: field({name: 'company', label: 'company'}),
    industry: field({name: 'industry', label: 'industry'}),
    status: field({name: 'status', label: 'status', type: fieldTypes}),
    created_at: field({name: 'created_at', label: 'created_at', type: fieldTypes.number}),
    address: field({name: 'address', label: 'address', type: fieldTypes}),
    action: field({name: 'status', label: 'status', type: fieldTypes}),


  }

  return {

    fields


  }
}
