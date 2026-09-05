"""crear tablas disponibilidad y citas

Revision ID: 88c4ad14f0be
Revises: 6707f06187bf
Create Date: 2026-09-05 10:55:09.202528

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '88c4ad14f0be'
down_revision: Union[str, Sequence[str], None] = '6707f06187bf'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
