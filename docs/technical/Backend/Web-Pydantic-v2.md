# Migración de la Web a Pydantic v2 — Supporting Enterprise

## Problema
Los modelos ORM de la web generaban errores 500 al ser convertidos a JSON.

## Solución
Actualizar modelos a Pydantic v2:

from pydantic import BaseModel, ConfigDict

class AccesoEmpresasResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

## Resultado
- Serialización correcta.
- Compatibilidad con la plataforma.
- Eliminación de errores 500.
