from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import os
import logging
from ..workflows.chat_workflow import create_chat_workflow
from langchain_core.messages import HumanMessage, AIMessage

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/chat", tags=["chat"])

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: List[Message]

class ChatResponse(BaseModel):
    response: str

@router.post("/query", response_model=ChatResponse)
async def handle_chat_query(request: ChatRequest):
    try:
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            logger.error("OPENAI_API_KEY not found in environment variables")
            raise HTTPException(status_code=500, detail="OpenAI API key not configured")

        logger.info(f"Processing chat query: {request.message}")
        
        # Convert history to LangChain messages
        chat_history = []
        for msg in request.history:
            if msg.role == "user":
                chat_history.append(HumanMessage(content=msg.content))
            elif msg.role == "assistant":
                chat_history.append(AIMessage(content=msg.content))
        
        # Create current user query message
        user_query = HumanMessage(content=request.message)
        
        # Create and run the workflow
        workflow = create_chat_workflow()
        result = await workflow.ainvoke({
            "user_query": user_query,
            "chat_history": chat_history,
            "portfolio_data": [],
            "web_search_results": [],
            "needs_web_search": False
        })
        
        logger.info("Successfully generated response")
        return ChatResponse(response=result["chat_history"][-1].content)
        
    except Exception as e:
        logger.error(f"Error processing chat query: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e)) 