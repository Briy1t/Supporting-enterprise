from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.auth_user import AuthUser
from app.schemas.auth_user import AuthResponse

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])

@router.get("/", response_model=list[AuthResponse])
def listar_usuarios(db: Session = Depends(get_db)):
    return db.query(AuthUser).all()
