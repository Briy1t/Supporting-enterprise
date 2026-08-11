from sqlalchemy.orm import Session
from app.models.cliente import Cliente

def crear_cliente(db: Session, data: dict):
    nuevo = Cliente(**data)
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

def listar_clientes(db: Session):
    return db.query(Cliente).filter(Cliente.estado == "activo").all()

def obtener_cliente(db: Session, cliente_id: int):
    return db.query(Cliente).filter(Cliente.id == cliente_id).first()

def eliminar_cliente(db: Session, cliente_id: int):
    cliente = obtener_cliente(db, cliente_id)
    if cliente:
        cliente.estado = "inactivo"
        db.commit()
    return cliente
