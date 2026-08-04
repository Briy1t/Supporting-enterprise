from fastapi import FastAPI
from app.routes.admin_forms import router as admin_forms_router
from app.routes.clientes import router as clientes_router
from app.routes.servicios import router as servicios_router
from app.routes.tecnicos import router as tecnicos_router
from app.routes.alarmas import router as alarmas_router

app = FastAPI()

app.include_router(admin_forms_router)
app.include_router(clientes_router)
app.include_router(servicios_router)
app.include_router(tecnicos_router)
app.include_router(alarmas_router)
