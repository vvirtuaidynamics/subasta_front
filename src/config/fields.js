import {$t} from "src/services/i18n";
import useField from "src/types/field.types"

export default function useFields() {
  const {field, fieldTypes} = useField();

  return {
    username: field({name: 'username', label: 'Username'}),
    name: field({name: 'name', label: 'name'}),
    surname: field({name: 'last_name', label: 'surname'}),
    email: field({name: 'email', label: 'email'}),
    phone: field({name: 'phone', label: 'phone'}),
    company: field({name: 'company', label: 'company'}),
    industry: field({name: 'industry', label: 'industry'}),
    status: field({name: 'status', label: 'status', type: fieldTypes.boolean}),
    created_at: field({name: 'created_at', label: 'created_at', type: fieldTypes.datetime}),
    address: field({name: 'address', label: 'address'}),
    action: field({name: 'status', label: 'status'}),


  }
}
