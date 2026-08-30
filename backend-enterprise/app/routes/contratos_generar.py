import os
import traceback
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

# Importaciones de ReportLab
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Table, TableStyle
from reportlab.platypus.flowables import HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.graphics.shapes import Drawing, Rect, Group, String, Circle

from app.database import get_db
from app.models.lead import Lead
from app.models.servicio import Servicio
from app.models.contratos import Contrato, HistorialContrato
from app.schemas.contrato import ContratoCreate

router = APIRouter(prefix="/contratos-generar", tags=["Generar Contratos"])

POLITICAS_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "politicas_default.txt")
if not os.path.exists(POLITICAS_PATH):
    POLITICAS_PATH = "app/politicas_default.txt"

try:
    with open(POLITICAS_PATH, "r", encoding="utf-8") as f:
        POLITICAS_DEFAULT = f.read()
except Exception:
    POLITICAS_DEFAULT = "Políticas y condiciones estándar de la empresa."


def crear_logo_vectorial():
    """Dibuja el icono LayoutDashboard (Outline) + SUPPORTING idéntico a la plataforma."""
    d = Drawing(180, 24)
    g = Group()

    # Colores exactos extraídos de la interfaz gráfica
    ICON_COLOR = colors.HexColor("#3B82F6")   # Azul cian brillante para el contorno
    TEXT_COLOR = colors.HexColor("#0F172A")   # Azul marino muy oscuro / casi negro

    # 4 Rectángulos con borde (stroke) y sin relleno (fillColor=None) para simular Lucide Icons
    g.add(Rect(0, 11, 8, 9, rx=1.5, ry=1.5, fillColor=None, strokeColor=ICON_COLOR, strokeWidth=1.5))
    g.add(Rect(0, 1, 8, 7, rx=1.5, ry=1.5, fillColor=None, strokeColor=ICON_COLOR, strokeWidth=1.5))
    g.add(Rect(10, 14, 8, 6, rx=1.5, ry=1.5, fillColor=None, strokeColor=ICON_COLOR, strokeWidth=1.5))
    g.add(Rect(10, 1, 8, 10, rx=1.5, ry=1.5, fillColor=None, strokeColor=ICON_COLOR, strokeWidth=1.5))

    d.add(g)

    # Texto SUPPORTING en negrita y con el tono oscuro de la plataforma
    texto_brand = String(24, 3, "SUPPORTING", fontName="Helvetica-Bold", fontSize=14, fillColor=TEXT_COLOR)
    d.add(texto_brand)

    return d


def crear_sello_empresa():
    """Genera un sello digital corporativo automático en armonía con el branding."""
    d = Drawing(120, 50)
    
    SEAL_COLOR = colors.HexColor("#1E3A8A")
    ACCENT_COLOR = colors.HexColor("#2563EB")

    d.add(Circle(60, 25, 23, fillColor=None, strokeColor=SEAL_COLOR, strokeWidth=1.2))
    d.add(Circle(60, 25, 21, fillColor=None, strokeColor=ACCENT_COLOR, strokeWidth=0.5))

    # Textos
    d.add(String(60, 31, "SUPPORTING", fontName="Helvetica-Bold", fontSize=6, fillColor=SEAL_COLOR, textAnchor="middle"))
    d.add(String(60, 23, "FIRMA DIGITAL", fontName="Helvetica-Bold", fontSize=5, fillColor=ACCENT_COLOR, textAnchor="middle"))
    d.add(String(60, 16, "VERIFICADO", fontName="Helvetica", fontSize=4.5, fillColor=SEAL_COLOR, textAnchor="middle"))

    return d


def generar_pdf_contrato(lead, contrato):
    os.makedirs("contratos_generados", exist_ok=True)
    ruta = os.path.join("contratos_generados", f"contrato_{contrato.id}.pdf").replace("\\", "/")
    
    doc = SimpleDocTemplate(
        ruta,
        pagesize=A4,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    story = []

    # PALETA DE COLORES MODERNA / CORPORATIVA
    PRIMARY_COLOR = colors.HexColor("#0F172A")    # Azul Slate muy oscuro (casi negro elegante)
    ACCENT_COLOR = colors.HexColor("#2563EB")     # Azul Royal para títulos
    TEXT_MUTED = colors.HexColor("#475569")       # Gris oscuro profesional para etiquetas
    TEXT_DARK = colors.HexColor("#1E293B")        # Color de texto principal
    BG_LIGHT = colors.HexColor("#F8FAFC")         # Fondo suave para tablas y bloques
    BORDER_COLOR = colors.HexColor("#E2E8F0")     # Bordes sutiles

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'DocTitle', parent=styles['Normal'],
        fontName='Helvetica-Bold', fontSize=12, leading=15,
        textColor=PRIMARY_COLOR, alignment=2
    )

    header_info_style = ParagraphStyle(
        'HeaderInfo', parent=styles['Normal'],
        fontName='Helvetica', fontSize=8.5, leading=12,
        textColor=TEXT_MUTED, alignment=2
    )

    empresa_info_style = ParagraphStyle(
        'EmpresaInfo', parent=styles['Normal'],
        fontName='Helvetica', fontSize=8, leading=12,
        textColor=TEXT_MUTED, alignment=0, spaceBefore=3
    )

    section_heading = ParagraphStyle(
        'SectionHeading', parent=styles['Normal'],
        fontName='Helvetica-Bold', fontSize=9.5, leading=13,
        textColor=PRIMARY_COLOR, spaceBefore=4, spaceAfter=6
    )

    body_style = ParagraphStyle(
        'BodyMain', parent=styles['Normal'],
        fontName='Helvetica', fontSize=8.5, leading=12,
        textColor=TEXT_DARK
    )

    body_bold = ParagraphStyle(
        'BodyBold', parent=body_style,
        fontName='Helvetica-Bold', textColor=PRIMARY_COLOR
    )

    politicas_style = ParagraphStyle(
        'PoliticasStyle', parent=styles['Normal'],
        fontName='Helvetica', fontSize=8, leading=11.5,
        textColor=colors.HexColor("#334155")
    )

    # 1. ENCABEZADO
    logo_svg = crear_logo_vectorial()

    datos_proveedor = [
        logo_svg,
        Paragraph("<b>SUPPORTING - Servicios de Infraestructura</b>", empresa_info_style),
        Paragraph("contactosupporting@gmail.com | +34 900 000 000", empresa_info_style),
        Paragraph("Soporte Global / Remoto", empresa_info_style),
    ]

    fecha_creacion = getattr(contrato, 'fecha_creacion', None)
    fecha_str = fecha_creacion.strftime('%d/%m/%Y') if isinstance(fecha_creacion, datetime) else datetime.utcnow().strftime('%d/%m/%Y')

    info_contrato = [
        Paragraph("CONTRATO DE PRESTACIÓN DE SERVICIOS", title_style),
        Paragraph(f"<b>Nº Contrato:</b> <font color='#0F172A'>#CTR-{contrato.id:04d}</font>", header_info_style),
        Paragraph(f"<b>Fecha de Emisión:</b> {fecha_str}", header_info_style),
        Paragraph(f"<b>Estado:</b> <font color='#166534'><b>{str(getattr(contrato, 'estado', 'GENERADO')).upper()}</b></font>", header_info_style),
    ]

    t_header = Table([[datos_proveedor, info_contrato]], colWidths=[260, 260])
    t_header.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('ALIGN', (1, 0), (1, 0), 'RIGHT'),
        ('PADDING', (0, 0), (-1, -1), 0),
    ]))

    story.append(t_header)
    story.append(HRFlowable(width="100%", thickness=1, color=BORDER_COLOR, spaceAfter=14, spaceBefore=12))

    # 2. DATOS DEL CLIENTE (Estilo Tarjeta Limpia)
    nombre_empresa = lead.empresa if (hasattr(lead, 'empresa') and lead.empresa and lead.empresa != "N/A") else "Persona Natural"

    datos_cliente = [
        [
            Paragraph("Empresa / Cliente", body_bold), Paragraph(str(nombre_empresa), body_style),
            Paragraph("Contacto Principal", body_bold), Paragraph(str(getattr(lead, 'contacto', 'N/A') or "N/A"), body_style)
        ],
        [
            Paragraph("Correo Electrónico", body_bold), Paragraph(str(getattr(lead, 'correo', 'N/A') or "N/A"), body_style),
            Paragraph("Teléfono de Contacto", body_bold), Paragraph(str(getattr(lead, 'telefono', 'N/A') or "N/A"), body_style)
        ]
    ]

    t_cliente = Table(datos_cliente, colWidths=[110, 150, 110, 150])
    t_cliente.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), BG_LIGHT),
        ('BOX', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('LINEBELOW', (0, 0), (-1, 0), 0.5, BORDER_COLOR),
        ('PADDING', (0, 0), (-1, -1), 7),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))

    story.append(Paragraph("1. DATOS DEL CLIENTE", section_heading))
    story.append(t_cliente)
    story.append(HRFlowable(width="100%", thickness=0, spaceAfter=14, color=colors.white))

    # 3. SERVICIOS Y CONDICIONES (Estilo Fila Alterna)
    servicios_val = getattr(contrato, 'servicios', [])
    if isinstance(servicios_val, list):
        servicios_lista = servicios_val
    else:
        servicios_lista = [str(servicios_val)]

    servicios_texto = "<br/>".join([f"• &nbsp;{s}" for s in servicios_lista])

    datos_servicios = [
        [Paragraph("Servicios Contratados", body_bold), Paragraph(servicios_texto, body_style)],
        [Paragraph("Duración del Servicio", body_bold), Paragraph(str(getattr(contrato, 'duracion', 'N/A')), body_style)]
    ]

    t_servicios = Table(datos_servicios, colWidths=[120, 400])
    t_servicios.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), BG_LIGHT),
        ('BOX', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('PADDING', (0, 0), (-1, -1), 7),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))

    story.append(Paragraph("2. SERVICIOS Y CONDICIONES", section_heading))
    story.append(t_servicios)
    story.append(HRFlowable(width="100%", thickness=0, spaceAfter=14, color=colors.white))

    # 4. POLÍTICAS Y TÉRMINOS (Contenedor sombreado tipo Box)
    story.append(Paragraph("3. POLÍTICAS Y TÉRMINOS DEL SERVICIO", section_heading))
    
    politicas_texto = getattr(contrato, 'politicas', '') or ''
    politicas_formateadas = politicas_texto.replace("\n", "<br/>")

    t_politicas = Table([[Paragraph(politicas_formateadas, politicas_style)]], colWidths=[520])
    t_politicas.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), BG_LIGHT),
        ('BOX', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('PADDING', (0, 0), (-1, -1), 10),
    ]))

    story.append(t_politicas)
    story.append(HRFlowable(width="100%", thickness=0, spaceAfter=20, color=colors.white))

    # 5. BLOQUE DE FIRMAS
    sello_vectorial = crear_sello_empresa()

    firmas = [
        [
            Paragraph("<b>POR EL PROVEEDOR</b>", ParagraphStyle('FirmaHead', parent=body_style, fontName='Helvetica-Bold', textColor=TEXT_MUTED)),
            Paragraph("<b>POR EL CLIENTE</b>", ParagraphStyle('FirmaHead', parent=body_style, fontName='Helvetica-Bold', textColor=TEXT_MUTED))
        ],
        [
            sello_vectorial, 
            Paragraph("", body_style)
        ],
        [
            Paragraph("____________________________", body_style),
            Paragraph("____________________________", body_style)
        ],
        [
            Paragraph("<b>SUPPORTING</b><br/><font color='#64748B'>Proveedor de Servicios</font>", body_style),
            Paragraph(f"<b>{getattr(lead, 'contacto', 'Cliente') or 'Cliente'}</b><br/><font color='#64748B'>Firma del Representante</font>", body_style)
        ]
    ]

    t_firmas = Table(firmas, colWidths=[260, 260])
    t_firmas.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('PADDING', (0, 0), (-1, -1), 2),
    ]))

    story.append(t_firmas)

    # 6. PIE DE PÁGINA
    def agregar_pie_pagina(canvas, doc):
        canvas.saveState()
        canvas.setFont('Helvetica', 8)
        canvas.setFillColor(colors.HexColor("#94A3B8"))
        canvas.setStrokeColor(BORDER_COLOR)
        canvas.setLineWidth(0.5)
        canvas.line(36, 30, 559, 30)
        canvas.drawString(36, 18, "SUPPORTING — Documento Confidencial de Prestación de Servicios")
        canvas.drawRightString(559, 18, f"Página {doc.page}")
        canvas.restoreState()

    doc.build(story, onFirstPage=agregar_pie_pagina, onLaterPages=agregar_pie_pagina)
    return ruta


@router.post("/generar/{lead_id}")
def generar_contrato(lead_id: int, data: ContratoCreate, db: Session = Depends(get_db)):
    try:
        lead = db.query(Lead).filter(Lead.id == lead_id).first()
        if not lead:
            raise HTTPException(status_code=404, detail="Lead no encontrado")

        servicios_ids = []
        for s in data.servicios:
            try:
                servicios_ids.append(int(s))
            except (ValueError, TypeError):
                pass

        servicios_db = db.query(Servicio).filter(Servicio.id.in_(servicios_ids)).all()
        servicios_nombres = [s.nombre for s in servicios_db]

        if not servicios_nombres and data.servicios:
            servicios_nombres = [str(s) for s in data.servicios]

        politicas_finales = data.politicas or POLITICAS_DEFAULT

        contrato = Contrato(
            lead_id=lead_id,
            cliente_id=None,
            servicios=servicios_nombres,
            duracion=data.duracion,
            politicas=politicas_finales,
            estado="generado",
            fecha_creacion=datetime.utcnow()
        )

        db.add(contrato)
        db.commit()
        db.refresh(contrato)

        ruta_pdf = generar_pdf_contrato(lead, contrato)
        contrato.archivo_pdf = ruta_pdf

        historial = HistorialContrato(
            contrato_id=contrato.id,
            lead_id=lead_id,
            accion="Contrato generado",
            fecha=datetime.utcnow()
        )
        db.add(historial)
        db.commit()

        return {"status": "ok", "contrato_id": contrato.id, "ruta_pdf": ruta_pdf}

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500, 
            detail=f"Error al generar contrato: {str(e)}"
        )