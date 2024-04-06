from fastapi import APIRouter
import os
from starlette.requests import Request
from starlette.status import HTTP_500_INTERNAL_SERVER_ERROR, HTTP_404_NOT_FOUND, HTTP_401_UNAUTHORIZED, HTTP_200_OK
from .utils import task_types, task_subtypes
from .models import *

router = APIRouter()

dataset_location = ""

@router.get("/task/type")
async def get_task_type(request: Request):
    """
    Returns the task type.
    Returns:
    """
    try:
        return {"result": task_types}, HTTP_200_OK
    except Exception as error:
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error"
        ) from error
        
        
@router.get("/task/type/categories/{task_type}")
async def get_task_categories(request: Request, task_type: str):
    """
    Returns the task type.
    Returns:
    """
    try:
        if task_subtypes[task_type]:
            return {"result": task_subtypes[task_type]}, HTTP_200_OK
        else:
            return {"result": "Task type not found"}, HTTP_404_NOT_FOUND
    except Exception as error:
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error"
        ) from error
        

@router.post("/dataset/csv")
async def get_csv_dataset(request: Request, item: LocationItem):
    """
    Returns the status if the file is available for operation or not.
    Returns:
    """
    try:
        csv_location = item.csv_location
        if csv_location == "":
            return {"result": "Dataset not found"}, HTTP_404_NOT_FOUND
        if os.path.exists(csv_location):
            if csv_location.split('/')[-1].split('.')[-1] != 'csv':
                return {"result": "Invalid file format"}, HTTP_401_UNAUTHORIZED
            dataset_location = csv_location
            return {"result": "Dataset uploaded successfully"}, HTTP_200_OK
        return {"result": "Dataset not found"}, HTTP_404_NOT_FOUND
    except Exception as error:
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error"
        ) from error
        
@router.get("/dataset/preprocess")
async def get_preprocess_result(request: Request):
    """
    Returns the task type.
    Returns:
    """
    try:
        return {"result": "Dataset preprocessed successfully"}, HTTP_200_OK
    except Exception as error:
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error"
        ) from error