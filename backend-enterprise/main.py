from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta

from apscheduler.schedulers.background import BackgroundScheduler
from sqlalchemy.orm import Session

from app.database import SessionLocal, Base, engine
from app.auto_migrate import ensure_estado_column
from app.models.contratos import Contrato

# Routers
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
from app.routes.contratos_generar import router as contratos_generar_router


app = FastAPI(
    title="SUPPORTING Platform Backend",
    version="1.0.0",
    description="Backend modular de la plataforma SUPPORTING"
)

ensure_estado_column()

# ---------------------------------------------------------
# Montar carpeta estática para archivos y contratos
# ---------------------------------------------------------
os.makedirs("contratos_generados", exist_ok=True)
os.makedirs("contratos_firmados", exist_ok=True)

app.mount("/contratos_generados", StaticFiles(directory="contratos_generados"), name="contratos_generados")
app.mount("/contratos_firmados", StaticFiles(directory="contratos_firmados"), name="contratos_firmados")
# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------
# Tarea Programada (CRON): Revisión de Vencimiento de Contratos
# ---------------------------------------------------------
def revisar_vencimiento_contratos():
    db: Session = SessionLocal()
    try:
        contratos = db.query(Contrato).filter(Contrato.estado == "firmado").all()
        ahora = datetime.utcnow()

        for c in contratos:
            # Calcular meses según el campo duración (asume 12 meses si no especifica)
            meses_duracion = 12
            if "6" in str(c.duracion):
                meses_duracion = 6
            elif "24" in str(c.duracion):
                meses_duracion = 24

            fecha_vencimiento = c.fecha_creacion + timedelta(days=meses_duracion * 30)
            dias_restantes = (fecha_vencimiento - ahora).days

            # Alerta a los 60 días (2 meses)
            if 59 <= dias_restantes <= 61:
                print(f"[ALERTA VENCIMIENTO 2 MESES] El contrato #{c.id} del Lead {c.lead_id} vence en 60 días.")
                # Aquí puedes integrar tu servicio de email/WhatsApp o guardar en la tabla Alertas

            # Alerta a los 30 días (1 mes)
            elif 29 <= dias_restantes <= 31:
                print(f"[ALERTA VENCIMIENTO 1 MES] El contrato #{c.id} del Lead {c.lead_id} vence en 30 días. ¡Ofrecer renovación!")

    finally:
        db.close()

# Iniciar el programador de tareas
scheduler = BackgroundScheduler()
# Ejecuta la función todos los días a las 09:00 AM
scheduler.add_job(revisar_vencimiento_contratos, 'cron', hour=9, minute=0)
scheduler.start()


# Routers
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
app.include_router(contratos_generar_router)


@app.get("/")
def root():
    return {"mensaje": "SUPPORTING Backend funcionando"}