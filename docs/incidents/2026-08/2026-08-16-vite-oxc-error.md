## Incidencia: Error Vite/OXC

### Detalle del Error
```text
Plugin: vite:oxc
transformWithOxc
viteTransformMiddleware
Failed to transform module
```

### Causa
Import incorrecto detectado en el archivo `AppRouter.jsx`.

### Solución
Se eliminó el import erróneo para restaurar la compilación correcta del proyecto.
