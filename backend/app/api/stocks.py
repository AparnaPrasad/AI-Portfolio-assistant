from fastapi import APIRouter, HTTPException, Request
from app.models.models import Stock
from datetime import datetime
from typing import List
from app.services.stocks import StockService
import logging
from pydantic import ValidationError

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

stock_router = APIRouter(prefix="/api/stocks", tags=["stocks"])

@stock_router.post("/{portfolio_id}", response_model=Stock)
async def create_stock(portfolio_id: str, request: Request):
    try:
        # Get raw data and log it
        data = await request.json()
        logger.info(f"Received raw stock data: {data}")
        
        try:
            # Create stock model from data
            stock = Stock(**data)
        except ValidationError as e:
            logger.error(f"Validation error: {str(e)}")
            logger.error(f"Validation error details: {e.errors()}")
            raise HTTPException(status_code=422, detail=str(e))
        
        # Convert to dict for Firebase
        stock_data = stock.model_dump(exclude_unset=True)
        logger.info(f"Final stock data for Firebase: {stock_data}")
        
        # Create stock in Firebase using StockService
        created_stock = await StockService.create_stock(portfolio_id, stock_data)
        return created_stock
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating stock: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
