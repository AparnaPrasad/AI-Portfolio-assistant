from typing import List, Dict, Any
from fastapi import HTTPException
import httpx
import os
from ..services.portfolios import PortfolioService

async def get_portfolios() -> List[Dict[str, Any]]:
    """Get all portfolios from the database."""
    try:
        return await PortfolioService.get_all_portfolios()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def tavily_search(query: str) -> Dict[str, Any]:
    """Search the web using Tavily API."""
    try:
        api_key = os.getenv("TAVILY_API_KEY")
        if not api_key:
            raise HTTPException(status_code=500, detail="Tavily API key not configured")

        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.tavily.com/search",
                json={
                    "api_key": api_key,
                    "query": query,
                    "search_depth": "advanced",
                    "include_answer": True,
                    "include_domains": ["investopedia.com", "forbes.com", "bloomberg.com", "reuters.com"]
                }
            )
            if response.status_code == 200:
                return response.json()
            else:
                raise HTTPException(status_code=500, detail="Failed to fetch search results")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 