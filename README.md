# HISTORIAS PROYECTO PAMPLING

## Usuario

- Hay 3 tipos de usuario: publico, autenticado y admin.

Publico:

- Puede consultar diseños.
- Puede registrarse.
- Puede loguearse.
- Puede ver todos los concursos activos y finalizados.
- Puede ver comentarios ???
- Puede realizar todos los filtros disponibles tanto de concursos como en diseños.

Autenticado:

- Todo lo del público.
- Puede votar diseños.
- Puede subir sus diseños.
- Puede eliminar su diseño despues de haberlo subido ????
- Puede dejar comentarios????
- Puede ver las votaciones.

Administrador:

- Puede crear concursos.
- Elige que diseños se visualizan en cada concurso.
- Puede modificar un concurso.
- Puede eliminar un concurso.
- Puede borrar comentarios??
- Puede eliminar usuarios.

## API-DESIGN

### Users

POST api/register ==public== {(payload: body)} el usuario se registra por primera vez

POST api/login ==public== {(payload: body)} el usuario inicia sesion

PUT api/user/:userID =admin== el admin puede banear a un usuario

### Contest

GET api/contest ==public== -> Muestra todos los concursos tanto activos como finalizados

GET api/contest?search=tematica ==public== -> Muestra solo los concursos de esa tematica haciendo un req.query

GET api/contest/:contestID ==public== -> Muestra el concurso especifico segun la ID dada por req.params

POST api/contest ==admin== {(payload: body)} -> El admin es el único encargado de crear concursos.

PUT api/contest/:contestID ==admin== {(payload: body)} -> El admin puede editar un concurso, ya sea su descripción o cambiar fecha de cierre.

### Design

GET api/design ==public== -> Muestra todos los diseños

GET api/design?search=author ==public== -> Muestra los diseños de un autor en concreto via req.query.

GET api/design/:designID ==public== -> Muestra un diseño específico via req.params.

POST api/design ==auth== {(payload: body)} -> el usuario logueado publica un diseño que será revisado por un admin.

PUT api/design/:designID ==admin== {(payload: body)} -> el admin será el que cambie el estado de diseño a aceptado o rechazado.

### Vote

GET api/vote ==public== -> Muestra los votos de todos los usuarios.

GET api/vote/:voteID ==auth== -> Mostrar un voto en concreto.

POST api/vote ==auth== {(payload: body)} -> Añade un voto a un diseño.

PUT api/vote/:voteID ==auth== {(payload: body)} -> Modifica un voto de un diseño.
