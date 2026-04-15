from sqlalchemy.orm import Session
from app.models.user_model import User
from app.models.otp_model import OTP
from app.utils.otp_generator import generate_otp
from app.utils.jwt_handler import create_access_token

import random

def send_otp_service(db, email):
    otp = str(random.randint(100000, 999999))

    # TODO: store OTP in DB or memory (for now just return)
    print(f"OTP for {email}: {otp}")

    return otp
def register_user(db: Session, email: str, password: str):

    user = User(email=email, password=password)

    db.add(user)

    db.commit()

    otp = generate_otp()

    otp_entry = OTP(email=email, otp=otp)

    db.add(otp_entry)

    db.commit()

    return otp


def verify_otp(db: Session, email: str, otp: str):

    record = db.query(OTP).filter(
        OTP.email == email,
        OTP.otp == otp
    ).first()

    if not record:

        return False

    user = db.query(User).filter(User.email == email).first()

    user.is_verified = True

    db.commit()

    return True


def login_user(db: Session, email: str, password: str):

    user = db.query(User).filter(User.email == email).first()

    if not user or user.password != password:

        return None

    token = create_access_token({"user_id": user.id})

    return token