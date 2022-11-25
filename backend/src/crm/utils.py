from typing import Any, NewType

from fastapi import HTTPException
from src.database import AsyncSession

ModelClass = NewType("ModelClass", Any)
LoaderOptions = NewType("LoaderOptions", list)


async def get_object_or_404(
    model_class: ModelClass,
    obj_id: int,
    session: AsyncSession,
    options: LoaderOptions = None
) -> ModelClass:
    obj = await session.get(model_class, obj_id, options=options)
    if not obj:
        raise HTTPException(
            status_code=404,
            detail=f"{model_class.__name__.capitalize()} not found"
        )

    return obj
