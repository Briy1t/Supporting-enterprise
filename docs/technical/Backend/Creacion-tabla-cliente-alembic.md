# Especificación Técnica: Creación de la Tabla Clientes con Alembic

Este documento detalla el protocolo de saneamiento de base de datos y la estructura de migración requerida para instanciar la entidad `clientes` en PostgreSQL, resolviendo los bloqueos previos de integridad referencial.

---

## 1. Fase de Saneamiento: Purga de Registros Huérfanos

Antes de ejecutar cualquier comando de migración, se debe garantizar la consistencia de los datos en el motor de persistencia para evitar excepciones de tipo `ForeignKeyViolation`.

### Diagnóstico del Bloqueo
El pipeline de Alembic se interrumpía debido a la siguiente violación de restricción relacional:
```text
ForeignKeyViolation: la llave (lead_id)=(5) no está presente en la tabla «leads»
```
**Origen:** Existen filas en la tabla `contratos` que apuntan de forma inválida a un `lead_id = 5` que fue eliminado físicamente del sistema con anterioridad.

### Sentencia SQL de Mitigación
Se debe ejecutar de manera mandatoria la siguiente consulta de depuración directamente en la base de datos (utilizando DB Browser o la consola de PostgreSQL) para remover las dependencias huérfanas:

```sql
DELETE FROM contratos WHERE lead_id NOT IN (SELECT id FROM leads);
```

---

## 2. Definición del Modelo ORM (SQLAlchemy)

Una vez limpia la base de datos, el modelo de la entidad `Cliente` debe declararse implementando la directiva `ondelete="CASCADE"` en su llave foránea para mitigar futuras corrupciones de datos.

```python
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Cliente(Base):
    __tablename__ = "clientes"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    correo = Column(String, nullable=False, unique=True)
    
    # Llave foránea vinculada al Lead con borrado en cascada
    lead_id = Column(Integer, ForeignKey("leads.id", ondelete="CASCADE"), nullable=False)
    
    # Llave foránea opcional para el Módulo de Técnicos
    tecnico_id = Column(Integer, ForeignKey("tecnicos.id", ondelete="SET NULL"), nullable=True)

    # Relaciones ORM
    lead = relationship("Lead", back_populates="cliente")
    contratos = relationship("Contrato", back_populates="cliente", cascade="all, delete-orphan")
```

---

## 3. Despliegue de la Migración con Alembic

Con el entorno saneado y los modelos actualizados en el código del servidor, se procede con la generación y aplicación atómica del script de migración.

### Comandos de Ejecución en Terminal
Ejecutar de forma secuencial en la raíz del backend:

```bash
# 1. Generar el archivo de migración automatizado
alembic revision --autogenerate -m "create clientes table"

# 2. Aplicar los cambios y compilar la estructura en PostgreSQL
alembic upgrade head
```

### Verificación de Estabilidad
Tras la finalización del comando `upgrade head`, se debe verificar que:
* La base de datos compile la tabla `clientes` con sus respectivas restricciones de unicidad (`unique`) en el campo correo.
* El framework FastAPI inicie el entorno de desarrollo mediante Uvicorn sin lanzar instrucciones automáticas de `ROLLBACK`.
