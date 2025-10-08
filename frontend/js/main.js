// Simple demo version
console.log('LLM Pokemon Battle - Loading...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    const pokemonGrid = document.getElementById('pokemon-grid');
    if (pokemonGrid) {
        pokemonGrid.innerHTML = `
            <div class="pokemon-card" onclick="selectPokemon(this, 'Claude')">
                <div class="name">Claude</div>
                <div class="company">Anthropic</div>
                <div class="types">
                    <span class="type psychic">Psychic</span>
                    <span class="type electric">Electric</span>
                </div>
                <div class="stats">HP: 120 | ATK: 95 | DEF: 110</div>
            </div>
            <div class="pokemon-card" onclick="selectPokemon(this, 'GPT-4')">
                <div class="name">GPT-4</div>
                <div class="company">OpenAI</div>
                <div class="types">
                    <span class="type fire">Fire</span>
                    <span class="type psychic">Psychic</span>
                </div>
                <div class="stats">HP: 115 | ATK: 100 | DEF: 100</div>
            </div>
        `;
    }
});

let selectedPokemon = null;

function selectPokemon(card, name) {
    document.querySelectorAll('.pokemon-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    selectedPokemon = name;
    
    const startBtn = document.getElementById('start-battle');
    if (startBtn) startBtn.disabled = false;
}

function startBattle() {
    if (!selectedPokemon) {
        alert('Select a Pokemon first!');
        return;
    }
    
    document.getElementById('title-screen').classList.remove('active');
    document.getElementById('battle-screen').classList.add('active');
    
    // Initialize battle
    document.getElementById('player-name').textContent = selectedPokemon;
    document.getElementById('enemy-name').textContent = selectedPokemon === 'Claude' ? 'GPT-4' : 'Claude';
    document.getElementById('battle-log').innerHTML = '<div class="log-message">Battle started!</div>';
}

document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('start-battle');
    if (startBtn) startBtn.onclick = startBattle;
    
    const newBattleBtn = document.getElementById('new-battle');
    if (newBattleBtn) {
        newBattleBtn.onclick = function() {
            document.getElementById('battle-screen').classList.remove('active');
            document.getElementById('title-screen').classList.add('active');
            selectedPokemon = null;
            document.querySelectorAll('.pokemon-card').forEach(c => c.classList.remove('selected'));
            startBtn.disabled = true;
        };
    }
});
