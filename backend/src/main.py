from fastapi import FastAPI

from .auth.router import router as auth_router

app = FastAPI(
    title="CMR for HRs",
    description="Welcome to CMR's API documentation! Here you will be able to discover all of the ways you can interact with the CMR API.",  # noqa: E501
    version="0.1.0",
)

app.include_router(auth_router)
