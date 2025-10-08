// Enhanced LLM Pokemon Battle - Main Game Logic
console.log('🎮 LLM Pokemon Battle - Enhanced Version Loading...');

let selectedPokemon = null;
let gameState = 'menu'; // menu, battle, victory, defeat

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded, initializing enhanced game...');
    initializeGame();
});

async function initializeGame() {
    try {
        // Check API connection
        await window.apiClient.syncPokemonData();
        
        // Load all Pokemon
        loadPokemonGrid();
        
        // Set up event listeners
        setupEventListeners();
        
        // Initialize audio (if available)
        initializeAudio();
        
        console.log('✅ Game initialized successfully!');
        
    } catch (error) {
        console.error('❌ Game initialization failed:', error);
        // Continue with fallback data
        loadPokemonGrid();
        setupEventListeners();
    }
}

function loadPokemonGrid() {
    const pokemonGrid = document.getElementById('pokemon-grid');
    if (!pokemonGrid) return;
    
    pokemonGrid.innerHTML = '';
    
    // Create cards for all LLM Pokemon
    Object.entries(LLM_POKEMON).forEach(([key, pokemon]) => {
        const card = createPokemonCard(key, pokemon);
        pokemonGrid.appendChild(card);
    });
    
    console.log(`📋 Loaded ${Object.keys(LLM_POKEMON).length} Pokemon`);
}

function createPokemonCard(key, pokemon) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.onclick = () => selectPokemon(card, key);
    
    card.innerHTML = `
        <div class="name">${pokemon.name}</div>
        <div class="company">${pokemon.company}</div>
        <div class="sprite">${pokemon.sprite}</div>
        <div class="types">
            ${pokemon.types.map(type => 
                `<span class="type ${type.toLowerCase()}">${type}</span>`
            ).join('')}
        </div>
        <div class="stats">
            HP: ${pokemon.stats.hp} | ATK: ${pokemon.stats.attack} | DEF: ${pokemon.stats.defense}
        </div>
        <div class="description" style="font-size: 0.5rem; color: #666; margin-top: 0.5rem; line-height: 1.2;">
            ${pokemon.description}
        </div>
    `;
    
    return card;
}

function selectPokemon(card, pokemonKey) {
    // Remove previous selection
    document.querySelectorAll('.pokemon-card').forEach(c => c.classList.remove('selected'));
    
    // Add selection to clicked card
    card.classList.add('selected');
    selectedPokemon = pokemonKey;
    
    // Enable start battle button
    const startBtn = document.getElementById('start-battle');
    if (startBtn) {
        startBtn.disabled = false;
        startBtn.textContent = `Battle with ${LLM_POKEMON[pokemonKey].name}!`;
    }
    
    console.log(`🎯 Selected: ${LLM_POKEMON[pokemonKey].name}`);
    
    // Play selection sound
    playSound('select');
}

function startBattle() {
    if (!selectedPokemon) {
        alert('Please select a Pokemon first!');
        return;
    }
    
    console.log(`⚔️ Starting battle with ${LLM_POKEMON[selectedPokemon].name}`);
    
    // Transition to battle screen
    document.getElementById('title-screen').classList.remove('active');
    document.getElementById('battle-screen').classList.add('active');
    
    // Initialize battle system
    window.battleSystem.initializeBattle(selectedPokemon);
    
    gameState = 'battle';
    
    // Play battle music
    playSound('battle_start');
}

function newBattle() {
    console.log('🔄 Starting new battle...');
    
    // Reset battle system
    window.battleSystem.reset();
    
    // Transition back to title screen
    document.getElementById('battle-screen').classList.remove('active');
    document.getElementById('title-screen').classList.add('active');
    
    // Reset selection
    selectedPokemon = null;
    document.querySelectorAll('.pokemon-card').forEach(c => c.classList.remove('selected'));
    
    const startBtn = document.getElementById('start-battle');
    if (startBtn) {
        startBtn.disabled = true;
        startBtn.textContent = 'Start Battle!';
    }
    
    gameState = 'menu';
    
    // Stop battle music
    stopSound('battle');
}

function setupEventListeners() {
    // Start Battle Button
    const startBtn = document.getElementById('start-battle');
    if (startBtn) {
        startBtn.onclick = startBattle;
    }
    
    // New Battle Button
    const newBattleBtn = document.getElementById('new-battle');
    if (newBattleBtn) {
        newBattleBtn.onclick = newBattle;
    }
    
    // Auto Battle Button
    const autoBattleBtn = document.getElementById('auto-battle');
    if (autoBattleBtn) {
        autoBattleBtn.onclick = () => {
            if (window.battleSystem && window.battleSystem.battleState === 'battle') {
                window.battleSystem.startAutoBattle();
                console.log('🤖 Auto-battle activated!');
            }
        };
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardInput);
    
    console.log('🎮 Event listeners set up');
}

function handleKeyboardInput(event) {
    switch (event.key) {
        case 'Enter':
            if (gameState === 'menu' && selectedPokemon) {
                startBattle();
            }
            break;
        case 'Escape':
            if (gameState === 'battle') {
                newBattle();
            }
            break;
        case '1':
        case '2':
        case '3':
        case '4':
            // Quick move selection during battle
            if (gameState === 'battle' && window.battleSystem) {
                const moveIndex = parseInt(event.key) - 1;
                if (moveIndex >= 0 && moveIndex < 4) {
                    window.battleSystem.selectMove(moveIndex);
                }
            }
            break;
    }
}

// Audio System (Simple)
let audioEnabled = true;
const sounds = {
    select: '🔊',
    battle_start: '🎵',
    move: '💥',
    damage: '💢',
    victory: '🎉',
    defeat: '😵'
};

function initializeAudio() {
    // Simple audio feedback using Web Audio API or fallback
    try {
        // For now, we'll use simple console feedback
        console.log('🎵 Audio system initialized (console mode)');
    } catch (error) {
        console.log('🔇 Audio not available');
        audioEnabled = false;
    }
}

function playSound(soundName) {
    if (!audioEnabled) return;
    
    // For now, visual feedback in console
    if (sounds[soundName]) {
        console.log(`${sounds[soundName]} ${soundName}`);
    }
    
    // TODO: Implement actual 8-bit sound effects
    // This could be expanded with Web Audio API for genuine 8-bit sounds
}

function stopSound(soundName) {
    if (!audioEnabled) return;
    console.log(`🔇 Stopped: ${soundName}`);
}

// Enhanced UI Animations
function addScreenShake() {
    const gameContainer = document.querySelector('.game-container');
    gameContainer.style.animation = 'screenShake 0.5s ease-in-out';
    
    setTimeout(() => {
        gameContainer.style.animation = '';
    }, 500);
}

// Add screen shake animation to CSS if not present
if (!document.querySelector('style[data-animations]')) {
    const style = document.createElement('style');
    style.setAttribute('data-animations', 'true');
    style.textContent = `
        @keyframes screenShake {
            0%, 100% { transform: translateX(0); }
            10% { transform: translateX(-5px); }
            20% { transform: translateX(5px); }
            30% { transform: translateX(-3px); }
            40% { transform: translateX(3px); }
            50% { transform: translateX(-2px); }
            60% { transform: translateX(2px); }
            70% { transform: translateX(-1px); }
            80% { transform: translateX(1px); }
            90% { transform: translateX(-1px); }
        }
        
        .pokemon-card:hover .sprite {
            animation: bounce 0.5s ease-in-out;
        }
        
        @keyframes bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
    `;
    document.head.appendChild(style);
}

// Global functions for console debugging
window.debugGame = {
    selectPokemon: (name) => {
        const key = Object.keys(LLM_POKEMON).find(k => 
            LLM_POKEMON[k].name.toLowerCase() === name.toLowerCase()
        );
        if (key) {
            const card = Array.from(document.querySelectorAll('.pokemon-card')).find(c => 
                c.querySelector('.name').textContent === LLM_POKEMON[key].name
            );
            if (card) selectPokemon(card, key);
        }
    },
    startBattle: () => startBattle(),
    battleSystem: () => window.battleSystem,
    pokemonData: () => LLM_POKEMON
};

console.log('🎮 Enhanced LLM Pokemon Battle loaded! Try:');
console.log('debugGame.selectPokemon("Claude")');
console.log('debugGame.startBattle()');
console.log('debugGame.pokemonData()');
