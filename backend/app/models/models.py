from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel
from .stock import Stock

class Portfolio(BaseModel):
    id: Optional[str] = None
    name: str
    type: str
    goalAmount: float
    description: str
    stocks: Optional[List[Stock]] = []
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None
    totalInvested: float = 0
    currentValue: float = 0

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "name": "Retirement Portfolio",
                "type": "Retirement",
                "goalAmount": 1000000.0,
                "description": "Long-term retirement savings"
            }
        } 