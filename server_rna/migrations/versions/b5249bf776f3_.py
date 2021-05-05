"""empty message

Revision ID: b5249bf776f3
Revises: 63f1dec73dd6
Create Date: 2021-02-22 10:31:53.642525

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b5249bf776f3'
down_revision = '63f1dec73dd6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_decision',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user', sa.Integer(), nullable=True),
    sa.Column('decision_id', sa.Integer(), nullable=True),
    sa.Column('status', sa.String(), nullable=True),
    sa.Column('comment', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['decision_id'], ['decision.pk'], ),
    sa.ForeignKeyConstraint(['user'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('decision', sa.Column('validator_id', sa.Integer(), nullable=True))
    op.add_column('decision', sa.Column('view_time', sa.TIMESTAMP(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('decision', 'view_time')
    op.drop_column('decision', 'validator_id')
    op.drop_table('user_decision')
    # ### end Alembic commands ###
