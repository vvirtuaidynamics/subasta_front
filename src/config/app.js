import {$t} from "src/services/i18n";

export default {
  name: $t("app.name"),
  key: process.env.APP_KEY,
  email: "subasta@gmail.com",
  phone: "+34 601 345 754",
  api_url: process.env.API_URL || "http://localhost:8000/api",
};
