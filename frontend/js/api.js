// API Client for LLM Pokemon Battle
class APIClient {
    constructor() {
        this.baseURL = 'https://llm-pokemon-api-morphvm-hs15sefg.http.cloud.morph.so';
        this.fallbackMode = false;
    }

    async fetchPokemon() {
        try {
            const response = await fetch(`${this.baseURL}/pokemon`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.warn('API fetch failed, using fallback data:', error);
            this.fallbackMode = true;
            return this.getFallbackData();
        }
    }

    async fetchPokemonByName(name) {
        try {
            const response = await fetch(`${this.baseURL}/pokemon/${encodeURIComponent(name)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.warn('API fetch failed, using fallback data:', error);
            this.fallbackMode = true;
            return LLM_POKEMON[name.toLowerCase()] || null;
        }
    }

    async checkHealth() {
        try {
            const response = await fetch(`${this.baseURL}/health`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.warn('Health check failed:', error);
            return { status: 'offline', fallback: true };
        }
    }

    getFallbackData() {
        // Convert LLM_POKEMON data to API format
        const pokemonArray = Object.keys(LLM_POKEMON).map(key => ({
            id: key,
            ...LLM_POKEMON[key]
        }));
        
        return {
            pokemon: pokemonArray,
            total: pokemonArray.length,
            source: 'fallback'
        };
    }

    // Utility method to sync frontend data with backend if needed
    async syncPokemonData() {
        try {
            const response = await this.checkHealth();
            if (response.status === 'ok') {
                console.log('API is healthy, syncing data...');
                const apiData = await this.fetchPokemon();
                
                // Merge API data with frontend data if they differ
                if (apiData.pokemon) {
                    console.log(`Loaded ${apiData.pokemon.length} Pokemon from API`);
                }
            } else {
                console.log('API is offline, using local data');
            }
        } catch (error) {
            console.warn('Sync failed:', error);
        }
    }
}

// Global API client instance
window.apiClient = new APIClient();
