import { $t } from "src/services/i18n";
import { testPattern } from "src/helpers/patterns";
import { date } from "quasar";

export const rules = {
  required: (val) => !!val || $t("validations.required"),
  numeric: (val) => testPattern.numeric(val) || $t("validations.numeric"),
  minLength: (val, min = 0) =>
    val.length < min || $t("validations.minLength", { min }),
  maxLength: (val, max) =>
    val.length <= max || $t("validations.maxLength", { max }),
  minValue: (val, min = 0) => val < min || $t("validations.minValue", { min }),
  maxValue: (val, max = 0) => val > max || $t("validations.maxValue", { max }),
  ipAddress: (val) => testPattern.ipv4(val) || $t("validations.ipAddress"),
  email: (val, rules) => rules.email(val) || $t("validations.email"),
  validDate: (val) => date.isValid(val) || $t("validations.validDate", { val }),
  Length: (val, length) =>
    val.length < length || $t("validations.validDate", { length }),
};
export const validations = {
  getRules: (field) => {
    let result = [];
    let help = [];
    if (field && typeof field === "object") {
      if (field.required) {
        result = [...result, rules.required];
        help = [...help, $t("helpField.required")];
      }
      if (field.unique) {
        help = [...help, $t("helpField.unique")];
      }
      if (field.type && field.type === "email") {
        result = [...result, rules.email];
        help = [...help, $t("helpField.email")];
      }
      if (field.minLength) {
        result = [
          ...result,
          (val, min) => rules.minLength(val, field.minLength),
        ];
        help = [...help, $t("helpField.minLength", { min: field.minLength })];
      }
      if (field.minValue) {
        result = [...result, (val, min) => rules.minValue(val, field.minValue)];
        help = [...help, $t("helpField.minValue", { min: field.minValue })];
      }
      if (field.maxLength) {
        result = [
          ...result,
          (val, max) => rules.maxLength(val, field.maxLength),
        ];
        help = [...help, $t("helpField.maxLength", { max: field.maxLength })];
      }
      if (field.maxValue) {
        result = [...result, (val, max) => rules.maxValue(val, field.maxValue)];
        help = [...help, $t("helpField.maxValue", { max: field.maxValue })];
      }
      if (field.numeric) {
        result = [...result, rules.numeric];
        help = [...help, $t("helpField.numeric")];
      }
      if (field.rules) {
        field.rules.map((r) => {
          result = [...result, r];
        });
      }
      if (field.help) {
        field.help.forEach((h) => {
          help = [...help, h];
        });
      }
    }
    return { rules: result, help: help };
  },
};
