"""add cliente.citas relation

Revision ID: 70bae44a7098
Revises: 88c4ad14f0be
Create Date: 2026-09-05 11:27:47.657092

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '70bae44a7098'
down_revision: Union[str, Sequence[str], None] = '88c4ad14f0be'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
