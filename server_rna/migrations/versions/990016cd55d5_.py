"""empty message

Revision ID: 990016cd55d5
Revises: 002ac94ce1b3
Create Date: 2021-03-04 11:31:19.991964

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '990016cd55d5'
down_revision = '002ac94ce1b3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('commune', sa.Column('code_commune', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('commune', 'code_commune')
    # ### end Alembic commands ###
