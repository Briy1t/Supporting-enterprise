import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.message import EmailMessage
from email.mime.application import MIMEApplication
from dotenv import load_dotenv

load_dotenv()
SENDER_EMAIL = os.getenv("SENDER_EMAIL") or os.getenv("SMTP_USER")
SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")

def enviar_correo_credenciales(email_destino: str, usuario: str, password_temp: str):
    """Envía credenciales al cliente recién creado."""
    mensaje = MIMEMultipart()
    mensaje["From"] = SENDER_EMAIL
    mensaje["To"] = email_destino
    mensaje["Subject"] = "¡Bienvenido a Supporting! Tus credenciales de acceso"

    cuerpo = f"""
    Hola,

    Tu cuenta de cliente ha sido creada con éxito en Supporting.

    Tus datos de acceso son:
    - Usuario: {usuario}
    - Contraseña temporal: {password_temp}

    Ingresa a la plataforma y te recomendamos cambiar tu contraseña tras tu primer inicio de sesión.

    Saludos,
    El equipo de Supporting.
    """
    mensaje.attach(MIMEText(cuerpo, "plain"))

    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        server.sendmail(SMTP_USER, email_destino, mensaje.as_string())
        server.quit()
        print(f"Correo de credenciales enviado con éxito a {email_destino}")
    except Exception as e:
        print(f"Error al enviar correo de credenciales: {e}")


def enviar_correo_contrato(email_destino: str, contrato_id: int, ruta_pdf: str = None):
    """Envía la notificación del contrato generado y adjunta el archivo PDF si existe."""
    mensaje = MIMEMultipart()
    mensaje["From"] = SENDER_EMAIL
    mensaje["To"] = email_destino
    mensaje["Subject"] = f"Contrato de Servicios #CTR-{contrato_id:04d} - Supporting"

    cuerpo = f"""
    Hola,

    Se ha generado exitosamente tu contrato de prestación de servicios con el número #CTR-{contrato_id:04d}.

    Adjunto a este correo encontrarás la copia oficial en PDF con todos los detalles de los servicios y condiciones acordadas.

    Saludos,
    El equipo de Supporting.
    """
    mensaje.attach(MIMEText(cuerpo, "plain"))

    # Adjuntar el archivo PDF generado si existe en disco
    if ruta_pdf and os.path.exists(ruta_pdf):
        try:
            with open(ruta_pdf, "rb") as f:
                adjunto = MIMEApplication(f.read(), _subtype="pdf")
                adjunto.add_header(
                    "Content-Disposition",
                    "attachment",
                    filename=os.path.basename(ruta_pdf)
                )
                mensaje.attach(adjunto)
        except Exception as e:
            print(f"No se pudo adjuntar el PDF al correo: {e}")

    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        server.sendmail(SMTP_USER, email_destino, mensaje.as_string())
        server.quit()
        print(f"Correo de contrato enviado con éxito a {email_destino}")
    except Exception as e:
        print(f"Error al enviar correo de contrato: {e}")