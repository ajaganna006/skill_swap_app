from pydantic import BaseModel


class SkillCreate(BaseModel):

    name: str

    description: str


class SkillResponse(BaseModel):

    id: int
    name: str
    description: str

    class Config:
        orm_mode = True