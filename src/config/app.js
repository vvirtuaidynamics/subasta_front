import {$t} from "src/services/i18n";

export default {
  name: $t("app.name"),
  key: process.env.APP_KEY,
  email: "subasta@gmail.com",
  phone: "+34 601 345 754",
  api_url: process.env.API_URL || "http://localhost:8000/api",
  api_csrf_url: process.env.API_CSRF_URL || "http://localhost:8000/sanctum/csrf-cookie",
  page_home_name: 'home',
  page_login_name: 'login',
  page_app_name: 'app',
  table_default_rows: 30,
};
