from sqlalchemy.orm import Session
from app.models.auth_user import AuthUser
from app.schemas.auth_user import AuthCreate
import bcrypt

def crear_usuario(db: Session, data: AuthCreate):
    # Validar duplicados
    if db.query(AuthUser).filter(AuthUser.email == data.email).first():
        raise Exception("El correo ya existe")

    if db.query(AuthUser).filter(AuthUser.usuario == data.usuario).first():
        raise Exception("El usuario ya existe")

    hashed = bcrypt.hashpw(data.password.encode("utf-8"), bcrypt.gensalt()).decode()

    nuevo = AuthUser(
        usuario=data.usuario,
        email=data.email,
        password=hashed,
        rol=data.rol,
        empresa=data.empresa,
        estado="activo",
        password_reset_required=True
    )

    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)

    return nuevo


def login_usuario(db: Session, email: str, password: str):
    user = db.query(AuthUser).filter(AuthUser.email == email).first()

    if not user:
        raise Exception("Usuario no encontrado")

    if not bcrypt.checkpw(password.encode("utf-8"), user.password.encode("utf-8")):
        raise Exception("Contraseña incorrecta")

    if user.estado != "activo":
        raise Exception("Usuario inactivo")

    return user
