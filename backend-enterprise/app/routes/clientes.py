from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from app.utils.email import enviar_correo_credenciales
from app.database import get_db
from app.schemas.cliente import ClienteCreate, ClienteResponse
from app.models.lead import Lead  
from app.controllers.cliente import (
    crear_cliente,
    listar_clientes,
    obtener_cliente,
    eliminar_cliente,
)

router = APIRouter(prefix="/clientes", tags=["Clientes"])


@router.post("/", status_code=status.HTTP_201_CREATED)
def crear_cliente_route(
    data: ClienteCreate, 
    background_tasks: BackgroundTasks, 
    db: Session = Depends(get_db)
):
    try:
        # Convertir schema a diccionario
        payload = data.model_dump() if hasattr(data, "model_dump") else data.dict()
        
        res = crear_cliente(db, payload)
        
        auth_user = res["usuario"]
        username = getattr(auth_user, "usuario", None) if not isinstance(auth_user, dict) else auth_user.get("usuario")

        background_tasks.add_task(
            enviar_correo_credenciales,
            payload["email"],
            username,
            res["password_temporal"]
        )
        
        return {
            "mensaje": "Cliente creado exitosamente. Se envió un correo con las credenciales de acceso.",
            "cliente_id": res["cliente"].id
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

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