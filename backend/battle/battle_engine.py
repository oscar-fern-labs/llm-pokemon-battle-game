import random
from typing import Tuple, List
from models.llm_pokemon import LLMPokemon, Move, BattleState, MoveAction, PokemonType

class BattleEngine:
    """Core battle logic for LLM Pokemon battles"""
    
    def __init__(self):
        self.active_battles = {}
    
    def start_battle(self, battle_id: str, pokemon1: LLMPokemon, pokemon2: LLMPokemon) -> BattleState:
        """Start a new battle between two Pokemon"""
        # Initialize current HP for both Pokemon
        pokemon1.current_hp = pokemon1.hp
        pokemon2.current_hp = pokemon2.hp
        
        battle_state = BattleState(
            battle_id=battle_id,
            player1_pokemon=pokemon1,
            player2_pokemon=pokemon2,
            current_turn=1,
            whose_turn="player1",
            battle_log=[f"Battle started between {pokemon1.name} and {pokemon2.name}!"],
            is_finished=False,
            winner=None
        )
        
        self.active_battles[battle_id] = battle_state
        return battle_state
    
    def get_battle(self, battle_id: str) -> BattleState:
        """Get current battle state"""
        if battle_id not in self.active_battles:
            raise ValueError(f"Battle {battle_id} not found")
        return self.active_battles[battle_id]
