from datetime import datetime

from fastapi import APIRouter, Depends, Query, Response, UploadFile, status
from sqlalchemy import select
from sqlalchemy.orm import joinedload, selectinload, subqueryload
from src.database import AsyncSession, get_db_session

from .models import Candidate, CandidateStage, Position, Stage, Status
from .schemas import (CandidateCreate, CandidateRead, CandidateStageCreate,
                      CandidateStageUpdate, CandidateUpdate, PositionCreate,
                      PositionRead, PositionUpdate, StageCreate, StageRead,
                      StageUpdate, StatusCreate, StatusRead, StatusUpdate)
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


@router.post("/candidates-stages")
async def create_candidate_stage(
    candidate_stage: CandidateStageCreate,
    session: AsyncSession = Depends(get_db_session)
):
    candidate_stage_data = candidate_stage.dict()
    candidate_stage_data["date"] = datetime.now()

    new_candidate_stage = CandidateStage(**candidate_stage_data)

    session.add(new_candidate_stage)

    await session.commit()
    await session.refresh(new_candidate_stage)

    return new_candidate_stage


@router.get("/candidates/{candidate_id}")
async def get_candidate(
    candidate_id: int,
    session: AsyncSession = Depends(get_db_session)
):
    candidate = await get_object_or_404(
        Candidate,
        candidate_id,
        options=[
            joinedload(Candidate.position, innerjoin=True),
            subqueryload(Candidate.stages)
        ],
        session=session
    )

    return candidate


@router.get("/candidates")
async def get_candidates(
    position: int | None = Query(default=None),
    session: AsyncSession = Depends(get_db_session)
):
    query = select(Candidate).options(
        joinedload(Candidate.position, innerjoin=True),
        selectinload(Candidate.stages)
    )
    if position:
        query = query.where(Candidate.position_id == position)
    result = await session.execute(query)
    candidates = result.scalars().all()

    return candidates


@router.patch("/candidates/{candidate_id}")
async def update_candidate(
    candidate_id: int,
    candidate: CandidateUpdate,
    session: AsyncSession = Depends(get_db_session)
):
    db_candidate = await get_object_or_404(
        Candidate, candidate_id, session=session)

    candidate_data = candidate.dict(exclude_unset=True)
    for field, value in candidate_data.items():
        setattr(db_candidate, field, value)

    session.add(db_candidate)

    await session.commit()
    await session.refresh(db_candidate)

    return db_candidate


@router.post("/candidates/stage")
async def update_candidate_stage(
    candidate_stage: CandidateStageUpdate,
    session: AsyncSession = Depends(get_db_session)
):
    candidate_stage_data = candidate_stage.dict()
    query = select(CandidateStage).where(
        CandidateStage.candidate_id == candidate_stage_data["candidate_id"],
        CandidateStage.stage_id == candidate_stage_data["stage_id"]
    )
    result = await session.execute(query)
    db_candidate_stage = result.scalar()

    db_candidate_stage.status_id = candidate_stage_data.get("status_id", None)
    db_candidate_stage.date = datetime.now()
    db_candidate_stage.comment = candidate_stage_data.get("comment", "")

    session.add(db_candidate_stage)

    await session.commit()
    await session.refresh(db_candidate_stage)

    return db_candidate_stage


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


@router.post("/stages", response_model=StageRead)
async def create_stage(
    stage: StageCreate,
    session: AsyncSession = Depends(get_db_session)
):
    new_stage = Stage(**stage.dict())

    session.add(new_stage)

    await session.commit()
    await session.refresh(new_stage)

    return new_stage


@router.get("/stages", response_model=list[StageRead])
async def get_stages(
    session: AsyncSession = Depends(get_db_session)
):
    query = select(Stage)
    result = await session.execute(query)
    stages = result.scalars().all()

    return stages


@router.patch("/stages/{stage_id}", response_model=StageRead)
async def update_stage(
    stage_id: int,
    stage: StageUpdate,
    session: AsyncSession = Depends(get_db_session)
):
    db_stage = await get_object_or_404(Stage, stage_id, session=session)

    stage_data = stage.dict(exclude_unset=True)
    for field, value in stage_data.items():
        setattr(db_stage, field, value)

    session.add(db_stage)

    await session.commit()
    await session.refresh(db_stage)

    return db_stage


@router.delete("/stage/{stage_id}")
async def delete_stage(
    stage_id: int,
    session: AsyncSession = Depends(get_db_session)
):
    stage = await get_object_or_404(Stage, stage_id, session=session)

    await session.delete(stage)
    await session.commit()

    return Response(status_code=200)


@router.post("/statuses", response_model=StatusRead)
async def create_status(
    status: StatusCreate,
    session: AsyncSession = Depends(get_db_session)
):
    status_data = status.dict()
    stage_id = status_data["stage_id"]

    # check that provided stage exists
    await get_object_or_404(Stage, stage_id, session=session)

    new_status = Status(**status_data)

    session.add(new_status)

    await session.commit()
    await session.refresh(new_status)

    return new_status


@router.get("/statuses", response_model=list[StatusRead])
async def get_statuses(
    session: AsyncSession = Depends(get_db_session)
):
    query = select(Status)
    result = await session.execute(query)
    statuses = result.scalars().all()

    return statuses


@router.patch("/statuses/{status_id}", response_model=StatusRead)
async def update_status(
    status_id: int,
    status: StatusUpdate,
    session: AsyncSession = Depends(get_db_session)
):
    db_status = await get_object_or_404(Status, status_id, session=session)

    status_data = status.dict(exclude_unset=True)
    for field, value in status_data.items():
        setattr(db_status, field, value)

    session.add(db_status)

    await session.commit()
    await session.refresh(db_status)

    return db_status


@router.delete("/statuses/{status_id}")
async def delete_status(
    status_id: int,
    session: AsyncSession = Depends(get_db_session)
):
    status = await get_object_or_404(Status, status_id, session=session)

    await session.delete(status)
    await session.commit()

    return Response(status_code=200)
