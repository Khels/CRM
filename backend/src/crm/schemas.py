from datetime import date

from pydantic import BaseModel

from .service import Sex


class PositionBase(BaseModel):
    name: str


class PositionCreate(PositionBase):
    pass


class PositionRead(PositionBase):
    id: int

    class Config:
        orm_mode = True


class PositionUpdate(PositionBase):
    name: str | None


class CandidateBase(BaseModel):
    first_name: str
    last_name: str
    middle_name: str
    phone_number: str
    email: str
    sex: Sex
    birth_date: date


class CandidateCreate(CandidateBase):
    middle_name: str | None
    phone_number: str | None
    email: str | None
    position_id: int
    birth_date: date | None


class CandidateRead(CandidateBase):
    id: int
    position: PositionRead
    photo_url: str
    cv_url: str

    class Config:
        orm_mode = True
