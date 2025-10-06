# testSite — Frontend (React + Vite)

Descripción breve
-----------------
Este repositorio contiene el frontend de un panel de métricas (dashboard) construido con React y Vite. El objetivo es mostrar series temporales (gráficas) y permitir filtrar por rango de fechas. La aplicación se integra con una API backend (FastAPI) para obtener métricas reales.

Estructura principal
-------------------
- `src/` — código fuente de la aplicación React.
	- `pages/DashboardPage.jsx` — Página principal del dashboard con el sidebar, encabezado, y tarjetas de gráficos.
	- `components/` — Componentes reutilizables (Sidebar, ChartCard, MenuButton, DateRangePickerCard, etc.).
- `index.html` y `main.jsx` — Punto de entrada de la app.

Características clave
+-------------------
- Panel con sidebar responsive (hamburguesa en pantallas pequeñas).
- Cuadrícula 2x2 de tarjetas con gráficos (Chart.js).
- Selector de rango de fechas que muestra/oculta una tarjeta de selección en modo "Start Date - End Date".

Cómo ejecutar (desarrollo)
+-------------------------
1. Instalar dependencias:

```powershell
npm install
```
+
2. Iniciar el servidor de desarrollo:

```powershell
npm run dev
```
+
3. Abrir `http://localhost:5173` en el navegador.

Notas sobre integración con el backend
+-------------------------------------
El backend (FastAPI) se espera que corra en `http://localhost:8000`. Asegúrate de iniciar el backend para que las llamadas a la API funcionen desde el frontend. El backend debe permitir CORS desde `http://localhost:5173`.

Contribuir
+----------
- Abre un pull request con cambios pequeños y descriptivos.
+- Ejecuta eslint antes de commitear: `npm run lint`.
+
Contacto
+-------
+
Propietario: Alejandro Melendez Torres
+
— Fin del README —
