from sqlalchemy.orm import Session

from app.models.skill_model import Skill


def add_skill(db: Session, user_id: int, name: str, description: str):

    skill = Skill(
        name=name,
        description=description,
        user_id=user_id
    )

    db.add(skill)
    db.commit()
    db.refresh(skill)

    return skill


def get_user_skills(db: Session, user_id: int):

    return db.query(Skill).filter(Skill.user_id == user_id).all()


def delete_skill(db: Session, skill_id: int):

    skill = db.query(Skill).filter(Skill.id == skill_id).first()

    if skill:
        db.delete(skill)
        db.commit()

    return skill