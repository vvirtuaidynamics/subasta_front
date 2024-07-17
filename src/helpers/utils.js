import CryptoJS, {enc} from "crypto-js";
import {Notify, Dialog} from "quasar";

Date.prototype.toString = function dateToString() {
  return this.toISOString().slice(0, 19).replace("T", " ");
};

Array.prototype.sum = function (prop) {
  var total = 0;
  for (var i = 0, _len = this.length; i < _len; i++) {
    total += parseFloat(this[i][prop]);
  }

  return total || "";
};

Array.prototype.average = function (prop) {
  var total = this.sum(prop);
  var len = this.length;
  var avg = total / len;
  if (avg) return avg.toFixed(2);
  return "";
};
Array.prototype.min = function (prop) {
  if (!this.length) return "";
  return Math.min.apply(
    null,
    this.map(function (item) {
      return item[prop];
    })
  );
};

Array.prototype.max = function (prop) {
  if (!this.length) return "";
  return Math.max.apply(
    null,
    this.map(function (item) {
      return item[prop];
    })
  );
};

String.prototype.trimChar = function (charlist) {
  if (typeof charlist == "undefined") {
    charlist = "\\s";
  }
  let pattern = "^[" + charlist + "]*(.*?)[" + charlist + "]*$";
  return this.replace(new RegExp(pattern), "$1");
};
String.prototype.isValidDate = function () {
  let date = this;
  return new Date(date) !== "Invalid Date" && !isNaN(new Date(date));
};
String.prototype.strIsNullOrEmpty = function (str) {
  return str === undefined || str === null || str.trim() === '';
}

function normalizeObj(obj) {
  if (obj) {
    if (obj instanceof Date) {
      let dateStr = obj.toISOString().slice(0, 19).replace("T", " ");
      return dateStr;
    } else if (Array.isArray(obj)) {
      return [...obj].map((e) => normalizeObj(e));
    } else if (obj !== null && typeof obj === "object") {
      const payload = {...obj};
      Object.keys(payload).forEach(function (key) {
        payload[key] = normalizeObj(payload[key]);
      });
      return payload;
    }
    return obj.toString();
  }
  return null;
}

export const utils = {
  strIsNullOrEmpty(str) {
    return str === undefined || str === null || str.trim() === '';
  },
  confirm(title, message, icon) {
    Dialog.create({
      title: title,
      message: message,
      cancel: true,
      persistent: true,
    })
      .onOk(() => {
        return true;
      })

      .onCancel(() => {
        return false;
      })
      .onDismiss(() => {
        return false;
      });
  },
  percentValue(val, max) {
    let num = parseFloat(val) / parseFloat(max);
    return num.toFixed(2);
  },
  toPercent(val, max) {
    let num = this.percentValue(val, max) * 100;
    return num.toFixed(2);
  },

  extend(obj, src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
  },

  randomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },
  randomChars(length, characters) {
    length = length || 10;
    var result = [];
    var characters =
      characters ||
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength))
      );
    }
    return result.join("");
  },
  randomStr(length, characters) {
    length = length || 10;
    var result = [];
    var characters =
      characters ||
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength))
      );
    }
    return result.join("");
  },
  randomNum(length) {
    length = length || 10;
    return Math.floor(
      Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
    );
  },
  //return javascript date object in iso date (YYYY-MM-DD)
  formatDate(value) {
    var date = new Date(value);
    var month = "" + (date.getMonth() + 1),
      day = "" + date.getDate(),
      year = date.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [day, month, year].join("-"); //[year, month, day].join('-');
  },
  // return uuid/v4
  uuid: function () {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  },
  //Convert javascript to date object to mysql date format (YYYY-MM-DD HH:mm:ss)
  dateNow() {
    return new Date().toISOString().split("T")[0];
  },
  dateTimeNow() {
    return new Date().toISOString().slice(0, 19).replace("T", " ");
  },
  timeNow() {
    return new Date().toLocaleTimeString();
  },
  toArray(val) {
    if (val) {
      if (Array.isArray(val)) {
        return val;
      } else {
        return val.split(",");
      }
    } else {
      return [];
    }
  },
  serializeQuery(params, prefix) {
    const query = Object.keys(params).map((key) => {
      const value = params[key];

      if (params.constructor === Array) key = `${prefix}[]`;
      else if (params.constructor === Object)
        key = prefix ? `${prefix}[${key}]` : key;

      if (typeof value === "object") return this.serializeQuery(value, key);
      else return `${key}=${encodeURIComponent(value)}`;
    });

    return [].concat.apply([], query).join("&");
  },
  trim(str, charlist) {
    if (typeof charlist == "undefined") {
      charlist = "\\s";
    }
    let pattern = "^[" + charlist + "]*(.*?)[" + charlist + "]*$";
    return str.replace(new RegExp(pattern), "$1");
  },
  /**
   * Joins 2 paths together without duplicate separators
   * @param parts the parts of the url to join. eg: ['http://google.com/', '/path/']
   * @returns {string} The combined path
   */
  joinPaths(parts) {
    let separator = "/";

    return parts
      .map(function (part) {
        if (part) {
          return part.trim().replace(/(^[\/]*|[\/]*$)/g, "");
        }
        return "";
      })
      .join(separator);
  },
  getFileFullPath(path) {
    let isFullPath = path.startsWith("https://") || path.startsWith("http://");
    if (isFullPath) {
      return path;
    }
    return this.joinPaths([process.env.API_URL, path]);
  },
  isExternalFile(path) {
    let fullPath = this.getFileFullPath(path);
    let baseUrl = process.env.API_URL; //app base url
    let isLocalFile = fullPath.startsWith(baseUrl);
    return !isLocalFile;
  },
  debounce(fn, delay) {
    var timeoutID = null;
    return function () {
      clearTimeout(timeoutID);
      var args = arguments;
      var that = this;
      timeoutID = setTimeout(function () {
        fn.apply(that, args);
      }, delay);
    };
  },
  strEllipsis(string, maxLength) {
    if (!string) return string;
    if (maxLength < 1) return string;
    if (string.length <= maxLength) return string;
    if (maxLength == 1) return string.substring(0, 1) + "...";

    var midpoint = Math.ceil(string.length / 2);
    var toremove = string.length - maxLength;
    var lstrip = Math.ceil(toremove / 2);
    var rstrip = toremove - lstrip;
    return (
      string.substring(0, midpoint - lstrip) +
      "..." +
      string.substring(midpoint + rstrip)
    );
  },
  capitalize(value) {
    if (!value) return "";
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
  },
  getFirstLetter(value) {
    if (!value) return "";
    value = value.toString();
    return value.charAt(0).toUpperCase();
  },
  readable(value) {
    if (!value) return "";
    return value.replace(/[^a-zA-Z0-9]/g, " ");
  },
  humanDate(value) {
    const date = new Date(value);
    if (isNaN(date)) {
      return value;
    }
    return new Intl.DateTimeFormat("es", {dateStyle: "medium"}).format(date);
  },
  humanTime(value) {
    const date = new Date(value);
    if (isNaN(date)) {
      return value;
    }
    return date.toLocaleTimeString();
  },
  humanDatetime(value, format = "medium") {
    //example 'Mar. 10, 2021, 4:13:32 p.m.'
    const date = new Date(value);
    if (isNaN(date)) {
      return value;
    }
    return new Intl.DateTimeFormat("es", {
      dateStyle: format,
      timeStyle: format,
    }).format(date);
  },
  relativeDate(value) {
    const date = new Date(value);
    if (isNaN(date)) {
      return value;
    }
    const formatter = new Intl.RelativeTimeFormat(undefined, {
      numeric: "auto",
    });

    const divisions = [
      {amount: 60, name: "seconds"},
      {amount: 60, name: "minutes"},
      {amount: 24, name: "hours"},
      {amount: 7, name: "days"},
      {amount: 4.34524, name: "weeks"},
      {amount: 12, name: "months"},
      {amount: Number.POSITIVE_INFINITY, name: "years"},
    ];

    let duration = (date - new Date()) / 1000;
    for (let i = 0; i <= divisions.length; i++) {
      const division = divisions[i];
      if (Math.abs(duration) < division.amount) {
        return formatter.format(Math.round(duration), division.name);
      }
      duration /= division.amount;
    }
  },
  approximate(num, precision) {
    precision = precision || 2;
    return (+(Math.round(+(num + "e" + precision)) + "e" + -precision)).toFixed(
      precision
    );
  },
  lower(value) {
    return value || value === 0 ? value.toString().toLowerCase() : "";
  },

  upper(value) {
    return value || value === 0 ? value.toString().toUpperCase() : "";
  },

  truncate(value, length, dots) {
    length = length || 15;
    dots = dots || "...";
    if (!value || typeof value !== "string") return "";
    if (value.length <= length) return value;
    return value.substring(0, length) + dots;
  },
  currency(value, currency, fraction) {
    currency = currency || "USD";
    fraction = fraction || 2;
    var formatter = new Intl.NumberFormat("es", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: fraction,
    });
    return formatter.format(value ?? 0);
  },
  formatSize(bytes) {
    let sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Byte";
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  },
  normalizeFormData(postData) {
    if (Array.isArray(postData)) {
      return [...postData].map((e) => normalizeObj(e));
    } else {
      return normalizeObj(postData);
    }
  },
  playSound(sound) {
    if (sound) {
      var audio = new Audio(sound);
      audio.play();
    }
  },
  base64Encode(data) {
    // PROCESS
    const encodedWord = enc.Utf8.parse(data); // encodedWord Array object
    const encoded = enc.Base64.stringify(encodedWord); // string: 'NzUzMjI1NDE='
    return encoded;
  },
  base64Decode(data) {
    // PROCESS
    const encodedWord = enc.Base64.parse(data); // encodedWord via Base64.parse()
    const decoded = enc.Utf8.stringify(encodedWord); // decode encodedWord via Utf8.stringify() '75322541'
    return decoded;
  },
  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
    else byteString = decodeURI(dataURI.split(",")[1]);

    // separate out the mime component
    let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to a typed array
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
  },

  encrypt(data, str = "") {
    const key = str && str?.length > 0 ? str : process.env.STORAGE_KEY ?? "";
    const predata = JSON.stringify(data);
    const base64Data = CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Utf8.parse(predata)
    );
    const encoded = CryptoJS.AES.encrypt(base64Data, key).toString();
    // return {key: key, code: encoded}
    return encoded;
  },

  decrypt(data, str = "") {
    if (data && data.length > 0) {
      const key = str && str?.length > 0 ? str : process.env.STORAGE_KEY ?? "";
      const decrypted = CryptoJS.AES.decrypt(data, key).toString(
        CryptoJS.enc.Utf8
      );
      const base64Data = CryptoJS.enc.Base64.parse(decrypted).toString(
        CryptoJS.enc.Utf8
      );
      const predata = JSON.parse(base64Data);
      return predata;
    } else {
      //console.log("decrypt: Encrypted data is empty");
      return "";
    }
  },

  saveToStorage(key, value) {
    let data = "";
    if (
      process.env.NODE_ENV?.toString() === "production" ||
      process.env.STORAGE_CIPHER.toString() === "true"
    ) {
      data = this.encrypt(value);
    } else {
      data = JSON.stringify(value);
    }
    localStorage.setItem(key, data);
  },
  readFromStorage(key) {
    const predata = localStorage.getItem(key);
    let data = null;
    if (
      process.env.NODE_ENV?.toString() === "production" ||
      process.env.STORAGE_CIPHER.toString() === "true"
    ) {
      data = this.decrypt(predata);
    } else {
      data = JSON.parse(predata);
    }
    return data;
  },
  saveToSession(key, value) {
    let data = "";
    if (
      process.env.NODE_ENV?.toString() === "production" ||
      process.env.STORAGE_CIPHER.toString() === "true"
    ) {
      data = this.encrypt(value);
    } else {
      data = JSON.stringify(value);
    }
    sessionStorage.setItem(key, data);
  },
  readFromSession(key) {
    const predata = sessionStorage.getItem(key);
    let data = null;
    if (
      process.env.NODE_ENV?.toString() === "production" ||
      process.env.STORAGE_CIPHER.toString() === "true"
    ) {
      data = this.decrypt(predata);
    } else {
      data = JSON.parse(predata);
    }
    return data;
  },

  appId() {
    return process.env.APP_ID;
  },
  base64ToBlobFile(base, filename = "file") {
    let id = this.uuid().split("-")[0];
    let data = base.toString();
    const info = data.split(";")[0];
    const mime = info.split(":")[1];
    const ext = `.${mime.split("/")[1]}`;
    const blob = this.dataURItoBlob(base);
    const file = new File([blob], `${filename}_${id}${ext}`, {
      type: mime,
    });
    return file;
  },
  /**
   * sendMsg
   * @param {{msg: String, position?: String, timeout?: Number, avatar?: String, type?: negative|warning|info|ongoing|positive }} props
   */
  sendMsg(props) {
    let icon = "fas fa-info-circle";
    let bgColor = "bg-info";
    switch (props.type) {
      case "negative":
        icon = "fas fa-exclamation-circle";
        bgColor = "negative";
        break;
      case "warning":
        icon = "fas fa-exclamation-triangle";
        bgColor = "warning";
        break;
      case "info":
        icon = "fas fa-info-circle";
        bgColor = "info";
        break;
      case "ongoing":
        icon = "fas fa-info";
        bgColor = "ongoing";
        break;
      case "positive":
        icon = "fas fa-check-circle";
        bgColor = "positive";
        break;
    }
    if (!props.avatar && props.icon) icon = props.icon;
    if (props.avatar && typeof props.avatar === "string") {
      icon = props.avatar;
    }

    const timeout = props.timeout ?? 3500;
    const pos = props.position ?? "bottom";

    if (props.avatar) {

      Notify.create({
        html: true,
        message: `<span class="${props.classMsg ?? ""}">${
          props.msg ?? ""
        }</span>`,
        progress: true,
        timeout: timeout,
        avatar: `${icon}`,
        position: `${pos}`,
        color: `${bgColor}`,
        textColor: props.textColor || "white",
        caption: props.caption || "",
        actions: [
          {
            icon: "close",
            color: "white",
            flat: true,
            size: "sm",
            round: true,
          },
        ],
      });
    } else {
      Notify.create({
        html: true,
        message: `<span class="${props.classMsg ?? ""}">${props.msg}</span>`,
        progress: true,
        timeout: timeout,
        icon: `${icon}`,
        color: `${props.type ?? "info"}`,
        position: `${pos}`,
        caption: props.caption || "",
        textColor: props.textColor || "white",
        actions: [
          {
            icon: "close",
            color: "white",
            flat: true,
            size: "sm",
            round: true,
          },
        ],
      });
    }
  },
  /**
   * listSelectOptions
   * @param list {[{}]}
   * @param mapper {{label: list.label, value: list.value, image: list.image, selected: boolean}}
   */
  listSelectOptions(list, mapper) {
    let options = [];
    if (list && Array.isArray(list)) {
      list.forEach(function (l) {
        let item = {};
        if (mapper.label && l[mapper.label]) {
          item.label = list[mapper.label];
        }
        if (mapper.value && l[mapper.value]) item.value = l[mapper.value];
        if (mapper.image && l[mapper.image]) item.image = l[mapper.image] ?? [];
        if (mapper.selected && l[mapper.selected])
          item.selected = l[mapper.selected];
        else {
          item.selected = false;
        }
        options.push(item);
      });
      return options;
    }
  },
  speak(msg) {
    let retry = 3;
    if (window.speechSynthesis) {
      const speaker = new SpeechSynthesisUtterance();
      // console.log("speaker: ", speaker);
      speaker.text = msg;
      speaker.volume = 1.0; // speech volume (default: 1.0)
      speaker.pitch = 1.0; // speech pitch (default: 1.0)
      speaker.rate = 1.0; // speech rate (default: 1.0)
      speaker.lang = "es-MX"; // speech language (default: 'en-US')
      // speaker.lang = "en-US"; // speech language (default: 'en-US')
      speaker.voiceURI = "Google UK English Female"; // voice URI (default: platform-dependent)
      //speaker.voiceURI = "Microsoft Raul - Spanish (Mexico)";
      speaker.onboundary = function (event) {
        // console.log("Speech reached a boundary:", event.name);
      };
      speaker.onpause = function (event) {
      };
      // console.log("voices: ", window.speechSynthesis.getVoices());
      window.speechSynthesis.speak(speaker);
    } else {
      if (process.env.NODE_ENV !== "production")
        console.log("Windows speechSynthesis no disponible!");
    }
  },
  downloadFile(url, fileName) {
    var link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

};
