"""create User and Token models

Revision ID: 34f482caa1ab
Revises:
Create Date: 2022-11-25 07:15:16.532057

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = '34f482caa1ab'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('last_online', sa.DateTime(), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('is_admin', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_username'), 'user', ['username'], unique=True)
    op.create_table('token',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('token', sa.String(length=128), nullable=False),
    sa.Column('type', sa.Enum('access', 'refresh', name='token_type'), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('expires', sa.DateTime(), nullable=False),
    sa.Column('scopes', sa.Text(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('type', 'user_id', name='unique_token')
    )
    op.create_index(op.f('ix_token_token'), 'token', ['token'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_token_token'), table_name='token')
    op.drop_table('token')
    op.drop_index(op.f('ix_user_username'), table_name='user')
    op.drop_table('user')
    # ### end Alembic commands ###
