Esta es una plantilla para los proyectos de Boorpret S.C.A con Next JS, Express JS y Node JS.
## Instalación

Antes de empezar a usar nuestra plantilla deberemos crear nuestro archivo de configuración o de entrono.
`.env`

Una vez ya tenemos nuestro archivo ``.env`` en nuestro directorio raíz, debemos instalar las dependencias necesarias.

```bash
npm install
# or
yarn install
```
Ya tendrás todo listo para comenzar a desarrollar tu proyecto. 

Para iniciar la palicación ejecuta.
```bash
npm run dev
```

## Estructura

Esta plantilla contiene lo necesario para comenzar un proyecto.
En el directotio `Pages/` tenemos todas las "páginas" de nuestro front-end, es decir, todas
las rutas. Ahí podremos añadir o modificar lo que necesitemos. El fichero ``Pages/_error.tsx``
será nuestra pantalla de error de renderizado (404, 400, 500...)

Además tenemos los directorios habituales de nuestro back-end, en la carpeta ``Server/``.
Ahí pdoremos ver: ``Controllers/ ; Interfaces/ ;  Models/ ; etc...``

Por defecto nuestra aplicación está corriendo en el puero 5000, y las rutas de nuesra api
tienen como prefijo la ruta ``/api/``.

Es decir, todas las peticiones a una ruta con el prefijo ``/api/`` las atenderá nuestro servidor de Express
y todas las demás rutas las atenderá Next.

## Despliegue

Para el despliegue, ejecutaremos ``npm run build`` para compilar nuestro código listo para producción
y ``npm start`` para arrancar nuestra app. 

En digital ocean deberemos poner un servidor proxy que atienda las peticiones en el dominio deseado y redirija el tráfico a nuestro
localhost en el puesto que hayamos iniciado nuestra apliación.
