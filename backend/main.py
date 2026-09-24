# ==========================================
# GRAB TECHIE BACKEND
# FastAPI + PostgreSQL + JWT Authentication
# ==========================================

# ==========================================
# FASTAPI IMPORTS
# ==========================================

from fastapi import (
    FastAPI,
    Depends,
    HTTPException,
    status,
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import (
    OAuth2PasswordBearer,
    OAuth2PasswordRequestForm,
)

from pydantic import BaseModel

# ==========================================
# PYTHON / ENVIRONMENT IMPORTS
# ==========================================

from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv

import os

# ==========================================
# JWT / PASSWORD IMPORTS
# ==========================================

from jose import JWTError, jwt
from passlib.context import CryptContext

# ==========================================
# DATABASE IMPORT
# ==========================================

import psycopg


# ==========================================
# LOAD ENVIRONMENT VARIABLES
# ==========================================

load_dotenv()


# ==========================================
# DATABASE CONFIGURATION
# Reads the database URL from environment variables
# ==========================================

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL environment variable is not set")


# ==========================================
# JWT CONFIGURATION
# ==========================================

SECRET_KEY = os.getenv("SECRET_KEY")

if not SECRET_KEY:
    raise RuntimeError(
        "SECRET_KEY is missing. Add SECRET_KEY to your .env file."
    )

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60


# ==========================================
# PASSWORD HASHING
# ==========================================

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


# ==========================================
# OAUTH2 CONFIGURATION
# ==========================================

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/admin/login"
)


# ==========================================
# CREATE FASTAPI APP
# ==========================================

app = FastAPI(
    title="Grab Techie API",
    description="Backend API for Grab Techie",
    version="1.0.0",
)


# ==========================================
# CORS CONFIGURATION
# ==========================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "https://grabtechie.com",
    "https://www.grabtechie.com",
],

    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# DATABASE CONNECTION
# ==========================================

def get_db_connection():
    return psycopg.connect(DATABASE_URL)


# ==========================================
# CONTACT REQUEST DATA MODEL
# ==========================================

class ContactRequest(BaseModel):
    name: str
    email: str
    phone: str
    company: str
    service: str
    message: str


# ==========================================
# PASSWORD VERIFICATION
# ==========================================

def verify_password(
    plain_password: str,
    hashed_password: str
):
    """
    Compare entered password with
    the stored bcrypt password hash.
    """

    return pwd_context.verify(
        plain_password,
        hashed_password
    )


# ==========================================
# GET ADMIN BY EMAIL
# ==========================================

def get_admin_by_email(email: str):
    """
    Find an admin user by email.
    """

    connection = get_db_connection()

    try:
        cursor = connection.cursor()

        cursor.execute(
            """
            SELECT
                id,
                email,
                password_hash
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
# CREATE JWT ACCESS TOKEN
# ==========================================

def create_access_token(email: str):
    """
    Create a JWT token for an admin.
    """

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": email,
        "exp": expire,
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )


# ==========================================
# JWT AUTHENTICATION CHECK
# ==========================================

def get_current_admin(
    token: str = Depends(oauth2_scheme)
):
    """
    Validate the JWT token and verify
    that the admin still exists.
    """

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={
            "WWW-Authenticate": "Bearer"
        },
    )

    try:
        # Decode JWT token
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        # Get admin email from token
        email = payload.get("sub")

        if not email:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    # Check admin exists
    admin = get_admin_by_email(email)

    if admin is None:
        raise credentials_exception

    return admin


# ==========================================
# HOME ROUTE
# ==========================================

@app.get("/")
def home():

    return {
        "message": "Grab Techie Backend is running!"
    }





# ==========================================
# ADMIN LOGIN API
# ==========================================

@app.post("/api/admin/login")
def admin_login(
    form_data: OAuth2PasswordRequestForm = Depends()
):
    """
    Verify admin email and password.
    Return JWT access token.
    """

    # Find admin
    admin = get_admin_by_email(
        form_data.username
    )

    # Admin not found
    if not admin:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={
                "WWW-Authenticate": "Bearer"
            },
        )

    # Verify password
    password_is_valid = verify_password(
        form_data.password,
        admin[2],
    )

    # Wrong password
    if not password_is_valid:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={
                "WWW-Authenticate": "Bearer"
            },
        )

    # Create token
    access_token = create_access_token(
        admin[1]
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


# ==========================================
# CONTACT FORM API
# PUBLIC ENDPOINT
# ==========================================

@app.post("/api/contact")
def create_contact(
    request: ContactRequest
):
    """
    Save a new customer contact request.
    """

    connection = get_db_connection()

    try:

        cursor = connection.cursor()

        cursor.execute(
            """
            INSERT INTO contact_requests
            (
                name,
                email,
                phone,
                company,
                service,
                message
            )
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

        contact_id = cursor.fetchone()[0]

        connection.commit()

        cursor.close()

        return {
            "success": True,
            "message": "Contact request saved successfully!",
            "id": contact_id,
        }

    except Exception:

        connection.rollback()

        raise HTTPException(
            status_code=500,
            detail="Failed to save contact request.",
        )

    finally:

        connection.close()


# ==========================================
# ADMIN CONTACT REQUESTS API
# PROTECTED ENDPOINT
# ==========================================

@app.get("/api/contact-requests")
def get_contact_requests(
    current_admin=Depends(get_current_admin)
):
    """
    Return customer contact requests.
    Requires valid admin JWT token.
    """

    connection = get_db_connection()

    try:

        cursor = connection.cursor()

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

        rows = cursor.fetchall()
        requests = []

        for row in rows:

            requests.append(
                {
                    "id": row[0],
                    "name": row[1],
                    "email": row[2],
                    "phone": row[3],
                    "company": row[4],
                    "service": row[5],
                    "message": row[6],
                    "created_at": row[7],
                }
            )

        cursor.close()

        return {
            "success": True,
            "requests": requests,
        }

    finally:

        connection.close()