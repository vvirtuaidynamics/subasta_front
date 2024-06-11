import { $t } from "src/services/i18n"
export default {
  name: $t('app.name'),
  email: "subasta@gmail.com",
  phone: "+34 601 345 754",
  api_url: process.env.API_URL || "http://localhost:8000/api"

}
