export default {
  welcome: "Welcome ",
  language: "Language",
  logout: "Logout",
  lostCxMsg: "Lost conection with database api service!",
  CxMsg: "The conection with database service was restore!",
  newsNofifications: "You have an unread notifications",
  loginMsg: "Login success! Welcome ${nombre}",
  loginErrorMsg: "Login failed. Bad user or password, try again",
  logoutMsg: "Logout success! Godbye ${nombre}",
  updateSuccessMsg: "Update success! ",
  defaultDialogTitle: "Dialog",
  token401Error: "Invalid token",
  errorBdMsg: "Error can't connect with database!",
  cxBdMsgSuccess: "Connection with database was success!",
  passwordChangeSuccess: "Password changed successful!",
  passwordChangeError: "Password changed failed!",

  error400ListMsg:
    "Something went wrong while processing your request. Invalid filter. ${error}",
  error400CreateMsg: "Failed to create record. ${error}",
  error400UpdateMsg: "Failed to update record. ${error}",
  error400DeleteMsg: "Failed to delete record. ${error}",
  error400AppendMsg: "Error on append value(s) to field ${field}",
  error400RemoveMsg: "Error on remove value(s) to field ${field}",
  error403Msg: "Error: Access denied",
  error404Msg: "Error: The requested resource wasn't found",
  error666Msg: "The licenced key has expired! Get a new one.",
  errorValidation: "Can't submit, the form have validation errors",
  width: "Width",
  height: "Height",
  chart: "Chart",

  modelLabel: "Model",
  modelPlural: "Models",
  modelAppLabel: "Aplication",
  modelAppPlural: "Aplications",
  modelUsuarioLabel: "User",
  modelUsuarioPlural: "Users",
  modelRolLabel: "Rol",
  modelRolPlural: "Roles",
  modelPermisoLabel: "Permission",
  modelPermisoPlural: "Permissions",
  modelProvinciaLabel: "Provincia",
  modelProvinciaPlural: "Provincias",
  modelMunicipioLabel: "Municipio",
  modelMunicipioPlural: "Municipios",

  login: "Login",
  loginTip: "Click on the button for login",
  copyright: "Copyright",
  darkActivateTip: "Activate dark mode",
  darkDeactivateTip: "Deactivate dark mode",
  fullscreenBtn: "fullscreen mode",
  enable: "Enable",
  disable: "Disable",

  labelUrlImage: "Image URL.",
  labelInsertImage: "Insert image",
  labelInsertUrlImage: "Input the image url.",
  labelGoHome: "Go to home page",

  myaccount: "My account",
  rols: {
    root: "Administrator",
    seller: "Seller",
  },

  labels: {
    add: "Add",
    actions: "Actions",
    exit: "Exit",
    addFiles: "Add file(s)",
    all: "All",
    apps: "Applications",
    archive: "Archive",
    export: "Export",
    change: "Change",
    cancel: "Cancel",
    changePassword: "Change password",
    configuration: "Configuration",
    configurationCaption: "User configuration",
    clear: "Clear",
    clearFiles: "Clear all file(s)",
    clearPicture: "Clear for select another picture",
    clearSelected: "Remove selected icon",
    close: "Close",
    copy: "Copy",
    columns: "Columns",
    create: "Create",
    cut: "Cut",
    delete: "Delete",
    deleteFile: "Remove file",
    deleteFiles: "Delete file(s)",
    description: "Description",
    edit: "Edit",
    fullImageView: "Click for show pictures",
    icon: "Icon",
    iconPerPage: "Icons by page",
    iconSelectTitle: "Select a icon",
    iconSet: "Icon set",
    loading: "Loading",
    maximizeWindow: "Maximize window",
    menu: "Menu",
    name: "Name",
    notValidFiles: "file(s) did not pass validation constraints",
    options: "Options menu",
    password: "Password",
    permission: "Permission",
    permissions: "Permissions",
    permissionCaption: "Permissions of user",
    readed: "Check as read",
    reload: "Reload",
    reset: "Reset",
    restoreWindow: "Restore window",
    retry: "Retry",
    rol: "Rol",
    rols: "Rols",
    rolCaption: "Rols of user",
    rotate: "Rotate",
    save: "Save",
    search: "Search",
    selectPicture: "Select a picture",
    show: "Show",
    hide: "Hide",
    confirm: "Confirm",
    success: "Action was succefull!",
    update: "Update",
    uploaderFiles: "Select file(s)",
    user: "User",
    view: "View",
    noData: "There is no data to show!",
    noFilterData: "There is no data to show from filter!",
    clearFilter: "Clear filters",
  },
  notifications: {
    saveWork: "The text have been save to your local storage",
  },
  usuario: {
    activo: "Active",
    avatar: "Photo",
    config: "Configuration",
    email: "Email",
    identid: "Identid Number",
    name: "Full name",
    password: "Pasword",
    phone: "Phone",
    username: "Username",
  },
  rol: {},
  fields: {
    password: {
      old: "Old Password",
      new: "New password",
      wrong: "The password and confirm don't equals",
      wrongOld: "Old password is wrong",
    },
  },

  validations: {
    exist: "Already exist on database",
    unique: "The ${col}s already have a ${field} with this value",
    required: "Value is required",
    isNaN: "Value is not valid number",
    undefined: "Value is required",
    email: "Value is not a valid email address",
    minLength: "This field should be at least ${min} characters long",
    maxLength: "The maximum length allowed is ${max}",
    minValue: "The minimum value allowed is ${min}",
    maxValue: "The maximum value allowed is ${max}",
    numeric: "Value must be numeric",
    ipAddress: "The value is not a valid IP address",
    sameAs: "The value must be equal to the ${otherName} value",
    validDate: "Value ${val} is not valid date.",
    Length: "Value should have a length of ${length} chars",
  },
};
