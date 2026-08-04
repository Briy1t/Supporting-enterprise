from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.ticket import TicketCreate, TicketResponse
from app.controllers.ticket import (
    crear_ticket,
    listar_tickets,
    obtener_ticket,
    actualizar_estado_ticket,
    eliminar_ticket
)

router = APIRouter(prefix="/tickets", tags=["Tickets"])

@router.post("/", response_model=TicketResponse)
def crear_ticket_route(data: TicketCreate, db: Session = Depends(get_db)):
    return crear_ticket(db, data.dict())

@router.get("/", response_model=list[TicketResponse])
def listar_tickets_route(db: Session = Depends(get_db)):
    return listar_tickets(db)

@router.get("/{ticket_id}", response_model=TicketResponse)
def obtener_ticket_route(ticket_id: int, db: Session = Depends(get_db)):
    ticket = obtener_ticket(db, ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")
    return ticket

@router.patch("/{ticket_id}/estado")
def actualizar_estado_route(ticket_id: int, estado: str, db: Session = Depends(get_db)):
    ticket = actualizar_estado_ticket(db, ticket_id, estado)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")
    return {"mensaje": "Estado actualizado", "ticket": ticket}

@router.delete("/{ticket_id}")
def eliminar_ticket_route(ticket_id: int, db: Session = Depends(get_db)):
    ticket = eliminar_ticket(db, ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")
    return {"mensaje": "Ticket eliminado"}
