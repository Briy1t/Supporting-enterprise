# Estructura del Backend — Supporting Enterprise

backend/
├── run.py
├── requirements.txt
└── app/
    ├── main.py
    ├── config.py
    ├── database.py
    ├── models/
    ├── schemas/
    ├── controllers/
    ├── routes/
    └── utils/

## Modelos principales
- user
- ticket
- technician
- service
- alarm
- lead

## Rutas principales
- admin_forms.py
- clientes.py
- servicios.py
- tecnicos.py
- alarmas.py

## Utilidades
- security.py (hashing, JWT)
- helpers.py
