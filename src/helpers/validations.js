import { $t } from "src/services/i18n";
import { utils } from "src/helpers/utils";
import { testPattern } from "src/helpers/patterns";
import { date } from "quasar";

export const rules = {
  required: (val) => !!val || $t("validations.required"),
  numeric: (val) => testPattern.numeric(val) || $t("validations.numeric"),
  minLength: (val, min = 0) =>
    val.length < min || $t("validations.minLength", { min }),
  maxLength: (val, ax = 0) =>
    (val.length > max) | $t("validations.maxLength", { max }),
  minValue: (val, min = 0) => val < min || $t("validations.minValue", { min }),
  maxValue: (val, ax = 0) => (val > max) | $t("validations.maxValue", { max }),
  ipAddress: (val) => testPattern.ipv4(val) | $t("validations.ipAddress"),
  email: (val) => testPattern.email(val) | $t("validations.email"),
  validDate: (val) => date.isValid(val) || $t("validations.validDate", { val }),
  Length: (val, length) =>
    val.length < length || $t("validations.validDate", { length }),
};
export const validations = {
  getRules: (field) => {
    let result = [];
    // const required = () => ||

    if (field && typeof field === "object") {
      if (field.required && field.type !== "date") {
        result = [...result, rules.required];
      }
      if (field.options && field.type === "text") {
        if (field.options.min && field.options.min !== field.options.max)
          result.push(this.rules.minLength);
        if (field.options.max !== field.options.min)
          result.push(this.rules.maxLength);
        if (field.options.min === field.options.max)
          result.push(this.rules.Length);
      }

      if (field.options && field.type === "number") {
        if (field.options.min) result.push(this.rules.minValue);
        if (field.options.max) result.push(this.rules.maxValue);
      }
      if (field.options && field.type === "date") {
        if (field.required) result.push(this.rules.validDate);
      }
    }
    return result;
  },
};
