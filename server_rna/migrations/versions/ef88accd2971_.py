"""empty message

Revision ID: ef88accd2971
Revises: f5dc092453d3
Create Date: 2021-02-07 18:29:21.885381

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ef88accd2971'
down_revision = 'f5dc092453d3'
branch_labels = None
depends_on = None


def upgrade():
    pass
    # ### commands auto generated by Alembic - please adjust! ###
    # op.drop_index('idx_commune_geombuff', table_name='commune')
    # op.drop_index('idx_commune_geomnorm', table_name='commune')
    # ### end Alembic commands ###


def downgrade():
    pass
    # ### commands auto generated by Alembic - please adjust! ###
    # op.create_index('idx_commune_geomnorm', 'commune', ['geomnorm'], unique=False)
    # op.create_index('idx_commune_geombuff', 'commune', ['geombuff'], unique=False)
    # ### end Alembic commands ###