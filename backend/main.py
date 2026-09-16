# ==========================================
# COMPANY PLATFORM BACKEND
# FastAPI server
# ==========================================

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ==========================================
# ADMIN AUTHENTICATION IMPORTS
# ==========================================

from datetime import datetime, timedelta, timezone

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from jose import JWTError, jwt
from passlib.context import CryptContext
from dotenv import load_dotenv
import os
# PostgreSQL connection settings
# ==========================================
# ENVIRONMENT VARIABLES
# ==========================================

load_dotenv()
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
# ADMIN AUTHENTICATION SETTINGS
# ==========================================
# JWT secret key loaded from .env
SECRET_KEY = os.getenv("SECRET_KEY")
# JWT algorithm
ALGORITHM = "HS256"

# Token lifetime
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Password hashing
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# Login endpoint will use this URL
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/admin/login"
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
# ADMIN AUTHENTICATION HELPERS
# ==========================================

def verify_password(plain_password, hashed_password):
    """
    Check whether the entered password
    matches the stored bcrypt hash.
    """
    return pwd_context.verify(
        plain_password,
        hashed_password
    )


def get_admin_by_email(email):
    """
    Find an admin user by email address.
    """

    connection = get_db_connection()

    try:
        cursor = connection.cursor()

        cursor.execute(
            """
            SELECT id, email, password_hash
            FROM admin_users
            WHERE email = %s
            """,
            (email,)
        )

        admin = cursor.fetchone()

        cursor.close()

        return admin

    finally:
        connection.close()
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

# ==========================================
# CONTACT FORM API
# Saves booking/project requests to PostgreSQL
# ==========================================

@app.post("/api/contact")
def create_contact(request: ContactRequest):

    # Connect to PostgreSQL
    connection = get_db_connection()

    try:
        # Create cursor for executing SQL
        cursor = connection.cursor()

        # Insert contact request into database
        cursor.execute(
            """
            INSERT INTO contact_requests
            (name, email, phone, company, service, message)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id
            """,
            (
                request.name,
                request.email,
                request.phone,
                request.company,
                request.service,
                request.message,
            )
        )


        # Get newly created record ID
        contact_id = cursor.fetchone()[0]

        # Save changes permanently
        connection.commit()

        # Close cursor
        cursor.close()

        return {
            "success": True,
            "message": "Contact request saved successfully!",
            "id": contact_id
        }
    

    except Exception as error:

        # Cancel incomplete database transaction
        connection.rollback()

        return {
            "success": False,
            "message": "Failed to save contact request.",
            "error": str(error)
        }

    finally:

        # Always close database connection
        connection.close()
# ==========================================
# ADMIN API
# Gets all customer contact requests
# ==========================================

@app.get("/api/contact-requests")
def get_contact_requests():

    # Connect to PostgreSQL
    connection = get_db_connection()

    try:
        # Create database cursor
        cursor = connection.cursor()

        # Get latest requests first
        cursor.execute(
            """
            SELECT
                id,
                name,
                email,
                phone,
                company,
                service,
                message,
                created_at
            FROM contact_requests
            ORDER BY id DESC
            """
        )

        # Get all database rows
        rows = cursor.fetchall()

        # Convert database rows into JSON-friendly objects
        requests = []

        for row in rows:
            requests.append({
                "id": row[0],
                "name": row[1],
                "email": row[2],
                "phone": row[3],
                "company": row[4],
                "service": row[5],
                "message": row[6],
                "created_at": row[7],
            })

        # Close cursor
        cursor.close()

        return {
            "success": True,
            "requests": requests
        }

    except Exception as error:

        return {
            "success": False,
            "message": "Failed to fetch contact requests.",
            "error": str(error)
        }

    finally:

        # Close database connection
        connection.close()