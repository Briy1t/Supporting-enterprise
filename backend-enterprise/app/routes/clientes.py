from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.user import UserCreate, UserResponse
from app.controllers.user import (
    crear_cliente,
    listar_clientes,
    obtener_cliente,
    eliminar_cliente
)

router = APIRouter(prefix="/clientes", tags=["Clientes"])

@router.post("/", response_model=UserResponse)
def crear_cliente_route(data: UserCreate, db: Session = Depends(get_db)):
    return crear_cliente(db, data.dict())

@router.get("/", response_model=list[UserResponse])
def listar_clientes_route(db: Session = Depends(get_db)):
    return listar_clientes(db)

@router.get("/{cliente_id}", response_model=UserResponse)
def obtener_cliente_route(cliente_id: int, db: Session = Depends(get_db)):
    cliente = obtener_cliente(db, cliente_id)
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return cliente

@router.delete("/{cliente_id}")
def eliminar_cliente_route(cliente_id: int, db: Session = Depends(get_db)):
    cliente = eliminar_cliente(db, cliente_id)
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return {"mensaje": "Cliente eliminado"}
