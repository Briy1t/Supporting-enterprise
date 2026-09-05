from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["Dashboard"])

@router.get("/dashboard")
def dashboard():
    return {
        "total_tecnicos": 0,
        "total_clientes": 0,
        "total_tickets": 0,
        "total_alertas": 0
    }
