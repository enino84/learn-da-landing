from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Learn-DA")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/config")
def config():
    return {
        "course_url": "https://enino84.github.io/courses/intro_data_assimilation/",
        "pyteda_url": "http://www.learn-da.com:8000/",
        "pip_pkg": "pyteda",
    }

@app.get("/health")
def health():
    return {"status": "ok"}
