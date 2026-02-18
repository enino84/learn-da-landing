from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.requests import Request

app = FastAPI(title="Learn-DA")

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "course_url": "https://enino84.github.io/courses/intro_data_assimilation/",
            "pyteda_url": "http://www.learn-da.com:8000/",
            "pip_pkg": "pyteda",
        },
    )

@app.get("/health")
def health():
    return {"status": "ok"}
