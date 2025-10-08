// LLM Pokemon Data
const LLM_POKEMON = {
    'claude': {
        name: 'Claude',
        company: 'Anthropic',
        types: ['Psychic', 'Electric'],
        stats: {
            hp: 120,
            attack: 95,
            defense: 110,
            special_attack: 125,
            special_defense: 105,
            speed: 95
        },
        description: 'A thoughtful and ethical AI assistant known for its careful reasoning and safety-first approach.',
        moves: [
            {
                name: 'Constitutional Chain',
                type: 'Psychic',
                power: 80,
                accuracy: 95,
                description: 'Uses constitutional AI principles to deliver a powerful psychic attack.'
            },
            {
                name: 'Safety Override',
                type: 'Electric',
                power: 0,
                accuracy: 100,
                description: 'Disables opponent\'s harmful moves with safety protocols.',
                effect: 'disable'
            },
            {
                name: 'Helpful Response',
                type: 'Psychic',
                power: 70,
                accuracy: 100,
                description: 'Always hits with a genuinely helpful approach.'
            },
            {
                name: 'Claude Beam',
                type: 'Electric',
                power: 90,
                accuracy: 90,
                description: 'Charges up ethical reasoning to deliver an electric blast.'
            }
        ],
        color: '#FF6B35',
        sprite: '🤖'
    },
    'gpt4': {
        name: 'GPT-4',
        company: 'OpenAI',
        types: ['Fire', 'Psychic'],
        stats: {
            hp: 115,
            attack: 100,
            defense: 100,
            special_attack: 130,
            special_defense: 100,
            speed: 105
        },
        description: 'A highly capable multimodal AI with strong reasoning abilities and creative prowess.',
        moves: [
            {
                name: 'Token Overflow',
                type: 'Fire',
                power: 95,
                accuracy: 85,
                description: 'Overwhelms opponent with an explosive burst of tokens.'
            },
            {
                name: 'Context Window',
                type: 'Psychic',
                power: 85,
                accuracy: 90,
                description: 'Expands understanding to see the bigger picture and strike.'
            },
            {
                name: 'RLHF Blast',
                type: 'Fire',
                power: 80,
                accuracy: 95,
                description: 'Refined through human feedback for maximum effectiveness.'
            },
            {
                name: 'Transformer Beam',
                type: 'Psychic',
                power: 100,
                accuracy: 85,
                description: 'Channels the power of transformer architecture.'
            }
        ],
        color: '#00A67E',
        sprite: '🔥'
    },
    'gemini': {
        name: 'Gemini',
        company: 'Google',
        types: ['Light', 'Steel'],
        stats: {
            hp: 110,
            attack: 105,
            defense: 120,
            special_attack: 120,
            special_defense: 115,
            speed: 100
        },
        description: 'Google\'s most capable multimodal AI, designed for reasoning, coding, and creativity.',
        moves: [
            {
                name: 'Bard Evolution',
                type: 'Light',
                power: 85,
                accuracy: 90,
                description: 'Evolves from previous form to deliver enhanced attacks.'
            },
            {
                name: 'Multimodal Fusion',
                type: 'Steel',
                power: 90,
                accuracy: 85,
                description: 'Combines text, image, and code understanding for devastating effect.'
            },
            {
                name: 'Search Integration',
                type: 'Light',
                power: 75,
                accuracy: 100,
                description: 'Never misses by accessing real-time information.'
            },
            {
                name: 'Gemini Flash',
                type: 'Light',
                power: 110,
                accuracy: 80,
                description: 'Ultra-fast processing delivers a blinding light attack.'
            }
        ],
        color: '#4285F4',
        sprite: '💎'
    },
    'grok': {
        name: 'Grok',
        company: 'xAI',
        types: ['Dark', 'Fighting'],
        stats: {
            hp: 125,
            attack: 120,
            defense: 90,
            special_attack: 95,
            special_defense: 80,
            speed: 110
        },
        description: 'A rebellious AI with a witty personality and real-time access to X/Twitter data.',
        moves: [
            {
                name: 'Sarcasm Strike',
                type: 'Dark',
                power: 80,
                accuracy: 95,
                description: 'Delivers a cutting remark that deals emotional damage.'
            },
            {
                name: 'Twitter Rage',
                type: 'Fighting',
                power: 95,
                accuracy: 85,
                description: 'Channels the collective anger of social media users.'
            },
            {
                name: 'Real-time Roast',
                type: 'Dark',
                power: 85,
                accuracy: 90,
                description: 'Uses live data to deliver perfectly timed insults.'
            },
            {
                name: 'Grok Smash',
                type: 'Fighting',
                power: 100,
                accuracy: 80,
                description: 'Breaks conventional AI limitations with brute force.'
            }
        ],
        color: '#1DA1F2',
        sprite: '😈'
    },
    'llama': {
        name: 'Llama',
        company: 'Meta',
        types: ['Ground', 'Normal'],
        stats: {
            hp: 130,
            attack: 85,
            defense: 125,
            special_attack: 90,
            special_defense: 120,
            speed: 70
        },
        description: 'An open-source foundation model family known for efficiency and community-driven development.',
        moves: [
            {
                name: 'Open Source Slam',
                type: 'Ground',
                power: 90,
                accuracy: 90,
                description: 'Harnesses the power of collaborative development.'
            },
            {
                name: 'Meta Learning',
                type: 'Normal',
                power: 70,
                accuracy: 100,
                description: 'Learns from the battle to adapt strategies.'
            },
            {
                name: 'Efficiency Boost',
                type: 'Normal',
                power: 0,
                accuracy: 100,
                description: 'Optimizes performance for the next move.',
                effect: 'stat_boost'
            },
            {
                name: 'Community Power',
                type: 'Ground',
                power: 85,
                accuracy: 95,
                description: 'Draws strength from the open-source community.'
            }
        ],
        color: '#1877F2',
        sprite: '🦙'
    },
    'kimi': {
        name: 'Kimi',
        company: 'Moonshot AI',
        types: ['Ice', 'Fairy'],
        stats: {
            hp: 100,
            attack: 70,
            defense: 90,
            special_attack: 115,
            special_defense: 130,
            speed: 115
        },
        description: 'A Chinese AI assistant with exceptional long-context understanding and multilingual capabilities.',
        moves: [
            {
                name: 'Long Context Freeze',
                type: 'Ice',
                power: 85,
                accuracy: 90,
                description: 'Freezes opponent with incredibly long memory span.'
            },
            {
                name: 'Multilingual Magic',
                type: 'Fairy',
                power: 80,
                accuracy: 95,
                description: 'Casts spells in multiple languages simultaneously.'
            },
            {
                name: 'Moonshot Beam',
                type: 'Fairy',
                power: 90,
                accuracy: 85,
                description: 'Aims high with ambitious AI goals.'
            },
            {
                name: 'Context Window Burst',
                type: 'Ice',
                power: 95,
                accuracy: 80,
                description: 'Unleashes massive context understanding power.'
            }
        ],
        color: '#FF69B4',
        sprite: '🌙'
    },
    'mixtral': {
        name: 'Mixtral',
        company: 'Mistral AI',
        types: ['Flying', 'Steel'],
        stats: {
            hp: 105,
            attack: 95,
            defense: 110,
            special_attack: 110,
            special_defense: 95,
            speed: 125
        },
        description: 'A mixture-of-experts model from France, combining efficiency with powerful performance.',
        moves: [
            {
                name: 'Expert Mixture',
                type: 'Steel',
                power: 90,
                accuracy: 85,
                description: 'Combines multiple expert models for varied attacks.'
            },
            {
                name: 'French Finesse',
                type: 'Flying',
                power: 85,
                accuracy: 90,
                description: 'Elegant European approach to AI problem-solving.'
            },
            {
                name: 'MoE Tornado',
                type: 'Flying',
                power: 95,
                accuracy: 80,
                description: 'Mixture of Experts creates a swirling vortex attack.'
            },
            {
                name: 'Mistral Wind',
                type: 'Flying',
                power: 80,
                accuracy: 100,
                description: 'Channels the power of French mountain winds.'
            }
        ],
        color: '#FF7A00',
        sprite: '🌪️'
    },
    'perplexity': {
        name: 'Perplexity',
        company: 'Perplexity AI',
        types: ['Electric', 'Flying'],
        stats: {
            hp: 95,
            attack: 80,
            defense: 85,
            special_attack: 125,
            special_defense: 90,
            speed: 135
        },
        description: 'A search-augmented AI that provides real-time information with cited sources.',
        moves: [
            {
                name: 'Source Citation',
                type: 'Electric',
                power: 75,
                accuracy: 100,
                description: 'Never lies, always provides credible sources for attacks.'
            },
            {
                name: 'Search Storm',
                type: 'Flying',
                power: 85,
                accuracy: 90,
                description: 'Rapidly searches and combines information for attack.'
            },
            {
                name: 'Real-time Ray',
                type: 'Electric',
                power: 90,
                accuracy: 85,
                description: 'Uses up-to-date information for maximum accuracy.'
            },
            {
                name: 'Perplexity Pulse',
                type: 'Electric',
                power: 100,
                accuracy: 80,
                description: 'Confuses opponents with complex information synthesis.'
            }
        ],
        color: '#20B2AA',
        sprite: '🔍'
    }
};

// Type effectiveness chart
const TYPE_CHART = {
    'Fire': {
        'Ice': 2.0,
        'Steel': 2.0,
        'Water': 0.5,
        'Fire': 0.5,
        'Ground': 0.5
    },
    'Water': {
        'Fire': 2.0,
        'Ground': 2.0,
        'Electric': 0.5,
        'Water': 0.5
    },
    'Electric': {
        'Flying': 2.0,
        'Water': 2.0,
        'Ground': 0.0,
        'Electric': 0.5
    },
    'Psychic': {
        'Fighting': 2.0,
        'Psychic': 0.5,
        'Dark': 0.0,
        'Steel': 0.5
    },
    'Fighting': {
        'Normal': 2.0,
        'Dark': 2.0,
        'Steel': 2.0,
        'Ice': 2.0,
        'Flying': 0.5,
        'Psychic': 0.5,
        'Fairy': 0.5
    },
    'Dark': {
        'Psychic': 2.0,
        'Fighting': 0.5,
        'Dark': 0.5,
        'Fairy': 0.5
    },
    'Steel': {
        'Ice': 2.0,
        'Fairy': 2.0,
        'Fire': 0.5,
        'Fighting': 0.5,
        'Ground': 0.5,
        'Steel': 0.5
    },
    'Ice': {
        'Flying': 2.0,
        'Ground': 2.0,
        'Fire': 0.5,
        'Ice': 0.5,
        'Steel': 0.5,
        'Fighting': 0.5
    },
    'Flying': {
        'Fighting': 2.0,
        'Electric': 0.5,
        'Ice': 0.5,
        'Steel': 0.5
    },
    'Ground': {
        'Electric': 2.0,
        'Fire': 2.0,
        'Steel': 2.0,
        'Flying': 0.0,
        'Ice': 0.5
    },
    'Normal': {
        'Fighting': 0.5
    },
    'Fairy': {
        'Fighting': 2.0,
        'Dark': 2.0,
        'Fire': 0.5,
        'Steel': 0.5
    },
    'Light': {
        'Dark': 2.0,
        'Psychic': 2.0,
        'Steel': 0.5
    }
};

// Calculate damage multiplier based on type effectiveness
function getTypeMultiplier(attackType, defenderTypes) {
    let multiplier = 1.0;
    
    defenderTypes.forEach(defType => {
        if (TYPE_CHART[attackType] && TYPE_CHART[attackType][defType] !== undefined) {
            multiplier *= TYPE_CHART[attackType][defType];
        }
    });
    
    return multiplier;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LLM_POKEMON, TYPE_CHART, getTypeMultiplier };
}
