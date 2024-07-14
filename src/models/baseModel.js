export function BaseModel(name, label, icon, fields) {
  return {
    model: {name, label, icon},
    ...fields

  }
}
