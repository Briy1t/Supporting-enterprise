from sqlalchemy.orm import Session
from app.models.usuario import User

def crear_cliente(db: Session, data: dict):
    nuevo = User(**data)
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

def listar_clientes(db: Session):
    return db.query(User).filter(User.activo == True).all()

def obtener_cliente(db: Session, cliente_id: int):
    return db.query(User).filter(User.id == cliente_id).first()

def eliminar_cliente(db: Session, cliente_id: int):
    cliente = obtener_cliente(db, cliente_id)
    if cliente:
        cliente.activo = False
        db.commit()
    return cliente
