from fastapi import FastAPI

# Importar routers de cada módulo
from app.routes.clientes import router as clientes_router
from app.routes.admin_forms import router as admin_forms_router
from app.routes.servicios import router as servicios_router
from app.routes.tickets import router as tickets_router
from app.routes.tecnicos import router as tecnicos_router
from app.routes.alarmas import router as alarmas_router

app = FastAPI(
    title="SUPPORTING Platform Backend",
    version="1.0.0",
    description="Backend modular de la plataforma SUPPORTING"
)


app.include_router(clientes_router)
app.include_router(admin_forms_router)
app.include_router(servicios_router)
app.include_router(tickets_router)
app.include_router(tecnicos_router)
app.include_router(alarmas_router)

@app.get("/")
def root():
    return {"mensaje": "SUPPORTING Backend funcionando"}
