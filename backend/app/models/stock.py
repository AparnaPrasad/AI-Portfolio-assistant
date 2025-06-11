from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class Stock(BaseModel):
    id: Optional[str] = None
    symbol: str
    name: str
    shares: float
    costPrice: float
    currentPrice: float
    portfolioId: Optional[str] = None
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "symbol": "AAPL",
                "name": "Apple Inc.",
                "shares": 10,
                "costPrice": 150.0,
                "currentPrice": 175.0,
                "allocation": 0.25
            }
        } 