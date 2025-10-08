from models.llm_pokemon import LLMPokemon, Move, PokemonType

# Define all the LLM Pokemon with their stats and moves
LLM_POKEMON_DATA = {
    "claude": LLMPokemon(
        id=1,
        name="Claude",
        company="Anthropic",
        primary_type=PokemonType.PSYCHIC,
        secondary_type=PokemonType.ELECTRIC,
        hp=120,
        attack=95,
        defense=110,
        special_attack=130,
        special_defense=115,
        speed=85,
        description="A helpful and harmless AI assistant with exceptional reasoning abilities.",
        catchphrase="I'm here to help! Let me think through this carefully...",
        sprite_front="claude_front.png",
        sprite_back="claude_back.png",
        moves=[
            Move(
                name="Constitutional Analysis",
                type=PokemonType.PSYCHIC,
                power=90,
                accuracy=95,
                pp=10,
                description="Powerful psychic attack with high critical hit ratio",
                is_signature=True
            ),
            Move(
                name="Helpful Response",
                type=PokemonType.PSYCHIC,
                power=75,
                accuracy=100,
                pp=15,
                description="A supportive psychic move that boosts accuracy"
            )
        ]
    ),
    
    "gpt4": LLMPokemon(
        id=2,
        name="GPT-4",
        company="OpenAI",
        primary_type=PokemonType.FIRE,
        secondary_type=PokemonType.PSYCHIC,
        hp=115,
        attack=100,
        defense=100,
        special_attack=135,
        special_defense=100,
        speed=95,
        description="A versatile and creative AI model known for its impressive capabilities.",
        catchphrase="I can help you with a wide variety of tasks!",
        sprite_front="gpt4_front.png",
        sprite_back="gpt4_back.png",
        moves=[
            Move(
                name="Token Storm",
                type=PokemonType.FIRE,
                power=85,
                accuracy=90,
                pp=12,
                description="Multi-hit fire attack that strikes 2-5 times",
                is_signature=True
            ),
            Move(
                name="Creative Burst",
                type=PokemonType.PSYCHIC,
                power=80,
                accuracy=95,
                pp=15,
                description="Creative psychic attack that may confuse the opponent"
            )
        ]
    )
}

# Helper function to get a pokemon by name
def get_pokemon_by_name(name: str) -> LLMPokemon:
    """Get an LLM Pokemon by name (case insensitive)"""
    name_lower = name.lower().replace(" ", "_").replace("-", "_")
    if name_lower in LLM_POKEMON_DATA:
        pokemon = LLM_POKEMON_DATA[name_lower].model_copy(deep=True)
        # Set current HP to max HP for battle
        pokemon.current_hp = pokemon.hp
        return pokemon
    raise ValueError(f"Pokemon '{name}' not found")

# Helper function to get all pokemon names
def get_all_pokemon_names():
    """Get all available Pokemon names"""
    return list(LLM_POKEMON_DATA.keys())

def get_all_pokemon():
    """Get all Pokemon data"""
    return [pokemon.model_copy(deep=True) for pokemon in LLM_POKEMON_DATA.values()]
