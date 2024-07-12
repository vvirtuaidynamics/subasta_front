# Subasta Frontend

Proyecto de quasar2 con vite.

## Requirements

Se emplea en desarrollo las siguientes versiones y requerimientos:

- Node v20
- Install the project dependencies running the next command.

```bash
yarn
# or
npm install --save
```

- For development is recomenting install the project dependencies.

```bash
npm i -g @quasar/cli
npm i -g  icongenie
```

- For deployment have to configure the project environment vars located in "quasar.config.js" inside env object.

---

- API_URL: Url of the API backend.
  example: https://localhost:8000/api
- APP_KEY: uuid of the application. example: 93456d52-11a8-4c0f-2146-07787d4312db
- NODE_ENV: Environment (development or production)
- STORAGE_KEY: Storage encryption key used for storage encryption. example: "any string that you want to use"
- STORAGE_CIPHER: Permit force storage encryption for development debug.

---

### Install the other dependencies

## Inicializar proyecto en modo de desarrollo (hot-code reloading, error reporting, etc.)

```bash
npm run dev
# or
quasar dev
```

## Building the project for deployment.

Deployment is the process that builds the project at mode configuration (SPA, PWA, SSR, Electron, Capacitor).
By default, the projects are deployed to the SPA mode.

There are some things that need to have in account at the moment of deployment.

- Environment:
  In quasar.config.js we have to variable that cant be used to configure the base route of our application and path of
  dist directory.

* publicPath: example: "/"
* distDir: example: "../dir/dirOfDeployment"

For build the app we can use the following command:

```bash
npm run build
# or
quasar build
```

This process will optimize and minimize the code of the app and build in dir path.
We can be used this, copy or move to deployment.

Is recommended for the development period, clone entire project update from main and build to deploy directory.


