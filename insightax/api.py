from fastapi import APIRouter, UploadFile, File
import os
import pandas as pd
import io
from starlette.requests import Request
from starlette.status import HTTP_500_INTERNAL_SERVER_ERROR, HTTP_404_NOT_FOUND, HTTP_401_UNAUTHORIZED, HTTP_200_OK
from .utils import *
from .models import *

router = APIRouter()
custom_train_model = CustomTrainModel()


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
async def get_csv_dataset(file: UploadFile = File(...)):
    """
    Returns the status if the file is available for operation or not.
    Returns:
    """
    try:
        if file.filename.split('.')[-1] != 'csv':
            return {"result": "Invalid file format"}, HTTP_401_UNAUTHORIZED
        else:
            contents = await file.read()
            custom_train_model.dataset = pd.read_csv(io.StringIO(contents.decode('utf-8')))
            custom_train_model.dataset_copy = custom_train_model.dataset.copy()
            return {
                "result": "Dataset uploaded successfully",
                "table":custom_train_model.dataset.head().to_json(),
                "is_null":custom_train_model.dataset.isnull().sum().to_json(),
                "total_rows":len(custom_train_model.dataset_copy.index)
                }, HTTP_200_OK
    except Exception as error:
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error"
        ) from error

@router.get("/dataset/view")
async def get_view_dataset(request: Request, rows: int):
    """
    Returns the dataset as json table with specified number of rows
    """
    try:
        return {
            "result": custom_train_model.show_dataset(rows),
            "is_null":custom_train_model.dataset_copy.isnull().sum().to_json(),
            "total_rows":len(custom_train_model.dataset_copy.index)
            }, HTTP_200_OK
    except Exception as error:
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error"
        ) from error

@router.get("/preprocess/steps")
async def get_preprocess_steps(request: Request):
    """
    Returns the pre-processing steps.
    Returns:
    """
    try:
        return {"result": preprocess_steps}, HTTP_200_OK
    except Exception as error:
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error"
        ) from error

@router.get("/dataset/preprocess")
async def get_preprocess_result(request: Request, step: str = ""):
    """
    Returns the pre-processing stats.
    Returns:
    """
    try:
        if step=="":
            return {"result": "Dataset not preprocessed"}, HTTP_404_NOT_FOUND
        elif step=="Delete empty rows":
            custom_train_model.delete_empty_rows()
        elif step=="Fill empty rows":
            custom_train_model.fill_empty_rows()
        elif step=="Delete duplicate rows":
            custom_train_model.delete_duplicate_rows()            
        return {
                "result": "Dataset preprocessed successfully",
                "table":custom_train_model.show_dataset(),
                "is_null":custom_train_model.dataset_copy.isnull().sum().to_json(),
                "total_rows":len(custom_train_model.dataset_copy.index)
                }, HTTP_200_OK
    except Exception as error:
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error"
        ) from error
        
@router.put("/model/params")
async def post_set_train_params(request: Request, item: ModelParams):
    try:
        model=item
        if model.taskName=="" or model.taskType=="":
            return {"result": "Task type or Task name not provided"}, HTTP_404_NOT_FOUND
        if model.taskName in task_subtypes and any(task_type.get(model.taskType) == "available" for task_type in task_subtypes[model.taskName]):
            custom_train_model.operation = model.taskType
            custom_train_model.operation_class = task_operation_class[model.taskType]            
            return {
                "result": "Successful",
                "model":custom_train_model.operation,
                "params":custom_train_model.show_mode_params()
                }, HTTP_200_OK
            
        return {"result": "Task not availabe"}, HTTP_404_NOT_FOUND
    except Exception as error:
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error"
        ) from error
        
@router.post("/model/train")
async def post_model_train(request: Request):
    """
    Returns the model training stats.
    Returns:
    """
    try:
        return {"result": "Model trained successfully"}, HTTP_200_OK
    except Exception as error:
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error"
        ) from error