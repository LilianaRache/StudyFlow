# StudyFlow

Aplicación móvil multiplataforma desarrollada con Ionic y Angular para la gestión de actividades académicas.

## Descripción

StudyFlow permite a los estudiantes organizar materias, registrar tareas, realizar seguimiento de entregas y visualizar estadísticas de progreso académico.

La aplicación fue desarrollada como parte del proyecto académico del módulo de Desarrollo de Aplicaciones Móviles Multiplataforma.

## Funcionalidades Implementadas

### Gestión de Materias
- Crear materias.
- Editar materias.
- Eliminar materias.
- Persistencia local de datos.

### Gestión de Tareas
- Crear tareas.
- Editar tareas.
- Eliminar tareas.
- Asignar prioridad.
- Asignar fecha de entrega.
- Marcar tareas como completadas.

### Dashboard
- Visualización de tareas pendientes.
- Próximas entregas.
- Indicador de progreso académico.

### Calendario
- Visualización de tareas registradas por fecha.

### Estadísticas
- Total de tareas.
- Tareas completadas.
- Tareas pendientes.
- Distribución por prioridad.

### Configuración
- Eliminación de datos almacenados localmente.

---

## Tecnologías Utilizadas

- Ionic Framework
- Angular
- TypeScript
- SCSS
- HTML5
- LocalStorage

---

## Requisitos Previos

Antes de ejecutar el proyecto se requiere tener instalado:

### Node.js

Verificar instalación:

```bash
node -v
npm -v
```

### Ionic CLI

Instalar globalmente:

```bash
npm install -g @ionic/cli
```

Verificar:

```bash
ionic -v
```

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/LilianaRache/StudyFlow
```

Ingresar al proyecto:

```bash
cd StudyFlow
```

Instalar dependencias:

```bash
npm install
```

---

## Ejecución

Iniciar servidor de desarrollo:

```bash
ionic serve
```

La aplicación estará disponible en:

```text
http://localhost:8100
```

---

## Construcción para Producción

Generar compilación:

```bash
ionic build
```

Los archivos generados quedarán en:

```text
www/
```

---

## Estructura del Proyecto

```text
src/
│
├── app/
│   ├── pages/
│   │   ├── dashboard/
│   │   ├── materias/
│   │   ├── tareas/
│   │   ├── crear-tarea/
│   │   ├── calendario/
│   │   ├── estadisticas/
│   │   └── configuracion/
│   │
│   └── services/
│       └── storage.ts
│
├── assets/
└── theme/
```

---

## Almacenamiento

La aplicación utiliza LocalStorage para almacenar:

- Materias.
- Tareas.
- Estados de avance.

No requiere conexión a Internet ni servicios externos.

---

## Autores

- Jeimmy Liliana Rache Camargo

---

## Estado del Proyecto

Versión correspondiente a la Entrega 2.

Implementación funcional de la navegación y de los principales requerimientos definidos en el documento de diseño.