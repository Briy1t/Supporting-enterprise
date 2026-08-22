from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
load_dotenv()
from app.auto_migrate import ensure_estado_column

from app.routes.auth import router as auth_router
from app.routes.clientes import router as clientes_router
from app.routes.admin_forms import router as admin_forms_router
from app.routes.servicios import router as servicios_router
from app.routes.tickets import router as tickets_router
from app.routes.tecnicos import router as tecnicos_router
from app.routes.alarmas import router as alarmas_router
from app.routes.usuarios import router as usuarios_router
from app.routes.lead import router as lead_router
from app.routes.contratos import router as contratos_router

app = FastAPI(
    title="SUPPORTING Platform Backend",
    version="1.0.0",
    description="Backend modular de la plataforma SUPPORTING"
)
ensure_estado_column()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  #  poner la IP de la web cuando esté en la nube
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)
app.include_router(clientes_router)
app.include_router(admin_forms_router)
app.include_router(servicios_router)
app.include_router(tickets_router)
app.include_router(tecnicos_router)
app.include_router(alarmas_router)
app.include_router(usuarios_router)
app.include_router(lead_router)
app.include_router(contratos_router)

@app.get("/")
def root():
    return {"mensaje": "SUPPORTING Backend funcionando"}
