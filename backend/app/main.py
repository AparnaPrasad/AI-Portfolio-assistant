from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import portfolios, stocks, chat

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(portfolios.portfolio_router)
app.include_router(portfolios.portfolios_router)
app.include_router(stocks.stock_router)
# app.include_router(copilot.router)
app.include_router(chat.router)

@app.get("/")
async def root():
    return {"message": "Finance Portfolio Manager API"} 