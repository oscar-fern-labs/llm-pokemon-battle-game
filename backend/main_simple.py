from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from models.llm_pokemon import LLMPokemon
from data.llm_pokemon_data import get_pokemon_by_name, get_all_pokemon_names, get_all_pokemon

# Initialize FastAPI app
app = FastAPI(
    title="LLM Pokemon Battle API",
    description="A Pokemon-style battle system featuring AI language models as Pokemon",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["root"])
async def root():
    """Welcome endpoint"""
    return {"message": "Welcome to LLM Pokemon Battle API! 🎮⚔️"}

@app.get("/pokemon", response_model=List[LLMPokemon], tags=["pokemon"])
async def get_all_llm_pokemon():
    """Get all available LLM Pokemon"""
    return get_all_pokemon()

@app.get("/pokemon/names", response_model=List[str], tags=["pokemon"])
async def get_pokemon_names():
    """Get list of all Pokemon names"""
    return get_all_pokemon_names()

@app.get("/pokemon/{name}", response_model=LLMPokemon, tags=["pokemon"])
async def get_pokemon(name: str):
    """Get specific Pokemon by name"""
    try:
        return get_pokemon_by_name(name)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@app.get("/health", tags=["system"])
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
