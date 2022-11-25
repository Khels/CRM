from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_mixin


@declarative_mixin
class IdMixin:
    id = Column(Integer, primary_key=True)


@declarative_mixin
class NameMixin:
    name = Column(String(128), nullable=False)
