from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from flaskwebgui import FlaskUI

from insightax.api import router as api_router

app = FastAPI()
app.include_router(api_router, prefix="/api")

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/", StaticFiles(directory="./frontend/dist", html=True))
        
        
@app.get("/")
async def root():
    """
    Redirects to the Web interface.
    Returns:
    """
    try:
        return RedirectResponse(url="/")
    except Exception as error:
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error"
        ) from error
        