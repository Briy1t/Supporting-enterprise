from sqlalchemy.orm import Session
from app.models.cliente import Cliente
from app.models.auth_user import AuthUser
from app.controllers.auth_controller import crear_usuario
from app.schemas.auth_user import AuthCreate
from app.models.servicio import Servicio
from app.models.contacto import Contactos         


import secrets
import string


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


def obtener_tabla_formulario(tipo: str):
    return Contactos



def crear_cliente(db: Session, data: dict):

    if db.query(Cliente).filter(Cliente.email == data["correo"]).first():
        raise Exception("El correo ya está registrado como cliente")

    if db.query(Cliente).filter(Cliente.empresa == data["empresa"]).first():
        raise Exception("La empresa ya está registrada como cliente")

    if db.query(AuthUser).filter(AuthUser.email == data["correo"]).first():
        raise Exception("El correo ya está registrado como usuario")

    if db.query(AuthUser).filter(AuthUser.empresa == data["empresa"]).first():
        raise Exception("La empresa ya está registrada como usuario")

    nuevo = Cliente(
        nombre=data["contacto"],
        email=data["correo"],
        empresa=data["empresa"],
        servicio=data.get("servicio"),
        telefono=data.get("telefono"),
        lead_id=data.get("lead_id"),
        estado="activo",
        preferencia=data.get("preferencia")
    )

    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)

    for servicio in data.get("servicios", []):
        nuevo_servicio = Servicio(
            nombre=servicio,
            cliente_id=nuevo.id
        )
        db.add(nuevo_servicio)

    db.commit()

    usuario_generado = generar_usuario(data["contacto"], db)
    password_temporal = generar_password()

    usuario_data = AuthCreate(
        usuario=usuario_generado,
        email=data["correo"],
        password=password_temporal,
        rol="cliente",
        empresa=data["empresa"]
    )

    usuario_creado = crear_usuario(db, usuario_data)

    if "form_id" in data:
        formulario = db.query(Contactos).filter(Contactos.id == data["form_id"]).first()
        if formulario:
            formulario.estado = "convertido"
            db.commit()
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


def descartar_formulario(db: Session, tipo: str, form_id: int):
    tabla = obtener_tabla_formulario(tipo)
    if not tabla:
        raise Exception("Tipo de formulario no válido")

    formulario = db.query(tabla).filter(tabla.id == form_id).first()
    if not formulario:
        raise Exception("Formulario no encontrado")

    formulario.estado = "descartado"
    db.commit()
    return formulario


def listar_formularios_pendientes(db: Session):
    formularios = []

    formularios += db.query(Contactos).filter(Contactos.estado == "pendiente").all()

    resultado = []

    for f in formularios:
        resultado.append({
            "id": f.id,
            "empresa": getattr(f, "empresa", None),
            "contacto": getattr(f, "nombre", None),
            "correo": getattr(f, "email", None),
            "mensaje": getattr(f, "mensaje", None),
            "tipo": getattr(f, "tipo", None),
            "estado": getattr(f, "estado", None),
            
            "privacidad": getattr(f, "privacidad", None),
            "fecha_aceptacion": getattr(f, "fecha_aceptacion", None),
            "ip_usuario": getattr(f, "ip_usuario", None)
        })

    return resultado
