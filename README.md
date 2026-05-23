# Proyecto Rutas Seguras Kids 🚍

Sistema frontend para gestionar rutas escolares y estudiantes desarrollado únicamente con HTML, CSS y JavaScript Vanilla.

---

# 📌 Descripción del proyecto

En este proyecto desarrollé una aplicación frontend para organizar rutas escolares y asignar estudiantes a cada bus.

La idea principal fue practicar:

- Manipulación dinámica del DOM
- Eventos y validaciones
- Asincronía con fetch y async/await
- Consumo de APIs
- LocalStorage
- Web Components
- Responsive Design

Todo el proyecto fue realizado sin frameworks ni librerías externas.

---

# 🚀 Funcionalidades realizadas

## ✅ Gestión de rutas

- Crear rutas dinámicamente
- Editar rutas
- Eliminar rutas
- Mostrar rutas en pantalla
- Guardar:
  - Nombre de la ruta
  - Conductor
  - Hora
  - Ciudad

---

## ✅ Gestión de estudiantes

- Registrar estudiantes
- Asignar estudiantes a rutas
- Editar estudiantes
- Eliminar estudiantes
- Mostrar estudiantes dinámicamente

---

# 🖥️ Manipulación del DOM

En el proyecto utilicé diferentes métodos para crear y actualizar elementos dinámicamente:

```js
createElement()
innerHTML
appendChild()
querySelector()
getElementById()
addEventListener()
```

Todos los cambios se reflejan automáticamente en pantalla sin necesidad de recargar la página.

---

# ✅ Validaciones implementadas

Se realizaron validaciones en formularios como:

- Campos vacíos
- Validación básica de correo usando `@`
- Verificación de datos antes de guardar

---

# 🌦️ Asincronía y consumo de API

Se integró la API de OpenWeather para mostrar información climática de la ciudad de cada ruta.

## Datos mostrados

- Temperatura
- Estado del clima

## Tecnologías usadas

```js
fetch()
async/await
try/catch
```

---

# 💾 LocalStorage

Se implementó almacenamiento local para guardar:

- Rutas
- Estudiantes

Gracias a esto, los datos permanecen guardados aunque el usuario recargue la página.

---

# 🧩 Web Components

Se implementaron componentes reutilizables utilizando:

```js
customElements.define()
class extends HTMLElement
Shadow DOM
template
```

Se crearon tarjetas personalizadas reutilizables para estudiantes.

---

# 📱 Responsive Design

El proyecto cuenta con diseño responsive usando:

- Flexbox
- CSS Grid
- Media Queries

## Breakpoints utilizados

- Desktop
- Tablet
- Mobile

---

# 🛠️ Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript Vanilla
- OpenWeather API
- LocalStorage
- Web Components

---

# 📂 Estructura del proyecto

```txt
Proyecto/
│
├── index.html
├── style.css
├── app.js
├── README.md
│
└── img/
    ├── inicio.png
    ├── rutas.png
    └── estudiantes.png
```
# 📸 Capturas del proyecto
## Agregar rutas y Estudiantes
![inicio](img/Captura%20de%20pantalla%202026-05-22%20210454.png) 
![inicio](img/Captura%20de%20pantalla%202026-05-22%20210328.png)
![inicio](img/Captura%20de%20pantalla%202026-05-22%20210529.png)
---
# ▶️ Cómo ejecutar el proyecto

1. Descargar el proyecto
2. Abrir la carpeta
3. Ejecutar `index.html` en el navegador

---

# 👨‍💻 Autor

Proyecto realizado por Juan Pablo Navas.