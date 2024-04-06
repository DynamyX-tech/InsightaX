from fastapi import APIRouter
from .utils import task_types

router = APIRouter()

@router.get("/task/type")
async def get_task_type():
    """
    Returns the task type.
    Returns:
    """
    try:
        return {"result": task_types}
    except Exception as error:
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error"
        ) from error