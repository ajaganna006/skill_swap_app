from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.services.friend_service import add_friend, remove_friend

router = APIRouter(prefix="/friends")


@router.post("/add")
def add_friend_api(user_id: int, friend_id: int, db: Session = Depends(get_db)):

    add_friend(db, user_id, friend_id)

    return {"message": "Friend added"}


@router.delete("/remove")
def remove_friend_api(user_id: int, friend_id: int, db: Session = Depends(get_db)):

    remove_friend(db, user_id, friend_id)

    return {"message": "Friend removed"}