# API de Clientes — Supporting Enterprise

## Endpoints principales

### GET /clientes
Lista todos los clientes.

### POST /clientes
Crea un cliente nuevo.

### PUT /clientes/{id}
Edita un cliente existente.

## Ejemplo de implementación (FastAPI)

@app.get("/clientes")
def listar_clientes():
    return db_clientes.all()

@app.post("/clientes")
def crear_cliente(cliente: Cliente):
    db_clientes.insert(cliente.dict())
    return {"status": "ok"}

@app.put("/clientes/{id}")
def editar_cliente(id: int, cliente: Cliente):
    db_clientes.update(cliente.dict(), doc_ids=[id])
    return {"status": "updated"}
