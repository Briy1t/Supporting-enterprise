from sqlalchemy.orm import Session
from app.models.cliente import Cliente
from app.models.auth_user import AuthUser
from app.controllers.auth_controller import crear_usuario
from app.schemas.auth_user import AuthCreate
import secrets
import string

# Generar usuario automático sin duplicados
def generar_usuario(contacto: str, db: Session):
    base = contacto.replace(" ", "").lower()

  
    if not db.query(AuthUser).filter(AuthUser.usuario == base).first():
        return base

    contador = 1
    while True:
        candidato = f"{base}{contador}"
        if not db.query(AuthUser).filter(AuthUser.usuario == candidato).first():
            return candidato
        contador += 1


def generar_password():
    chars = string.ascii_letters + string.digits
    return ''.join(secrets.choice(chars) for _ in range(10)) + "!"

def crear_cliente(db: Session, data: dict):

    # Mapear datos del frontend al modelo Cliente
    nuevo = Cliente(
        nombre=data["contacto"],
        email=data["correo"],
        empresa=data["empresa"],
        servicio=None,      # lo añadiremos más adelante
        telefono=None,
        lead_id=data.get("lead_id")
    )

    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)

    # Generar usuario automático
    usuario_generado = generar_usuario(data["contacto"], db)

    # Generar contraseña temporal
    password_temporal = generar_password()

    # Crear usuario en AuthUser
    usuario_data = AuthCreate(
        usuario=usuario_generado,
        email=data["correo"],
        password=password_temporal,
        rol="cliente",
        empresa=data["empresa"]
    )

    usuario_creado = crear_usuario(db, usuario_data)

    return {
        "cliente": nuevo,
        "usuario": usuario_creado,
        "password_temporal": password_temporal
    }

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
