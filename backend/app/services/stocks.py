from typing import Dict
from datetime import datetime
import uuid
from app.services.portfolios import PortfolioService
from app.db.firebase_init import db

class StockService:
    @staticmethod
    async def create_stock(portfolio_id: str, stock_data: Dict) -> Dict:
        # Verify portfolio exists
        portfolio_ref = db.collection('portfolios').document(portfolio_id)
        portfolio = portfolio_ref.get()
        
        if not portfolio.exists:
            raise ValueError(f"Portfolio with ID {portfolio_id} not found")
            
        # Add timestamps and portfolio reference
        now = datetime.utcnow()
        stock_data['createdAt'] = now
        stock_data['updatedAt'] = now
        stock_data['portfolioId'] = portfolio_id
        
        # Generate UUID for stock
        stock_id = str(uuid.uuid4())
        stock_data['id'] = stock_id
        
        # Create new document with UUID
        doc_ref = db.collection('stocks').document(stock_id)
        
        # Save to Firebase
        doc_ref.set(stock_data)
        
        # Update portfolio's updatedAt timestamp and recalculate totals
        portfolio_ref.update({'updatedAt': now})
        await PortfolioService._recalculate_portfolio_totals(portfolio_id)
        
        return stock_data 