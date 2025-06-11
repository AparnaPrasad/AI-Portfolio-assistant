from fastapi import APIRouter, HTTPException, Request
from typing import List
from app.models.models import Portfolio, Stock
from app.services.portfolios import PortfolioService
import logging
from pydantic import ValidationError

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Router for GET endpoints
portfolios_router = APIRouter(prefix="/api/portfolios")

# Router for POST endpoint
portfolio_router = APIRouter(prefix="/api/portfolio")

@portfolio_router.post("/", response_model=Portfolio)
async def create_portfolio(request: Request):
    try:
        # Get raw data and log it
        data = await request.json()
        logger.info(f"Received raw data: {data}")
        
        try:
            # Create portfolio model from snake_case data
            portfolio = Portfolio(**data)
        except ValidationError as e:
            logger.error(f"Validation error: {str(e)}")
            logger.error(f"Validation error details: {e.errors()}")
            raise HTTPException(status_code=422, detail=str(e))
        
        # Convert to dict for Firebase
        portfolio_data = portfolio.model_dump(exclude_unset=True)
        logger.info(f"Final portfolio data for Firebase: {portfolio_data}")
        
        # Create portfolio in Firebase
        created_portfolio = await PortfolioService.create_portfolio(portfolio_data)
        return created_portfolio
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating portfolio: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@portfolios_router.get("/", response_model=List[Portfolio])
async def get_portfolios():
    try:
        portfolios = await PortfolioService.get_all_portfolios()
        return portfolios
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@portfolio_router.get("/{portfolio_id}", response_model=Portfolio)
async def get_portfolio(portfolio_id: str):
    try:
        portfolio = await PortfolioService.get_portfolio_by_id(portfolio_id)
        if not portfolio:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        return portfolio
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 