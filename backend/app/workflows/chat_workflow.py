from typing import Dict, List, Any, Annotated, TypedDict
from langgraph.graph import StateGraph, END
from langchain_core.messages import HumanMessage, AIMessage
from langchain_openai import ChatOpenAI
from ..tools.portfolio_tools import get_portfolios, tavily_search
import os
from IPython.display import Image, display

class GraphState(TypedDict):
    user_query: str  # Current user question
    chat_history: List[Any]  # Previous conversation history
    portfolio_data: List[Dict[str, Any]]
    web_search_results: List[Dict[str, Any]]
    needs_web_search: str
    parsed_query: str  # Rephrased query with context

def create_chat_workflow():
    # Initialize the LLM
    llm = ChatOpenAI(
        model="gpt-4-turbo-preview",
        temperature=0,
        api_key=os.getenv("OPENAI_API_KEY")
    )

    # Define the nodes
    async def get_portfolio_data(state: GraphState) -> GraphState:
        """Get portfolio data and determine if web search is needed"""
        try:
            portfolio_data = await get_portfolios()
            state["portfolio_data"] = portfolio_data
            return state
        except Exception as e:
            print(f"Error in get_portfolio_data: {str(e)}")
            return state

    async def query_parser(state: GraphState) -> GraphState:
        """Parse and rephrase the user query with context from chat history"""
        try:
            current_message = state["user_query"]
            chat_history = state["chat_history"]

            print('chat_history', chat_history)
            
            # If chat history has 3 or fewer messages (initial bot message + first Q&A), use original message
            if len(chat_history) < 3:
                print('Using original message')
                state["parsed_query"] = current_message
                return state
            
            # Create a prompt to rephrase the question with context
            response = llm.invoke([
                HumanMessage(content=f"""You are a query parser. Your task is to rephrase the user's question by incorporating relevant context from the chat history.
                
                Chat History:
                {chat_history}
                
                Current Question: {current_message}
                
                Rephrase the question to be more specific and clear, incorporating any relevant context from the chat history.
                Return ONLY the rephrased question, nothing else.""")
            ])
            
            print('Reprased query', response.content)
            state["parsed_query"] = response.content.strip()
            return state
        except Exception as e:
            print(f"Error in query_parser: {str(e)}")
            state["parsed_query"] = state["user_query"]
            return state

    async def decide_web_search(state: GraphState) -> GraphState:
        """Use LLM to decide whether web search is needed"""
        try:
            parsed_query = state["parsed_query"]
            portfolio_data = state["portfolio_data"]
            print(f"Checking if web search is needed")
            response = llm.invoke([
                HumanMessage(content=f"""Based on this user question and available portfolio data, determine if we need to search the web for additional information.
                Question: {parsed_query}
                Available portfolio data: {portfolio_data}
                
                Respond with only 'yes' if the question requires current market data, news, or general financial information not available in the portfolio data.
                Respond with only 'no' if the question can be answered using only the portfolio data provided.
                
               """)
            ])
            
            print('needs_web_search',response.content)
            l_needs_web_search = response.content.lower().strip() == "yes"
            state["needs_web_search"] = str(l_needs_web_search)
            return state
        except Exception as e:
            print(f"Error in decide_web_search: {str(e)}")
            state["needs_web_search"] = "False"
            return state

    async def perform_web_search(state: GraphState) -> GraphState:
        """Perform web search if needed"""
        try:
            if state["needs_web_search"] == "True":
                parsed_query = state["parsed_query"]
                print("performing web search")
                search_results = await tavily_search(parsed_query)
                state["web_search_results"] = search_results
            return state
        except Exception as e:
            print(f"Error in perform_web_search: {str(e)}")
            state["web_search_results"] = []
            return state

    def generate_response(state: GraphState) -> GraphState:
        """Generate final response"""
        try:
            chat_history = state["chat_history"]
            portfolio_data = state["portfolio_data"]
            web_search_results = state.get("web_search_results", [])
            parsed_query = state["parsed_query"]
            
            # Prepare context for the LLM
            context = f"""
            Portfolio Data: {portfolio_data}
            Web Search Results: {web_search_results}
            """
            
            # Generate response
            response = llm.invoke([
                HumanMessage(content=f"""You are a financial advisor. Based on the following context and conversation history, provide a helpful response.
                Context: {context}
                User Question: {parsed_query}
                
                If the question is about portfolio data, focus on that. Do not make things up.
                Keep the response concise and relevant. Keep it short and to the point.""")
            ])
            
            # Add the response to chat history
            state["chat_history"].append(AIMessage(content=response.content))
            return state
        except Exception as e:
            print(f"Error in generate_response: {str(e)}")
            state["chat_history"].append(AIMessage(content="I apologize, but I encountered an error while processing your request."))
            return state

    # Create the graph
    workflow = StateGraph(GraphState)
    
    # Add nodes with descriptive names
    workflow.add_node("get_portfolio_data", get_portfolio_data)
    workflow.add_node("query_parser", query_parser)
    workflow.add_node("decide_web_search", decide_web_search)
    workflow.add_node("perform_web_search", perform_web_search)
    workflow.add_node("generate_response", generate_response)
    
    # Add edges with clear flow
    workflow.add_edge("get_portfolio_data", "query_parser")
    workflow.add_edge("query_parser", "decide_web_search")
    workflow.add_conditional_edges(
        "decide_web_search",
        lambda state: state["needs_web_search"],
        {
            "True": "perform_web_search",
            "False": "generate_response"
        }
    )
    workflow.add_edge("perform_web_search", "generate_response")
    workflow.add_edge("generate_response", END)
    
    # Set entry point
    workflow.set_entry_point("get_portfolio_data")
    
    # Compile the graph
    compiled = workflow.compile()
    
    # Print the graph structure
    # print("\nWorkflow Graph Structure:")
    # mermaid = compiled.get_graph().draw_mermaid()
    # print(mermaid)
    
    return compiled 