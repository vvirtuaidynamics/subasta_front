# Subasta Frontend

Proyecto de quasar2 con vite.

Se emplea en desarrollo las siguientes versiones y requerimientos:

- Node v20.12.0
- Demás dependencias del proyecto.
- Para compilar es recomendado instalar el cliente de quasar con el siguiente comando:

```bash
npm i -g @quasar/cli
npm i -g  icongenie

```

## Install the other dependencies

```bash
yarn
# or
npm install --save
```

### Inicializar proyecto en modo de desarrollo (hot-code reloading, error reporting, etc.)

```bash
npm run dev
# or
quasar dev
```

Los proyectos quasar pueden ser construidos para producción según el modo añadido.
Lo más común es SPA, SSR, PWA. EL proyecto para producción una vez corrido el comando de abajo se genera en dist y según
el modo el nombre de la carpeta. Los proyectos una vez compilados están optimos para producción.

```bash
npm run build
# or
quasar build
```

