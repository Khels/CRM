from fastapi import APIRouter, Depends, Query, Response, UploadFile, status
from sqlalchemy import select
from sqlalchemy.orm import joinedload
from src.database import AsyncSession, get_db_session

from .models import Candidate, Position
from .schemas import (CandidateCreate, CandidateRead, PositionCreate,
                      PositionRead, PositionUpdate)
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


@router.post("/candidates/from-cv")
async def create_candidate_from_cv(
    cv: UploadFile,
    session: AsyncSession = Depends(get_db_session)
):
    return {}


@router.post("/candidates", response_model=CandidateRead)
async def create_candidate(
    candidate: CandidateCreate,
    # photo: UploadFile | None,
    # cv: UploadFile | None,
    session: AsyncSession = Depends(get_db_session)
):
    candidate_data = candidate.dict()
    position_id = candidate_data["position_id"]

    # check that provided position exists
    await get_object_or_404(Position, position_id, session=session)

    new_candidate = Candidate(**candidate_data)

    session.add(new_candidate)

    await session.commit()
    await session.refresh(new_candidate)

    return new_candidate


@router.get("/candidates/{candidate_id}", response_model=CandidateRead)
async def get_candidate(
    candidate_id: int,
    session: AsyncSession = Depends(get_db_session)
):
    candidate = await get_object_or_404(
        Candidate,
        candidate_id,
        options=[joinedload(Candidate.position, innerjoin=True)],
        session=session
    )

    return candidate


@router.get("/candidates", response_model=list[CandidateRead])
async def get_candidates(
    position: int | None = Query(default=None),
    session: AsyncSession = Depends(get_db_session)
):
    query = select(Candidate).options(
        joinedload(Candidate.position, innerjoin=True)
    )
    if position:
        query = query.where(Candidate.position_id == position)
    result = await session.execute(query)
    positions = result.scalars().all()

    return positions


@router.patch("/candidates/{candidate_id}", response_model=CandidateRead)
async def update_candidate(
    candidate_id: int,
    session: AsyncSession = Depends(get_db_session)
):
    return {}


@router.delete("/candidates/{candidate_id}")
async def delete_candidate(
    candidate_id: int,
    session: AsyncSession = Depends(get_db_session)
):
    candidate = await get_object_or_404(
        Candidate, candidate_id, session=session)

    await session.delete(candidate)
    await session.commit()

    return Response(status_code=200)
