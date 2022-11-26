from datetime import date, datetime

from pydantic import BaseModel

from .service import Sex


# ================ Positions ================
class BasePosition(BaseModel):
    name: str


class PositionCreate(BasePosition):
    pass


class PositionRead(BasePosition):
    id: int

    class Config:
        orm_mode = True


class PositionUpdate(BasePosition):
    name: str | None


# ================ Statuses ================
class BaseStatus(BaseModel):
    name: str


class StatusCreate(BaseStatus):
    stage_id: int


class StatusRead(BaseStatus):
    id: int

    class Config:
        orm_mode = True


class StatusUpdate(BaseStatus):
    name: str | None
    stage_id: int | None


# ================ Canditates ================
class BaseCandidate(BaseModel):
    first_name: str
    last_name: str
    middle_name: str
    phone_number: str
    email: str
    sex: Sex
    birth_date: date


class CandidateStageCreate(BaseModel):
    candidate_id: int
    stage_id: int
    status_id: int | None
    comment: str


class CandidateStageUpdate(BaseModel):
    candidate_id: int
    stage_id: int
    status_id: int | None
    comment: str | None


class CandidateCreate(BaseCandidate):
    middle_name: str | None
    phone_number: str | None
    email: str | None
    position_id: int
    birth_date: date | None


class CandidateRead(BaseCandidate):
    id: int
    position: PositionRead
    photo_url: str
    cv_url: str

    class Config:
        orm_mode = True


class CandidateUpdate(BaseModel):
    first_name: str | None
    last_name: str | None
    middle_name: str | None
    phone_number: str | None
    email: str | None
    sex: Sex | None
    birth_date: date | None
    position_id: int | None


# ================ Stages ================
class BaseStage(BaseModel):
    name: str


class StageCreate(BaseStage):
    pass


class StageRead(BaseStage):
    id: int
    statuses: list[StatusRead]

    class Config:
        orm_mode = True


class StageUpdate(BaseStage):
    pass
