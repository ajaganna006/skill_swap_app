from fastapi import FastAPI
from app.database.connection import Base, engine
from app.routes.auth_routes import router as auth_router
from fastapi.middleware.cors import CORSMiddleware

# ✅ STEP 1: Create app FIRST
app = FastAPI()

# ✅ STEP 2: Add middleware AFTER app is created
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ STEP 3: Create database tables
Base.metadata.create_all(bind=engine)

# ✅ STEP 4: Include routes
app.include_router(auth_router)