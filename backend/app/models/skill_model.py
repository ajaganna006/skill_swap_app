from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.connection import Base


class Skill(Base):

    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    description = Column(String)

    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User")