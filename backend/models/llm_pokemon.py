from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum

class PokemonType(str, Enum):
    FIRE = "fire"
    WATER = "water"
    GRASS = "grass"
    ELECTRIC = "electric"
    PSYCHIC = "psychic"
    DARK = "dark"
    STEEL = "steel"
    FLYING = "flying"
    ICE = "ice"
    FIGHTING = "fighting"
    NORMAL = "normal"
    FAIRY = "fairy"

class Move(BaseModel):
    name: str
    type: PokemonType
    power: int
    accuracy: int
    pp: int = Field(default=10, description="Power Points - how many times move can be used")
    description: str
    is_signature: bool = Field(default=False, description="Is this a signature move?")

class LLMPokemon(BaseModel):
    id: int
    name: str
    company: str
    primary_type: PokemonType
    secondary_type: Optional[PokemonType] = None
    
    # Base stats
    hp: int = Field(..., ge=1, le=255)
    attack: int = Field(..., ge=1, le=255)
    defense: int = Field(..., ge=1, le=255)
    special_attack: int = Field(..., ge=1, le=255)
    special_defense: int = Field(..., ge=1, le=255)
    speed: int = Field(..., ge=1, le=255)
    
    # Current battle stats (for battle instances)
    current_hp: Optional[int] = None
    
    # Moves
    moves: List[Move]
    
    # Flavor text
    description: str
    catchphrase: str
    
    # Sprite info
    sprite_front: str
    sprite_back: str

class BattleState(BaseModel):
    battle_id: str
    player1_pokemon: LLMPokemon
    player2_pokemon: LLMPokemon
    current_turn: int = Field(default=1)
    whose_turn: str = Field(default="player1")  # "player1" or "player2"
    battle_log: List[str] = Field(default_factory=list)
    is_finished: bool = Field(default=False)
    winner: Optional[str] = None

class MoveAction(BaseModel):
    move_name: str
    user: str  # "player1" or "player2"
    target: str = "opponent"  # Usually "opponent", but could be "self" for status moves

# Type effectiveness chart (multiplier values)
TYPE_EFFECTIVENESS = {
    PokemonType.FIRE: {
        PokemonType.GRASS: 2.0,
        PokemonType.ICE: 2.0,
        PokemonType.WATER: 0.5,
        PokemonType.FIRE: 0.5,
        PokemonType.STEEL: 0.5,
    },
    PokemonType.WATER: {
        PokemonType.FIRE: 2.0,
        PokemonType.WATER: 0.5,
        PokemonType.GRASS: 0.5,
        PokemonType.ELECTRIC: 0.5,
    },
    PokemonType.GRASS: {
        PokemonType.WATER: 2.0,
        PokemonType.FIRE: 0.5,
        PokemonType.GRASS: 0.5,
        PokemonType.FLYING: 0.5,
        PokemonType.ICE: 0.5,
    },
    PokemonType.ELECTRIC: {
        PokemonType.WATER: 2.0,
        PokemonType.FLYING: 2.0,
        PokemonType.ELECTRIC: 0.5,
        PokemonType.GRASS: 0.5,
    },
    PokemonType.PSYCHIC: {
        PokemonType.FIGHTING: 2.0,
        PokemonType.PSYCHIC: 0.5,
        PokemonType.STEEL: 0.5,
        PokemonType.DARK: 0.0,  # No effect
    },
    PokemonType.DARK: {
        PokemonType.PSYCHIC: 2.0,
        PokemonType.DARK: 0.5,
        PokemonType.FIGHTING: 0.5,
    },
    PokemonType.STEEL: {
        PokemonType.ICE: 2.0,
        PokemonType.FAIRY: 2.0,
        PokemonType.FIRE: 0.5,
        PokemonType.WATER: 0.5,
        PokemonType.ELECTRIC: 0.5,
        PokemonType.STEEL: 0.5,
    },
    PokemonType.FLYING: {
        PokemonType.GRASS: 2.0,
        PokemonType.FIGHTING: 2.0,
        PokemonType.ELECTRIC: 0.5,
        PokemonType.ICE: 0.5,
        PokemonType.STEEL: 0.5,
    },
    PokemonType.ICE: {
        PokemonType.GRASS: 2.0,
        PokemonType.FLYING: 2.0,
        PokemonType.FIRE: 0.5,
        PokemonType.WATER: 0.5,
        PokemonType.ICE: 0.5,
        PokemonType.STEEL: 0.5,
    },
    PokemonType.FIGHTING: {
        PokemonType.NORMAL: 2.0,
        PokemonType.ICE: 2.0,
        PokemonType.STEEL: 2.0,
        PokemonType.DARK: 2.0,
        PokemonType.FLYING: 0.5,
        PokemonType.PSYCHIC: 0.5,
        PokemonType.FAIRY: 0.5,
    },
    PokemonType.NORMAL: {
        PokemonType.STEEL: 0.5,
    },
    PokemonType.FAIRY: {
        PokemonType.FIGHTING: 2.0,
        PokemonType.DARK: 2.0,
        PokemonType.FIRE: 0.5,
        PokemonType.STEEL: 0.5,
    },
}
