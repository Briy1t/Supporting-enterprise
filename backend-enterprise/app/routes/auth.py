from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.auth_user import AuthCreate, AuthLogin, AuthResponse
from app.controllers.auth_controller import crear_usuario, login_usuario
import jwt, os
import bcrypt
from datetime import datetime, timedelta

router = APIRouter(prefix="/auth", tags=["Auth"])

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM")

def crear_token(user):
    payload = {
        "sub": user.usuario,
        "id": user.id,
        "rol": user.rol,
        "exp": datetime.utcnow() + timedelta(hours=12)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/create", response_model=AuthResponse)
def crear_usuario_route(data: AuthCreate, db: Session = Depends(get_db)):
    try:
        user = crear_usuario(db, data)
        return user
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login")
def login_route(data: AuthLogin, db: Session = Depends(get_db)):
    try:
        user = login_usuario(db, data.email, data.password)
        token = crear_token(user)
        return {
            "status": "OK",
            "token": token,
            "usuario": user.usuario,
            "rol": user.rol,
            "empresa": user.empresa
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
