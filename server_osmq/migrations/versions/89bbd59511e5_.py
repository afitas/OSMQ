"""empty message

Revision ID: 89bbd59511e5
Revises: 92fba301a4a5
Create Date: 2021-02-07 16:50:01.366923

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '89bbd59511e5'
down_revision = '92fba301a4a5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('decision_commune',
    sa.Column('code_commune', sa.String(), nullable=False),
    sa.Column('nb_decision', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['code_commune'], ['commune.code_commune'], ),
    sa.PrimaryKeyConstraint('code_commune')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('decision_commune')
    # ### end Alembic commands ###
