from sqlalchemy import (Column, DateTime, Enum, ForeignKey, Integer, String,
                        Text)
from sqlalchemy.orm import relationship
from src.database import Base
from src.models import IdMixin, NameMixin

from .service import Sex


class Candidate(IdMixin, Base):
    __tablename__ = "candidate"

    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    middle_name = Column(String, default="", nullable=False)
    phone_number = Column(String, default="", nullable=False)
    email = Column(String, default="", nullable=False)
    position_id = Column(
        Integer,
        ForeignKey("position.id", ondelete="SET NULL")
    )
    sex = Column(Enum(Sex, name="sex"), default=None)
    birth_date = Column(DateTime, default=None)
    photo_url = Column(Text, default="", nullable=False)
    cv_url = Column(Text, default="", nullable=False)

    position = relationship(
        "Position",
        back_populates="candidates",
        innerjoin=True,
        lazy="joined"
    )


class Position(IdMixin, NameMixin, Base):
    __tablename__ = "position"

    candidates = relationship("Candidate", back_populates="position")


class Stage(IdMixin, NameMixin, Base):
    __tablename__ = "stage"

    statuses = relationship("Status", back_populates="stage")


class Status(IdMixin, NameMixin, Base):
    __tablename__ = "status"

    stage_id = Column(
        Integer,
        ForeignKey("stage.id", ondelete="CASCADE"),
        nullable=False
    )

    stage = relationship("Stage", back_populates="statuses")


class CandidateStage(Base):
    __tablename__ = "candidate_stage"

    candidate_id = Column(
        Integer,
        ForeignKey("candidate.id"),
        primary_key=True
    )
    stage_id = Column(
        Integer,
        ForeignKey("stage.id"),
        primary_key=True
    )
    status_id = Column(
        Integer,
        ForeignKey("status.id", ondelete="SET NULL"),
        default=None
    )
    date = Column(DateTime, default=None)
    comment = Column(Text, default="", nullable=False)

    status = relationship("Status")
