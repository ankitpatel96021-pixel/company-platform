# ==========================================
# COMPANY PLATFORM BACKEND
# FastAPI server
# ==========================================

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
# ==========================================
# DATABASE CONFIGURATION
# ==========================================

import psycopg

# PostgreSQL connection settings
DATABASE_URL = (
    "dbname=company_platform "
    "user=ankit "
    "host=localhost "
    "port=5432"
)

# ==========================================
# CREATE FASTAPI APP
# ==========================================

app = FastAPI()
# ==========================================
# DATABASE CONNECTION
# ==========================================

def get_db_connection():
    return psycopg.connect(DATABASE_URL)
# ==========================================
# CORS CONFIGURATION
# Allows our React frontend to call FastAPI
# ==========================================

app.add_middleware(
    CORSMiddleware,

    # React frontend URL
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],

    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# CONTACT / BOOKING DATA MODEL
# Defines what data frontend can send
# ==========================================

class ContactRequest(BaseModel):
    name: str
    email: str
    phone: str
    company: str
    service: str
    message: str


# ==========================================
# HOME / TEST ROUTE
# ==========================================

@app.get("/")
def home():
    return {
        "message": "Company Platform Backend is running!"
    }
# ==========================================
# DATABASE TEST ROUTE
# ==========================================

@app.get("/api/db-test")
def database_test():

    connection = get_db_connection()

    connection.close()

    return {
        "success": True,
        "message": "PostgreSQL connection successful!"
    }


# ==========================================
# CONTACT FORM API
# Receives booking/project requests
# ==========================================

@app.post("/api/contact")
def create_contact(request: ContactRequest):

    return {
        "success": True,
        "message": "Contact request received!",
        "data": request.model_dump()
    }
