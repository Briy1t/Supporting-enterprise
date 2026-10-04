from sqlalchemy import text
from app.database import engine

def ensure_estado_column():
    

    alter_statements = [
        """
        ALTER TABLE contactos 
        ADD COLUMN IF NOT EXISTS estado VARCHAR DEFAULT 'pendiente';
        """
    ]

    with engine.connect() as conn:
        for stmt in alter_statements:
            conn.execute(text(stmt))
        conn.commit()
