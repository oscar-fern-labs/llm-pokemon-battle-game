// Battle System for LLM Pokemon
class BattleSystem {
    constructor() {
        this.playerPokemon = null;
        this.enemyPokemon = null;
        this.battleState = 'select'; // select, battle, victory, defeat
        this.turn = 'player';
        this.battleLog = [];
        this.canvas = null;
        this.ctx = null;
        this.animationQueue = [];
        this.isAnimating = false;
    }

    initializeBattle(playerName, enemyName = null) {
        // Initialize canvas
        this.canvas = document.getElementById('battle-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set up Pokemon
        this.playerPokemon = this.createBattlePokemon(playerName);
        
        // Auto-select random enemy if not specified
        if (!enemyName) {
            const availableEnemies = Object.keys(LLM_POKEMON).filter(name => name !== playerName);
            enemyName = availableEnemies[Math.floor(Math.random() * availableEnemies.length)];
        }
        this.enemyPokemon = this.createBattlePokemon(enemyName);
        
        // Update UI
        this.updateUI();
        
        // Show move selection
        this.showMoveSelection();
        
        this.battleState = 'battle';
        this.addBattleMessage(`${this.playerPokemon.name} VS ${this.enemyPokemon.name}!`);
        this.addBattleMessage(`Battle start!`);
    }

    createBattlePokemon(pokemonName) {
        const data = LLM_POKEMON[pokemonName];
        if (!data) {
            console.error(`Pokemon ${pokemonName} not found!`);
            return null;
        }

        return {
            ...data,
            currentHP: data.stats.hp,
            maxHP: data.stats.hp,
            statusEffects: [],
            statModifiers: {
                attack: 1.0,
                defense: 1.0,
                special_attack: 1.0,
                special_defense: 1.0,
                speed: 1.0
            }
        };
    }

    updateUI() {
        // Update player info
        const playerNameEl = document.getElementById('player-name');
        const playerCompanyEl = document.getElementById('player-company');
        const playerHPFill = document.getElementById('player-hp-fill');
        const playerHPText = document.getElementById('player-hp-text');
        const playerTypesEl = document.getElementById('player-types');
        const playerSpriteEl = document.getElementById('player-sprite');

        if (this.playerPokemon) {
            playerNameEl.textContent = this.playerPokemon.name;
            playerCompanyEl.textContent = this.playerPokemon.company;
            
            const hpPercentage = (this.playerPokemon.currentHP / this.playerPokemon.maxHP) * 100;
            playerHPFill.style.width = `${hpPercentage}%`;
            playerHPText.textContent = `HP: ${this.playerPokemon.currentHP}/${this.playerPokemon.maxHP}`;
            
            playerTypesEl.innerHTML = this.playerPokemon.types.map(type => 
                `<span class="type ${type.toLowerCase()}">${type.toUpperCase()}</span>`
            ).join('');
            
            playerSpriteEl.textContent = this.playerPokemon.sprite;
        }

        // Update enemy info
        const enemyNameEl = document.getElementById('enemy-name');
        const enemyCompanyEl = document.getElementById('enemy-company');
        const enemyHPFill = document.getElementById('enemy-hp-fill');
        const enemyHPText = document.getElementById('enemy-hp-text');
        const enemyTypesEl = document.getElementById('enemy-types');
        const enemySpriteEl = document.getElementById('enemy-sprite');

        if (this.enemyPokemon) {
            enemyNameEl.textContent = this.enemyPokemon.name;
            enemyCompanyEl.textContent = this.enemyPokemon.company;
            
            const hpPercentage = (this.enemyPokemon.currentHP / this.enemyPokemon.maxHP) * 100;
            enemyHPFill.style.width = `${hpPercentage}%`;
            enemyHPText.textContent = `HP: ${this.enemyPokemon.currentHP}/${this.enemyPokemon.maxHP}`;
            
            enemyTypesEl.innerHTML = this.enemyPokemon.types.map(type => 
                `<span class="type ${type.toLowerCase()}">${type.toUpperCase()}</span>`
            ).join('');
            
            enemySpriteEl.textContent = this.enemyPokemon.sprite;
        }
    }

    showMoveSelection() {
        if (!this.playerPokemon) return;

        const moveSelection = document.getElementById('move-selection');
        const movesGrid = document.getElementById('moves-grid');
        
        movesGrid.innerHTML = '';
        
        this.playerPokemon.moves.forEach((move, index) => {
            const moveButton = document.createElement('button');
            moveButton.className = 'move-button';
            moveButton.onclick = () => this.selectMove(index);
            
            moveButton.innerHTML = `
                <div class="move-name">${move.name}</div>
                <div class="move-type type ${move.type.toLowerCase()}">${move.type}</div>
                <div class="move-power">Power: ${move.power} | Acc: ${move.accuracy}%</div>
            `;
            
            movesGrid.appendChild(moveButton);
        });
        
        moveSelection.classList.add('active');
    }

    hideMoveSelection() {
        const moveSelection = document.getElementById('move-selection');
        moveSelection.classList.remove('active');
    }

    selectMove(moveIndex) {
        if (this.battleState !== 'battle' || this.turn !== 'player') return;
        
        this.hideMoveSelection();
        
        const playerMove = this.playerPokemon.moves[moveIndex];
        const enemyMove = this.getRandomEnemyMove();
        
        // Determine turn order based on speed
        const playerSpeed = this.playerPokemon.stats.speed * this.playerPokemon.statModifiers.speed;
        const enemySpeed = this.enemyPokemon.stats.speed * this.enemyPokemon.statModifiers.speed;
        
        if (playerSpeed >= enemySpeed) {
            this.executePlayerMove(playerMove);
            setTimeout(() => {
                if (this.battleState === 'battle') {
                    this.executeEnemyMove(enemyMove);
                    setTimeout(() => {
                        if (this.battleState === 'battle') {
                            this.showMoveSelection();
                        }
                    }, 1500);
                }
            }, 1500);
        } else {
            this.executeEnemyMove(enemyMove);
            setTimeout(() => {
                if (this.battleState === 'battle') {
                    this.executePlayerMove(playerMove);
                    setTimeout(() => {
                        if (this.battleState === 'battle') {
                            this.showMoveSelection();
                        }
                    }, 1500);
                }
            }, 1500);
        }
    }

    getRandomEnemyMove() {
        const moves = this.enemyPokemon.moves;
        return moves[Math.floor(Math.random() * moves.length)];
    }

    executePlayerMove(move) {
        this.addBattleMessage(`${this.playerPokemon.name} uses ${move.name}!`);
        playSound('move');
        
        if (this.moveHits(move)) {
            const damage = this.calculateDamage(this.playerPokemon, this.enemyPokemon, move);
            this.dealDamage(this.enemyPokemon, damage);
            this.addBattleMessage(`${this.enemyPokemon.name} takes ${damage} damage!`);
            
            // Add visual and audio effects
            this.addDamageEffect('enemy');
            playSound('damage');
            
            // Check for victory
            if (this.enemyPokemon.currentHP <= 0) {
                this.victory();
                return;
            }
        } else {
            this.addBattleMessage(`${move.name} missed!`);
        }
    }

    executeEnemyMove(move) {
        this.addBattleMessage(`${this.enemyPokemon.name} uses ${move.name}!`);
        playSound('move');
        
        if (this.moveHits(move)) {
            const damage = this.calculateDamage(this.enemyPokemon, this.playerPokemon, move);
            this.dealDamage(this.playerPokemon, damage);
            this.addBattleMessage(`${this.playerPokemon.name} takes ${damage} damage!`);
            
            // Add visual and audio effects
            this.addDamageEffect('player');
            playSound('damage');
            
            // Check for defeat
            if (this.playerPokemon.currentHP <= 0) {
                this.defeat();
                return;
            }
        } else {
            this.addBattleMessage(`${move.name} missed!`);
        }
    }

    moveHits(move) {
        const randomRoll = Math.floor(Math.random() * 100) + 1;
        return randomRoll <= move.accuracy;
    }

    calculateDamage(attacker, defender, move) {
        if (move.power === 0) return 0; // Status moves
        
        // Base damage calculation
        const attackStat = attacker.stats.special_attack * attacker.statModifiers.special_attack;
        const defenseStat = defender.stats.special_defense * defender.statModifiers.special_defense;
        
        let damage = Math.floor(
            (((2 * 50 + 10) / 250) * (attackStat / defenseStat) * move.power + 2)
        );
        
        // Type effectiveness
        const typeMultiplier = getTypeMultiplier(move.type, defender.types);
        damage = Math.floor(damage * typeMultiplier);
        
        if (typeMultiplier > 1) {
            this.addBattleMessage("It's super effective!");
        } else if (typeMultiplier < 1 && typeMultiplier > 0) {
            this.addBattleMessage("It's not very effective...");
        } else if (typeMultiplier === 0) {
            this.addBattleMessage("It had no effect!");
            return 0;
        }
        
        // Random factor (85-100%)
        const randomFactor = (Math.floor(Math.random() * 16) + 85) / 100;
        damage = Math.floor(damage * randomFactor);
        
        // Ensure minimum 1 damage
        return Math.max(1, damage);
    }

    dealDamage(pokemon, damage) {
        pokemon.currentHP = Math.max(0, pokemon.currentHP - damage);
        this.updateUI();
    }

    addDamageEffect(target) {
        const spriteEl = document.getElementById(`${target}-sprite`);
        spriteEl.classList.add('damage-flash');
        setTimeout(() => {
            spriteEl.classList.remove('damage-flash');
        }, 300);
    }

    victory() {
        this.battleState = 'victory';
        this.hideMoveSelection();
        this.addBattleMessage(`${this.enemyPokemon.name} fainted!`);
        this.addBattleMessage(`${this.playerPokemon.name} wins!`);
        
        // Victory animation and sound
        const playerSprite = document.getElementById('player-sprite');
        playerSprite.classList.add('victory-celebration');
        playSound('victory');
        
        // Show battle controls
        this.showBattleComplete();
    }

    defeat() {
        this.battleState = 'defeat';
        this.hideMoveSelection();
        this.addBattleMessage(`${this.playerPokemon.name} fainted!`);
        this.addBattleMessage(`${this.enemyPokemon.name} wins!`);
        
        // Defeat sound
        playSound('defeat');
        
        // Show battle controls
        this.showBattleComplete();
    }

    showBattleComplete() {
        // Show new battle button prominently
        const newBattleBtn = document.getElementById('new-battle');
        newBattleBtn.style.display = 'block';
        newBattleBtn.style.fontSize = '1rem';
        newBattleBtn.style.backgroundColor = 'var(--accent-yellow)';
    }

    addBattleMessage(message) {
        this.battleLog.push(message);
        const battleLogEl = document.getElementById('battle-log');
        
        const messageEl = document.createElement('div');
        messageEl.className = 'log-message';
        messageEl.textContent = message;
        
        battleLogEl.appendChild(messageEl);
        
        // Keep only last 10 messages
        if (battleLogEl.children.length > 10) {
            battleLogEl.removeChild(battleLogEl.firstChild);
        }
        
        // Scroll to bottom
        battleLogEl.scrollTop = battleLogEl.scrollHeight;
    }

    reset() {
        this.playerPokemon = null;
        this.enemyPokemon = null;
        this.battleState = 'select';
        this.turn = 'player';
        this.battleLog = [];
        this.hideMoveSelection();
        
        // Clear battle log
        const battleLogEl = document.getElementById('battle-log');
        battleLogEl.innerHTML = '<div class="log-message">Select your Pokemon to begin...</div>';
        
        // Reset battle controls
        const newBattleBtn = document.getElementById('new-battle');
        newBattleBtn.style.display = '';
        newBattleBtn.style.fontSize = '';
        newBattleBtn.style.backgroundColor = '';
    }

    // Auto-battle mode
    startAutoBattle() {
        if (this.battleState !== 'battle') return;
        
        this.hideMoveSelection();
        this.addBattleMessage('Auto-battle mode activated!');
        
        const autoBattleInterval = setInterval(() => {
            if (this.battleState !== 'battle') {
                clearInterval(autoBattleInterval);
                return;
            }
            
            // Random moves for both
            const playerMove = this.getRandomEnemyMove(); // Use enemy function for variety
            const enemyMove = this.getRandomEnemyMove();
            
            // Execute moves based on speed
            const playerSpeed = this.playerPokemon.stats.speed * this.playerPokemon.statModifiers.speed;
            const enemySpeed = this.enemyPokemon.stats.speed * this.enemyPokemon.statModifiers.speed;
            
            if (playerSpeed >= enemySpeed) {
                this.executePlayerMove(playerMove);
                setTimeout(() => {
                    if (this.battleState === 'battle') {
                        this.executeEnemyMove(enemyMove);
                    }
                }, 1000);
            } else {
                this.executeEnemyMove(enemyMove);
                setTimeout(() => {
                    if (this.battleState === 'battle') {
                        this.executePlayerMove(playerMove);
                    }
                }, 1000);
            }
            
        }, 3000); // Auto move every 3 seconds
    }
}

// Global battle system instance
window.battleSystem = new BattleSystem();
