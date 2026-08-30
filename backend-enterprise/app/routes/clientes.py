from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.cliente import ClienteCreate, ClienteResponse
from app.controllers.cliente import (
    crear_cliente,
    listar_clientes,
    obtener_cliente,
    eliminar_cliente,
)

router = APIRouter(prefix="/clientes", tags=["Clientes"])

# 1. POST para crear cliente: Acepta ClienteCreate y retorna el dict compuesto (cliente + usuario + pass)
@router.post("/", status_code=status.HTTP_201_CREATED)
def crear_cliente_route(data: ClienteCreate, db: Session = Depends(get_db)):
    try:
        # Convertimos el schema de Pydantic a diccionario
        payload = data.model_dump() if hasattr(data, "model_dump") else data.dict()
        return crear_cliente(db, payload)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

# 2. GET para listar todos los clientes activos
@router.get("/", response_model=list[ClienteResponse])
def listar_clientes_route(db: Session = Depends(get_db)):
    return listar_clientes(db)

# 3. GET para obtener un cliente por ID
@router.get("/{cliente_id}", response_model=ClienteResponse)
def obtener_cliente_route(cliente_id: int, db: Session = Depends(get_db)):
    cliente = obtener_cliente(db, cliente_id)
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return cliente

# 4. DELETE para desactivar (borrado lógico) un cliente
@router.delete("/{cliente_id}")
def eliminar_cliente_route(cliente_id: int, db: Session = Depends(get_db)):
    cliente = eliminar_cliente(db, cliente_id)
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return {"mensaje": "Cliente desactivado correctamente"}