# Servicios como catálogo sin relación directa con Cliente

## Estado
Aceptado

## Contexto y Motivación
Los servicios deben funcionar como un catálogo independiente y no poseer una relación directa con la entidad Cliente. 

La jerarquía y relación real del modelo de negocio debe ser:
```text
Cliente ➔ Contrato ➔ Servicios
```

### Problema detectado
Al intentar compilar o migrar el backend, se presentaba el siguiente error de persistencia:

```text
Could not determine join condition… no ForeignKey linking these tables.
```

**Causa:** SQLAlchemy intentaba resolver y crear una relación inexistente entre las tablas debido a una configuración heredada o incorrecta en las definiciones de los modelos.

## Decisión
* **Eliminar `cliente_id`** del modelo `Servicio`.
* **Eliminar la relación** `Cliente.servicios`.
* **Mantener la entidad `Servicio`** estrictamente como un catálogo global.
* **Relacionar los servicios** única y exclusivamente desde el modelo `Contrato`.

---

## Consecuencias
* **Positivas:** Se resuelve el error de mapeo de SQLAlchemy, se normaliza la base de datos de acuerdo al flujo real del negocio y se evita la duplicidad de referencias.
* **Negativas/Riesgos:** Cualquier consulta que dependiera de `cliente.servicios` directamente en el frontend o backend deberá ser refactorizada para pasar a través del objeto `Contrato`.
