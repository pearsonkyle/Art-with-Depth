# uvicorn main:app --reload
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

# show index.html
@app.get("/")
async def index():
    return FileResponse("static/index.html")

