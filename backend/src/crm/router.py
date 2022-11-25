from fastapi import APIRouter, Depends, Response, status
from sqlalchemy import select
from src.database import AsyncSession, get_db_session

from .models import Position
from .schemas import PositionCreate, PositionRead, PositionUpdate
from .utils import get_object_or_404

router = APIRouter(prefix="/api/v1", tags=['crm'])


@router.post(
    "/positions",
    status_code=status.HTTP_201_CREATED,
    response_model=PositionRead
)
async def create_position(
    position: PositionCreate,
    session: AsyncSession = Depends(get_db_session)
):
    new_position = Position(**position.dict())

    session.add(new_position)

    await session.commit()
    await session.refresh(new_position)

    return new_position


@router.get("/positions/{position_id}", response_model=PositionRead)
async def get_position(
    position_id: int,
    session: AsyncSession = Depends(get_db_session)
):
    position = await get_object_or_404(
        Position, position_id, session=session)

    return position


@router.get("/positions", response_model=list[PositionRead])
async def get_positions(
    q: str | None = None,
    session: AsyncSession = Depends(get_db_session)
):
    query = select(Position)
    if q:
        query = query.where(Position.name.ilike(f"%{q}%"))
    result = await session.execute(query)
    positions = result.scalars().all()

    return positions


@router.patch("/positions/{position_id}", response_model=PositionRead)
async def update_position(
    position_id: int,
    position: PositionUpdate,
    session: AsyncSession = Depends(get_db_session)
):
    db_position = await get_object_or_404(
        Position, position_id, session=session)

    position_data = position.dict(exclude_unset=True)
    for field, value in position_data.items():
        setattr(db_position, field, value)

    session.add(db_position)

    await session.commit()
    await session.refresh(db_position)

    return db_position


@router.delete("/positions/{position_id}")
async def delete_position(
    position_id: int,
    session: AsyncSession = Depends(get_db_session)
):
    position = await get_object_or_404(
        Position, position_id, session=session)

    await session.delete(position)
    await session.commit()

    return Response(status_code=200)
