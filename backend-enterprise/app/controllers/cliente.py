import secrets
import string
from sqlalchemy.orm import Session
from app.models.cliente import Cliente
from app.models.auth_user import AuthUser
from app.controllers.auth_controller import crear_usuario
from app.schemas.auth_user import AuthCreate
from app.models.servicio import Servicio
from app.models.contacto import Contactos   
from app.models.lead import Lead     

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
    if db.query(Cliente).filter(Cliente.email == data["email"]).first():
        raise Exception("El correo ya está registrado como cliente")

    empresa_ingresada = data.get("empresa")
    if empresa_ingresada and empresa_ingresada.strip():
        if db.query(Cliente).filter(Cliente.empresa == empresa_ingresada).first():
            raise Exception("La empresa ya está registrada como cliente")
        if db.query(AuthUser).filter(AuthUser.empresa == empresa_ingresada).first():
            raise Exception("La empresa ya está registrada como usuario")

    if db.query(AuthUser).filter(AuthUser.email == data["email"]).first():
        raise Exception("El correo ya está registrado como usuario")

    servicios_list = data.get("servicios", [])
    if isinstance(servicios_list, list) and len(servicios_list) > 0:
        servicios_str = ", ".join(map(str, servicios_list))
    else:
        servicios_str = data.get("servicio")

    nuevo = Cliente(
        nombre=data["nombre"],
        email=data["email"],
        empresa=data.get("empresa"),
        servicio=servicios_str,
        telefono=data.get("telefono"),
        lead_id=data.get("lead_id"),
        estado="activo",
        preferencia=data.get("preferencia")
    )

    db.add(nuevo)
  
    usuario_generado = generar_usuario(data["nombre"], db)
    password_temporal = generar_password()

    usuario_data = AuthCreate(
        usuario=usuario_generado,
        email=data["email"],
        password=password_temporal,
        rol="cliente",
        empresa=data.get("empresa")
    )

    usuario_creado = crear_usuario(db, usuario_data)

    target_lead_id = data.get("lead_id")
    if target_lead_id:
        lead = db.query(Lead).filter(Lead.id == target_lead_id).first()       
        if lead:
            lead.estado = "convertido"
            db.add(lead)
    
    db.commit()
    db.refresh(nuevo)

    return {
        "cliente": nuevo,
        "usuario": usuario_creado,
        "password_temporal": password_temporal
    }

def listar_clientes(db: Session):
    return db.query(Cliente).filter(Cliente.estado == "activo").all()

def marcar_cliente_vencido(db: Session, cliente_id: int):
    cliente = db.query(Cliente).filter(Cliente.id == cliente_id).first()
    if cliente:
        cliente.estado = "vencido"
        db.commit()
    return cliente

def obtener_cliente(db: Session, cliente_id: int):
    return db.query(Cliente).filter(Cliente.id == cliente_id).first()

def eliminar_cliente(db: Session, cliente_id: int):
    cliente = obtener_cliente(db, cliente_id)
    if cliente:
        cliente.estado = "inactivo"
        db.commit()
    return cliente

def descartar_formulario(db: Session, tipo: str, form_id: int):
    formulario = db.query(Contactos).filter(Contactos.id == form_id).first()
    if not formulario:
        raise Exception("Formulario no encontrado")

    formulario.estado = "descartado"
    db.commit()
    return formulario

def listar_formularios_pendientes(db: Session):
    formularios = db.query(Contactos).filter(Contactos.estado == "pendiente").all()
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