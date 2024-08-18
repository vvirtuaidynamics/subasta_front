import axios from 'axios';
import appConfig from 'src/config/app'
import {$t} from 'src/services/i18n'

export default function () {
  const checkUnique = async (table, column, value) => {
    try {
      const response = await axios.post(appConfig.api_url`/unique`, {
        table: table,
        column: column,
        value: value,
      });
      return response.data.unique || $t('validations.unique');
    } catch (e) {
      console.error('Error validating unique:', e);
      return false;
    }
  }

  const checkExist = async (table, column, value) => {
    try {
      const response = await axios.post(appConfig.api_url`/unique`, {
        table: table,
        column: column,
        value: value,
        mode: 'exist'
      });
      return response.data.exist || $t('validations.exist');
    } catch (e) {
      console.error('Error validating exist:', e);
      return false;
    }
  }

  const validateBefore = (compareDate) => {
    return (val) => {
      if (!val) return 'Date is required';
      const inputDate = new Date(val);
      const comparisonDate = new Date(compareDate);
      return inputDate < comparisonDate || $t('validatedBefore', {compareDate: compareDate});
    }
  }

  const validateAfter = (compareDate) => {
    return (val) => {
      if (!val) return 'Date is required';
      const inputDate = new Date(val);
      const comparisonDate = new Date(compareDate);
      return inputDate > comparisonDate || $t('validatedAfter', {compareDate: compareDate});
    }
  }

  function parseLaravelRules(laravelRulesString) {
    const rulesMapping = {
      required: () => (val) => !!val || $t('validations.required'),
      email: () => (val) => /.+@.+\..+/.test(val) || $t('validations.email'),
      lt: (param) => (val) => (val && val > param) || $t('validations.lt'),
      min: (param) => (val) => (val && val.length >= param) || $t('validations.min'),
      gt: (param) => (val) => (val && val < param) || $t('validations.gt'),
      max: (param) => (val) => (val && val.length <= param) || $t('validations.max'),
      size: (param) => (val) => (val && val.length === param) || $t('validations.size'),
      numeric: () => (val) => !isNaN(parseFloat(val)) && isFinite(val) || $t('validations.numeric'),
      integer: () => (val) => Number.isInteger(Number(val)) || $t('validations.integer'),
      boolean: () => (val) => typeof val === 'boolean' || $t('validations.boolean'),
      url: () => (val) => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(val) || $t('validations.url'),
      alpha: () => (val) => /^[a-zA-Z]+$/.test(val) || $t('validations.alpha'),
      alpha_num: () => (val) => /^[a-zA-Z0-9]+$/.test(val) || $t('validations.alphanum'),
      alpha_dash: () => (val) => /^[a-zA-Z0-9_-]+$/.test(val) || $t('validations.alphadash'),
      confirmed: (field) => (val, model) => val === model[field] || $t('validations.confirmed'),
      phone: () => (val) => /^\+?[1-9]\d{1,14}$/.test(val) || $t('validations.phone'),
      date: () => (val) => !isNaN(Date.parse(val)) || $t('validations.date'),
      ipv4: () => (val) => /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(val) || $t('validations.ipv4'),
      ipv6: () => (val) => /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(val) || $t('validations.ipv6'),
      mac: () => (val) => /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(val) || $t('validations.mac'),
      hex: () => (val) => /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(val) || $t('validations.hex'),
      hexa: () => (val) => /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/.test(val) || $t('validations.hexa'),
      hexOrHexa: () => (val) => /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(val) || $t('validations.hexOrHexa'),
      rgb: () => (val) => /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/.test(val) || $t('validations.rgb'),
      rgba: () => (val) => /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/.test(val) || $t('validations.rgba'),


      // Agrega más reglas según sea necesario
    }

    let quasarRules = [];

    const rules = laravelRulesString.split('|');
    rules.forEach((rule) => {
      // Separar la regla y sus parámetros (si existen)
      let [ruleName, param] = rule.split(':');
      if (ruleName !== 'unique' && typeof param === 'string' && (isNaN(param) || param.includes(','))) {
        param = param.split(',');
      }
      if (ruleName === 'unique' && typeof param === 'string' && (isNaN(param) || param.includes(','))) {
        const [table, column] = param.split(',');
        quasarRules.push(checkUnique(table, column, val));
      }
      if (ruleName === 'exist' && typeof param === 'string' && (isNaN(param) || param.includes(','))) {
        const [table, column] = param.split(',');
        quasarRules.push(checkExist(table, column, val));
      }
      if (!isNaN(param)) {
        param = param && !isNaN(param) ? parseInt(param, 10) : null;
      }
      // Verificar si la regla existe en el mapeo
      if (ruleMappings[ruleName]) {
        const mappedRule = ruleMappings[ruleName];
        quasarRules.push(mappedRule(param));
      }
      return quasarRules;
    });


  }

  return {
    validateBefore,
    validateAfter,
    checkUnique,
    checkExist,
    parseLaravelRules
  }
}

