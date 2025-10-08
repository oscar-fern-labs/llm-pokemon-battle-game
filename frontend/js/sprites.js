// Sprite Generator for LLM Pokemon
class SpriteGenerator {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.spriteCache = new Map();
    }

    generateSprite(pokemon, size = 64) {
        const cacheKey = `${pokemon.name}-${size}`;
        
        if (this.spriteCache.has(cacheKey)) {
            return this.spriteCache.get(cacheKey);
        }

        this.canvas.width = size;
        this.canvas.height = size;
        this.ctx.clearRect(0, 0, size, size);
        
        // Set up pixel art rendering
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.fillStyle = pokemon.color || '#666666';
        
        // Draw simple pixel art based on Pokemon type and characteristics
        this.drawPokemonSprite(pokemon, size);
        
        const spriteDataURL = this.canvas.toDataURL();
        this.spriteCache.set(cacheKey, spriteDataURL);
        
        return spriteDataURL;
    }

    drawPokemonSprite(pokemon, size) {
        const ctx = this.ctx;
        const center = size / 2;
        const unit = size / 16; // 16x16 pixel grid
        
        // Draw based on Pokemon characteristics
        switch (pokemon.name.toLowerCase()) {
            case 'claude':
                this.drawClaude(ctx, center, unit);
                break;
            case 'gpt-4':
                this.drawGPT4(ctx, center, unit);
                break;
            case 'gemini':
                this.drawGemini(ctx, center, unit);
                break;
            case 'grok':
                this.drawGrok(ctx, center, unit);
                break;
            case 'llama':
                this.drawLlama(ctx, center, unit);
                break;
            case 'kimi':
                this.drawKimi(ctx, center, unit);
                break;
            case 'mixtral':
                this.drawMixtral(ctx, center, unit);
                break;
            case 'perplexity':
                this.drawPerplexity(ctx, center, unit);
                break;
            default:
                this.drawGeneric(ctx, center, unit, pokemon.color);
        }
    }

    drawClaude(ctx, center, unit) {
        // Orange and blue robot-like design
        ctx.fillStyle = '#FF6B35';
        this.drawPixelRect(ctx, center - 4*unit, center - 6*unit, 8*unit, 8*unit);
        
        // Eyes
        ctx.fillStyle = '#FFFFFF';
        this.drawPixelRect(ctx, center - 3*unit, center - 4*unit, 2*unit, 2*unit);
        this.drawPixelRect(ctx, center + unit, center - 4*unit, 2*unit, 2*unit);
        
        // Pupils
        ctx.fillStyle = '#000000';
        this.drawPixelRect(ctx, center - 2*unit, center - 3*unit, unit, unit);
        this.drawPixelRect(ctx, center + 2*unit, center - 3*unit, unit, unit);
        
        // Body
        ctx.fillStyle = '#4299E1';
        this.drawPixelRect(ctx, center - 3*unit, center + 2*unit, 6*unit, 4*unit);
    }

    drawGPT4(ctx, center, unit) {
        // Green and fire-like design
        ctx.fillStyle = '#00A67E';
        this.drawPixelRect(ctx, center - 4*unit, center - 6*unit, 8*unit, 8*unit);
        
        // Fire crown
        ctx.fillStyle = '#FF6B35';
        this.drawPixelRect(ctx, center - 2*unit, center - 8*unit, unit, 2*unit);
        this.drawPixelRect(ctx, center, center - 9*unit, unit, 3*unit);
        this.drawPixelRect(ctx, center + 2*unit, center - 8*unit, unit, 2*unit);
        
        // Eyes
        ctx.fillStyle = '#FFFFFF';
        this.drawPixelRect(ctx, center - 3*unit, center - 4*unit, 2*unit, 2*unit);
        this.drawPixelRect(ctx, center + unit, center - 4*unit, 2*unit, 2*unit);
    }

    drawGemini(ctx, center, unit) {
        // Diamond/crystal design
        ctx.fillStyle = '#4285F4';
        
        // Diamond shape
        ctx.beginPath();
        ctx.moveTo(center, center - 6*unit);
        ctx.lineTo(center + 4*unit, center);
        ctx.lineTo(center, center + 6*unit);
        ctx.lineTo(center - 4*unit, center);
        ctx.closePath();
        ctx.fill();
        
        // Inner diamond
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.moveTo(center, center - 3*unit);
        ctx.lineTo(center + 2*unit, center);
        ctx.lineTo(center, center + 3*unit);
        ctx.lineTo(center - 2*unit, center);
        ctx.closePath();
        ctx.fill();
    }

    drawGrok(ctx, center, unit) {
        // Dark, edgy design
        ctx.fillStyle = '#1DA1F2';
        this.drawPixelRect(ctx, center - 4*unit, center - 6*unit, 8*unit, 8*unit);
        
        // Spiky hair
        ctx.fillStyle = '#000000';
        this.drawPixelRect(ctx, center - 4*unit, center - 8*unit, unit, 2*unit);
        this.drawPixelRect(ctx, center - unit, center - 9*unit, unit, 3*unit);
        this.drawPixelRect(ctx, center + 2*unit, center - 8*unit, unit, 2*unit);
        
        // Evil eyes
        ctx.fillStyle = '#FF0000';
        this.drawPixelRect(ctx, center - 3*unit, center - 4*unit, 2*unit, 2*unit);
        this.drawPixelRect(ctx, center + unit, center - 4*unit, 2*unit, 2*unit);
    }

    drawLlama(ctx, center, unit) {
        // Llama-like design
        ctx.fillStyle = '#1877F2';
        
        // Head
        this.drawPixelRect(ctx, center - 3*unit, center - 5*unit, 6*unit, 6*unit);
        
        // Ears
        this.drawPixelRect(ctx, center - 4*unit, center - 6*unit, unit, 2*unit);
        this.drawPixelRect(ctx, center + 3*unit, center - 6*unit, unit, 2*unit);
        
        // Snout
        ctx.fillStyle = '#FFFFFF';
        this.drawPixelRect(ctx, center - 2*unit, center - unit, 4*unit, 3*unit);
        
        // Eyes
        ctx.fillStyle = '#000000';
        this.drawPixelRect(ctx, center - 2*unit, center - 3*unit, unit, unit);
        this.drawPixelRect(ctx, center + unit, center - 3*unit, unit, unit);
    }

    drawKimi(ctx, center, unit) {
        // Moon/celestial design
        ctx.fillStyle = '#FF69B4';
        
        // Circular base
        ctx.beginPath();
        ctx.arc(center, center, 5*unit, 0, 2*Math.PI);
        ctx.fill();
        
        // Crescent shape
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(center + unit, center, 4*unit, 0, 2*Math.PI);
        ctx.fill();
        
        // Stars around
        ctx.fillStyle = '#FFD700';
        this.drawPixelRect(ctx, center - 6*unit, center - 2*unit, unit, unit);
        this.drawPixelRect(ctx, center + 5*unit, center + unit, unit, unit);
        this.drawPixelRect(ctx, center, center - 7*unit, unit, unit);
    }

    drawMixtral(ctx, center, unit) {
        // Wind/tornado design
        ctx.fillStyle = '#FF7A00';
        
        // Spiral pattern
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const x = center + Math.cos(angle) * 3 * unit;
            const y = center + Math.sin(angle) * 3 * unit;
            this.drawPixelRect(ctx, x - unit/2, y - unit/2, unit, unit);
        }
        
        // Center
        ctx.fillStyle = '#FFFFFF';
        this.drawPixelRect(ctx, center - unit, center - unit, 2*unit, 2*unit);
    }

    drawPerplexity(ctx, center, unit) {
        // Search/magnifying glass design
        ctx.fillStyle = '#20B2AA';
        
        // Magnifying glass circle
        ctx.beginPath();
        ctx.arc(center - unit, center - unit, 3*unit, 0, 2*Math.PI);
        ctx.stroke();
        ctx.lineWidth = unit;
        
        // Handle
        ctx.beginPath();
        ctx.moveTo(center + 2*unit, center + 2*unit);
        ctx.lineTo(center + 4*unit, center + 4*unit);
        ctx.stroke();
        
        // Search beam
        ctx.fillStyle = '#FFD700';
        this.drawPixelRect(ctx, center + 3*unit, center - unit, unit, unit);
        this.drawPixelRect(ctx, center + 4*unit, center, unit, unit);
    }

    drawGeneric(ctx, center, unit, color) {
        ctx.fillStyle = color || '#666666';
        this.drawPixelRect(ctx, center - 4*unit, center - 4*unit, 8*unit, 8*unit);
        
        // Simple face
        ctx.fillStyle = '#FFFFFF';
        this.drawPixelRect(ctx, center - 2*unit, center - 2*unit, unit, unit);
        this.drawPixelRect(ctx, center + unit, center - 2*unit, unit, unit);
        
        ctx.fillStyle = '#000000';
        this.drawPixelRect(ctx, center - unit, center + unit, 2*unit, unit);
    }

    drawPixelRect(ctx, x, y, w, h) {
        ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));
    }

    // Create CSS sprite for use in HTML
    createCSSSprite(pokemon, size = 64) {
        const spriteURL = this.generateSprite(pokemon, size);
        return `background-image: url('${spriteURL}'); background-size: contain; background-repeat: no-repeat; background-position: center;`;
    }

    // Preload all sprites
    preloadSprites() {
        Object.values(LLM_POKEMON).forEach(pokemon => {
            this.generateSprite(pokemon, 64);
            this.generateSprite(pokemon, 128);
        });
    }
}

// Global sprite generator instance
window.spriteGenerator = new SpriteGenerator();

// Preload sprites when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.spriteGenerator.preloadSprites();
});
