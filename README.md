# 🎮 LLM Pokemon Battle Game

A pixel art Pokemon battle parody featuring major Large Language Models (LLMs) as Pokemon characters. Battle your favorite AI assistants in this retro 8-bit style game!

![LLM Pokemon Battle](https://img.shields.io/badge/Game-LLM%20Pokemon%20Battle-blue)
![Status](https://img.shields.io/badge/Status-Live-green)
![Tech](https://img.shields.io/badge/Tech-HTML%2FCSS%2FJS-orange)

## 🎯 Live Game

**Play Now**: [https://llm-pokemon-frontend-morphvm-hs15sefg.http.cloud.morph.so](https://llm-pokemon-frontend-morphvm-hs15sefg.http.cloud.morph.so)

## 🤖 Featured LLM Pokemon

| Pokemon | Company | Types | Signature Move |
|---------|---------|-------|----------------|
| 🤖 **Claude** | Anthropic | Psychic/Electric | Constitutional Chain |
| 🔥 **GPT-4** | OpenAI | Fire/Psychic | Token Overflow |
| 💎 **Gemini** | Google | Light/Steel | Multimodal Fusion |
| 😈 **Grok** | xAI | Dark/Fighting | Sarcasm Strike |
| 🦙 **Llama** | Meta | Ground/Normal | Open Source Slam |
| 🌙 **Kimi** | Moonshot AI | Ice/Fairy | Long Context Freeze |
| 🌪️ **Mixtral** | Mistral AI | Flying/Steel | Expert Mixture |
| 🔍 **Perplexity** | Perplexity AI | Electric/Flying | Source Citation |

## ✨ Features

### 🎮 **Complete Battle System**
- Turn-based combat with strategic move selection
- Type effectiveness system with 12 different types
- Damage calculation with randomness and balancing
- 4 unique signature moves per Pokemon
- HP bars, battle log, and victory conditions

### 🎨 **8-bit Pixel Art Aesthetics**
- Authentic retro styling with pixelated graphics
- Custom CSS animations and sprite effects
- Gradient backgrounds and floating animations
- Press Start 2P font for authentic arcade feel
- Responsive design for all devices

### 🎵 **Chiptune Audio System**
- Web Audio API-based 8-bit sound generation
- Battle music with square wave synthesis
- Sound effects for moves, damage, victory, defeat
- Authentic retro audio experience

### 🔧 **Technical Excellence**
- Modular JavaScript architecture
- Complete type effectiveness system
- API integration with fallback data
- Professional game state management
- Cross-browser compatibility

## 🏗️ Project Structure

```
llm-pokemon-battle/
├── frontend/                 # Game frontend
│   ├── index.html           # Main game HTML
│   ├── styles/
│   │   └── main.css         # 8-bit pixel art styling
│   ├── js/
│   │   ├── main.js          # Main game logic
│   │   ├── pokemon-data.js  # Pokemon stats and moves
│   │   ├── battle.js        # Battle system
│   │   ├── audio.js         # 8-bit audio system
│   │   ├── sprites.js       # Sprite generation
│   │   └── api.js           # API client
│   ├── sprites/             # Sprite assets
│   └── audio/               # Audio files
├── backend/                  # FastAPI backend
│   ├── main_simple.py       # API server
│   ├── models/              # Data models
│   └── venv/                # Python environment
├── docs/                     # Documentation
│   └── ARCHITECTURE.md      # Technical architecture
└── database/                 # Database files
```

## 🚀 How to Play

1. **🎯 Select Your Pokemon**: Choose from 8 different LLM Pokemon, each with unique stats and abilities
2. **⚔️ Enter Battle**: The system will randomly select an opponent for you
3. **🎮 Choose Moves**: Select from 4 signature moves, each with different power and accuracy
4. **📊 Watch the Battle**: See type effectiveness in action with damage calculations
5. **🏆 Victory**: Defeat your opponent or try again with a different Pokemon!

## 🎨 Pokemon Types & Effectiveness

The game features a complete type system with 12 different types:

- **Fire** 🔥 - Strong against Ice, Steel
- **Water** 💧 - Strong against Fire, Ground  
- **Electric** ⚡ - Strong against Flying, Water
- **Psychic** 🧠 - Strong against Fighting
- **Fighting** 👊 - Strong against Normal, Dark, Steel
- **Dark** 🌑 - Strong against Psychic
- **Steel** 🔩 - Strong against Ice, Fairy
- **Ice** ❄️ - Strong against Flying, Ground
- **Flying** 🌪️ - Strong against Fighting
- **Ground** 🌍 - Strong against Electric, Fire, Steel
- **Normal** ⚪ - Balanced type
- **Fairy** 🧚 - Strong against Fighting, Dark
- **Light** ✨ - Strong against Dark, Psychic

## 💻 Development

### Backend (FastAPI)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install fastapi uvicorn
uvicorn main_simple:app --host 0.0.0.0 --port 8000
```

### Frontend (HTTP Server)
```bash
cd frontend
python -m http.server 3000
```

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Python, FastAPI
- **Audio**: Web Audio API with custom chiptune generation
- **Styling**: Custom pixel art CSS with animations
- **Architecture**: Modular JavaScript with separation of concerns

## 🎵 Audio Features

The game includes a custom 8-bit audio system:
- **Square wave synthesis** for authentic retro sound
- **Background battle music** with looping melodies
- **Sound effects** for moves, damage, and victory
- **Volume control** and audio enable/disable

## 🤝 Contributing

This is a fun parody project! Feel free to:
- Add new LLM Pokemon characters
- Create new moves and abilities
- Improve the pixel art and animations
- Add more battle mechanics
- Enhance the audio system

## 📱 Responsive Design

The game works perfectly on:
- 🖥️ Desktop computers
- 📱 Mobile phones
- 📟 Tablets
- 🕹️ Any device with a web browser

## 🎭 About This Project

This game is a lighthearted parody celebrating the diverse world of AI language models. Each Pokemon is designed to reflect the unique characteristics and capabilities of their real-world AI counterparts, from Claude's safety-first approach to Grok's rebellious personality.

## 📄 License

This project is for educational and entertainment purposes. All LLM names and characteristics are used in a parody context to celebrate the AI community.

---

**Made with ❤️ for the AI community**

*Battle on, trainers!* 🎮✨
