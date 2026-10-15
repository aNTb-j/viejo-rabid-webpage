# Sistema de gestión de stock y ventas

Aplicación web desarrollada con **JavaScript + React** para gestionar productos, compras, stock y ventas, incorporando análisis de información y automatización de determinadas tareas.

## Funcionalidades principales

### 1. Gestión de productos y stock

* Alta, baja, modificación y consulta de productos (**CRUD**).

* Generación de código identificador propio para productos que no posean código de barras.
* Lectura de códigos de barras. **a ver**
* Registro de:

  * Código de producto / código de barras. (Codigo interno)
  * Talle.
  * Color.
  * Precio.
  * tags (Tabla Intermedia).

* Control y actualización del stock.
* Identificación de productos que llevan demasiado tiempo en stock.
* Sistema de alertas para productos con stock antiguo o bajo.

### 2. Ventas y análisis

* Registro de ventas.
* Actualización automática del stock después de una venta.
* Cálculo de:

  * Costo de compra.
  * Precio de venta.
  * Ganancia por producto.
  * Ganancia por venta.
  * Ganancia acumulada.
* Analizador de ventas mediante tablas y/o gráficos.
* Consulta de ventas por períodos.

### 3. Página principal (Home)

* Carrusel de productos.
* Utilización de un banco de imágenes.
* Visualización dinámica de productos según disponibilidad de stock.
* Bloques de contenido condicionados por información del stock.
* Diseño visual basado en una paleta **beige y verde militar**.

### 4. Pagos y envíos

* Integración con un sistema de pagos.
* Automatización del proceso de envío.
* Integración con servicios de correo/envíos, inicialmente contemplando:

  * MiCorreo.
  * Andreani.
* Seguimiento del estado de los envíos.

---

# Tecnologías

## Frontend

* JavaScript
* React
* React Router
* HTML5
* CSS3

## Backend / persistencia

A definir según las necesidades del proyecto:

* SQLite.
* CSV para importación/exportación de información.

## Datos y análisis

* Manejo de datos mediante JavaScript.
* Tablas y gráficos para análisis de ventas.
* Cálculo de ganancias y métricas de stock.

---

# Teoría y documentación

La teoría que se incorpore al proyecto se organizará por área para poder relacionar cada concepto con su implementación práctica.

## JavaScript

* Variables y tipos de datos.
* Funciones.
* Arrays y objetos.
* Métodos de arrays.
* Desestructuración.
* Spread/rest operator.
* Módulos.
* Promesas.
* `async/await`.
* Manejo de errores.
* Consumo de APIs.
* JSON.
* Manipulación de datos.

## React

* Componentes.
* Props.
* State.
* Hooks.
* `useState`.
* `useEffect`.
* Hooks personalizados.
* Renderizado condicional.
* Formularios.
* Manejo de eventos.
* Listas y `key`.
* React Router.
* Context API.
* Comunicación entre componentes.
* Manejo de datos obtenidos desde APIs.

## CRUD

Teoría y práctica de:

* Create.
* Read.
* Update.
* Delete.
* Validación de datos.
* Formularios CRUD.
* Manejo de estados después de una operación CRUD.

## Bases de datos

* Conceptos fundamentales de bases de datos relacionales.
* Tablas.
* Registros.
* Claves primarias.
* Claves foráneas.
* Relaciones.
* Índices.
* Consultas SQL.
* `SELECT`, `INSERT`, `UPDATE`, `DELETE`.
* `JOIN`.
* Agregaciones.
* Modelado de datos.

### SQLite

Evaluar SQLite como sistema de persistencia para el proyecto.




### A VER



## Códigos de barras

* Funcionamiento de códigos de barras.
* Identificación de productos.
* Lectura mediante cámara/dispositivo.
* Generación de códigos propios cuando un producto no posee código.
* Asociación entre código y producto.

## Control de stock

* Stock actual.
* Stock mínimo.
* Entrada de mercadería.
* Salida de mercadería.
* Ajustes de inventario.
* Historial de movimientos.
* Alertas de stock.
* Antigüedad del inventario.


## Análisis de ventas

* Cálculo de ingresos.
* Costos.
* Ganancias.
* Margen de ganancia.
* Ventas por período.
* Productos más vendidos.
* Productos con baja rotación.
* Productos con mayor permanencia en stock.
* Visualización mediante gráficos.


## Autenticación y autorización

* Usuarios y roles.
* Login.
* Sesiones.
* Autenticación.
* Autorización.
* Protección de rutas.
* Rol de **superadministrador**.
* Permisos según tipo de usuario.


## APIs e integraciones

* Consumo de APIs REST.
* Requests HTTP.
* `GET`, `POST`, `PUT/PATCH`, `DELETE`.
* Manejo de respuestas.
* Manejo de errores.
* Autenticación mediante API.
* Integración con servicios externos.

### Pagos

Estudiar la integración de una API/proveedor de pagos.

### Envíos

Estudiar las APIs y mecanismos de integración disponibles para:

* MiCorreo.
* Andreani.

## Automatización

* Automatización de actualización de stock.
* Generación de alertas.
* Automatización de estados de compras.
* Automatización de información de ventas.
* Automatización de procesos relacionados con envíos.
