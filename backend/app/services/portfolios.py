from typing import Dict, List, Optional
from datetime import datetime
import uuid
from app.db.firebase_init import db

class PortfolioService:
    @staticmethod
    async def _recalculate_portfolio_totals(portfolio_id: str) -> None:
        """Recalculate totalInvested and currentValue for a portfolio based on its stocks."""
        stocks_ref = db.collection('stocks').where('portfolioId', '==', portfolio_id)
        total_invested = 0
        current_value = 0
        
        for stock_doc in stocks_ref.stream():
            stock_data = stock_doc.to_dict()
            total_invested += stock_data['shares'] * stock_data['costPrice']
            current_value += stock_data['shares'] * stock_data['currentPrice']
        
        # Update portfolio with new totals
        portfolio_ref = db.collection('portfolios').document(portfolio_id)
        portfolio_ref.update({
            'totalInvested': total_invested,
            'currentValue': current_value
        })

    @staticmethod
    async def create_portfolio(portfolio_data: Dict) -> Dict:
        # Add timestamps
        now = datetime.utcnow()
        portfolio_data['createdAt'] = now
        portfolio_data['updatedAt'] = now
        
        # Generate UUID for portfolio
        portfolio_id = str(uuid.uuid4())
        portfolio_data['id'] = portfolio_id
        
        # Create new document with UUID
        doc_ref = db.collection('portfolios').document(portfolio_id)
        
        # Save to Firebase
        doc_ref.set(portfolio_data)
        
        return portfolio_data

    @staticmethod
    async def get_all_portfolios() -> List[Dict]:
        portfolios_ref = db.collection('portfolios')
        portfolios = []
        
        for doc in portfolios_ref.stream():
            portfolio_data = doc.to_dict()
            portfolio_data['id'] = doc.id
            
            # Get stocks for this portfolio
            stocks_ref = db.collection('stocks').where('portfolioId', '==', doc.id)
            stocks = []
            
            for stock_doc in stocks_ref.stream():
                stock_data = stock_doc.to_dict()
                stock_data['id'] = stock_doc.id
                stocks.append(stock_data)
            
            portfolio_data['stocks'] = stocks
            portfolios.append(portfolio_data)
        
        return portfolios

    @staticmethod
    async def get_portfolio_by_id(portfolio_id: str) -> Optional[Dict]:
        portfolio_ref = db.collection('portfolios').document(portfolio_id)
        portfolio = portfolio_ref.get()
        
        if not portfolio.exists:
            return None
            
        portfolio_data = portfolio.to_dict()
        portfolio_data["id"] = portfolio.id
        
        # Get stocks for this portfolio
        stocks_ref = db.collection('stocks').where('portfolioId', '==', portfolio_id)
        stocks = []
        for stock_doc in stocks_ref.stream():
            stock_data = stock_doc.to_dict()
            stock_data['id'] = stock_doc.id
            stocks.append(stock_data)
        portfolio_data['stocks'] = stocks
        
        return portfolio_data 