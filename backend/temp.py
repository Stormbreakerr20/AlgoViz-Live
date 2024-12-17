from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse


app = FastAPI()

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],

)

@app.get("/")
async def redirect_root_to_docs():
    return RedirectResponse("/docs")
