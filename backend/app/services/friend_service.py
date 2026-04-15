from sqlalchemy.orm import Session

from app.models.friend_model import Friend


def add_friend(db: Session, user_id: int, friend_id: int):

    friendship = Friend(
        user_id=user_id,
        friend_id=friend_id
    )

    db.add(friendship)
    db.commit()

    return friendship


def remove_friend(db: Session, user_id: int, friend_id: int):

    relation = db.query(Friend).filter(
        Friend.user_id == user_id,
        Friend.friend_id == friend_id
    ).first()

    if relation:
        db.delete(relation)
        db.commit()

    return relation