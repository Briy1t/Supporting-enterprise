from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.servicio import Servicio
from app.schemas.servicio import ServicioCreate, ServicioUpdate, ServicioResponse

router = APIRouter(prefix="/servicios", tags=["Servicios"])

@router.post("/", response_model=ServicioResponse)
def crear_servicio_route(data: ServicioCreate, db: Session = Depends(get_db)):
    servicio = Servicio(**data.dict())
    db.add(servicio)
    db.commit()
    db.refresh(servicio)
    return servicio

@router.get("/", response_model=list[ServicioResponse])
def listar_servicios_route(db: Session = Depends(get_db)):
    return db.query(Servicio).filter(Servicio.activo == True).all()

@router.put("/{servicio_id}", response_model=ServicioResponse)
def actualizar_servicio_route(servicio_id: int, data: ServicioUpdate, db: Session = Depends(get_db)):
    servicio = db.query(Servicio).filter(Servicio.id == servicio_id).first()
    if not servicio:
        raise HTTPException(404, "Servicio no encontrado")

    for campo, valor in data.dict().items():
        if valor is not None:
            setattr(servicio, campo, valor)

    db.commit()
    db.refresh(servicio)
    return servicio

@router.delete("/{servicio_id}")
def eliminar_servicio_route(servicio_id: int, db: Session = Depends(get_db)):
    servicio = db.query(Servicio).filter(Servicio.id == servicio_id).first()
    if not servicio:
        raise HTTPException(404, "Servicio no encontrado")

    servicio.activo = False
    db.commit()
    return {"mensaje": "Servicio desactivado"}
