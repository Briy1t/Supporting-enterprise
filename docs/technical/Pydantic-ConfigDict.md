# Uso de ConfigDict en Pydantic — Supporting Enterprise

## Problema
El backend generaba errores 500 al serializar modelos debido a cambios entre Pydantic v1 y v2.

## Solución
Reemplazar:
from pydantic import BaseModel

por:
from pydantic import ConfigDict

## Configuración recomendada
model_config = ConfigDict(from_attributes=True)

## Resultado
- Serialización correcta.
- Swagger funcionando.
- Eliminación de errores 500 en creación de clientes.
