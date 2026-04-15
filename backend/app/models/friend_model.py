from sqlalchemy import Column, Integer, ForeignKey

from app.database.connection import Base


class Friend(Base):

    __tablename__ = "friends"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    friend_id = Column(Integer, ForeignKey("users.id"))