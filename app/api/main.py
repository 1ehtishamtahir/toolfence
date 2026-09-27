from __future__ import annotations

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import (
    audit,
    benchmark,
    capabilities,
    health,
    policy,
    task,
)


DEFAULT_CORS_ORIGINS = [
    "https://toolfence.netlify.app",
    "http://127.0.0.1:5173",
    "http://localhost:5173",
]


def get_cors_origins() -> list[str]:
    """
    Comma-separated origins via TOOLFENCE_CORS_ORIGINS, e.g. the
    deployed Netlify site. Configured origins extend the defaults
    (local dev + deployed frontend).
    """

    configured = os.getenv(
        "TOOLFENCE_CORS_ORIGINS",
        "",
    )

    origins = {
        origin.strip()
        for origin in configured.split(",")
        if origin.strip()
    }

    return sorted(origins | set(DEFAULT_CORS_ORIGINS))


app = FastAPI(
    title="ToolFence API",
    version="0.1.0",
    description=(
        "Read-only dashboard API for ToolFence task-scoped "
        "AI coding-agent security."
    ),
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=get_cors_origins(),
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)


app.include_router(
    health.router,
    prefix="/api",
    tags=["health"],
)

app.include_router(
    task.router,
    prefix="/api",
    tags=["task"],
)

app.include_router(
    policy.router,
    prefix="/api",
    tags=["policy"],
)

app.include_router(
    capabilities.router,
    prefix="/api",
    tags=["capabilities"],
)

app.include_router(
    audit.router,
    prefix="/api",
    tags=["audit"],
)

app.include_router(
    benchmark.router,
    prefix="/api",
    tags=["benchmark"],
)
