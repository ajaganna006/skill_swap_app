from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.schemas.auth_schema import RegisterRequest, OTPVerifyRequest, LoginRequest
from app.services.auth_service import register_user, verify_otp, login_user, send_otp_service

router = APIRouter(prefix="/auth")


# 🔥 SEND OTP (NEW)
@router.post("/send-otp")
def send_otp(email: str, db: Session = Depends(get_db)):

    otp = send_otp_service(db, email)

    return {"message": "OTP sent", "otp": otp}


# ✅ REGISTER
@router.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):

    otp = register_user(db, data.email, data.password)

    return {"message": "User registered", "otp": otp}


# ✅ VERIFY OTP
@router.post("/verify-otp")
def verify(data: OTPVerifyRequest, db: Session = Depends(get_db)):

    success = verify_otp(db, data.email, data.otp)

    if not success:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    return {"message": "OTP verified"}


# ✅ LOGIN
@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):

    token = login_user(db, data.email, data.password)

    if not token:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"access_token": token}