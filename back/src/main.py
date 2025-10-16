from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.core.config import settings

# Create FastAPI app instance
app = FastAPI(
    title="MVP Base API",
    version="1.0.0",
    description="API base para proyectos MVP",
    debug=settings.DEBUG
)

# Configuración CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    """Root endpoint"""
    return {
        "message": "Welcome to MVP Base API",
        "version": "1.0.0",
        "description": "API base para proyectos MVP",
        "status": "running"
    }


@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "MVP Base API",
        "version": "1.0.0"
    }
