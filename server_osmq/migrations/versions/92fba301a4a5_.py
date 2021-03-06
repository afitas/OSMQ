"""empty message

Revision ID: 92fba301a4a5
Revises: 75c0dc95404d
Create Date: 2021-02-07 16:02:13.617897

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.schema import Sequence, CreateSequence, DropSequence


# revision identifiers, used by Alembic.
revision = '92fba301a4a5'
down_revision = 'f5dc092453d3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('idx_commune_geombuff', table_name='commune')
    op.drop_index('idx_commune_geomnorm', table_name='commune')
    op.execute(CreateSequence(Sequence('non_pv_decision_seq')))
    op.create_index(op.f('ix_decision_numero'), 'decision', ['numero'], unique=True)
    op.create_foreign_key(None, 'decision', 'decision', ['numero_a_debatise'], ['numero'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'decision', type_='foreignkey')
    op.execute(DropSequence(Sequence('non_pv_decision_seq')))
    op.drop_index(op.f('ix_decision_numero'), table_name='decision')
    op.create_index('idx_commune_geomnorm', 'commune', ['geomnorm'], unique=False)
    op.create_index('idx_commune_geombuff', 'commune', ['geombuff'], unique=False)
    # ### end Alembic commands ###
