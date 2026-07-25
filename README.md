# ⚡ CyberSiege: C++ Anti-Robot Command

[![C++ Curriculum](https://img.shields.io/badge/C%2B%2B-Basics%20to%20Modern%20C%2B%2B20-blue?style=for-the-badge&logo=cplusplus)](https://github.com/Tormento416/Cyberseige-C)
[![React 18](https://img.shields.io/badge/Frontend-React%2018%20%2B%20TypeScript-cyan?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Build%20Tool-Vite%205-purple?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Styling-Tailwind%20v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

An interactive, gamified C++ learning web application where you master C++ fundamentals, memory management, OOP, the STL, and modern C++20 paradigms while building anti-robot defense weapons to save humanity from an invading AI overlord!

---

## 🎯 Core Learning Path & Curriculum

The game features **5 Core Educational Modules** plus **1 Real-World Tool Generator Mission**:

### 1. Signal & Control (Basics & Control Flow)
- **Topics**: Primitive types (`int`, `double`, `char`, `bool`), `sizeof()` memory boundaries & limits, `if`/`else`, `switch`, `for`/`while` loops, functions, pass-by-value vs. pass-by-reference (`&`).
- **Weapon Built**: `EMP Overdrive Cannon`
- **Victory Cutscene**: High-voltage electromagnetic shockwave frying drone CPU circuits.

### 2. Memory Matrix (Pointers & Memory Management)
- **Topics**: Pointer addresses (`&`) & dereferencing (`*`), Stack memory vs. Heap dynamic allocation (`new`/`delete`), RAII principles, Smart Pointers (`std::unique_ptr`, `std::shared_ptr`).
- **Weapon Built**: `Quantum RAM Barrier`
- **Victory Cutscene**: Plasma forcefield absorbing heavy kinetic mortar rounds.

### 3. Mech Factory (Object-Oriented Programming)
- **Topics**: Classes & Objects, Encapsulation (`private`/`public`), Abstraction, Inheritance (`: public`), Polymorphism & `virtual` functions, Virtual Function Tables (Vptr/VTable cost formula), Special Member Functions, Rule of Three / Rule of Five.
- **Weapon Built**: `VTable Exo-Mech`
- **Victory Cutscene**: Dual-plasma mech salvo destroying enemy armor divisions.

### 4. Tactical Grid (Standard Template Library - STL)
- **Topics**: STL Containers (`std::vector`, `std::array`, `std::map`, `std::set`), uniform Iterator traversal (`begin()`, `end()`), Algorithms (`std::sort`, `std::find`, `std::transform`), Lambdas & custom comparators.
- **Weapon Built**: `Swarm Vector Radar`
- **Victory Cutscene**: Automated vector radar locking onto and wiping out 10,000 enemy signals.

### 5. Quantum Core (Advanced & Modern Paradigms)
- **Topics**: Generic Templates (`template <typename T>`), Move Semantics (`&&`, `std::move`), `constexpr`/`consteval` compile-time evaluation, C++20 Concepts (`requires` clause).
- **Weapon Built**: `Singularity Quantum Beam`
- **Victory Cutscene**: Radiant golden zero-overhead quantum beam annihilating Omega-Zero's vanguard titan.

### 6. Final Mission: Resistance Cyber-Scanner Studio (Real C++ Tool)
- **Objective**: Combine all learned C++ concepts to configure and compile a real, standalone C++ application (`cyber_scanner.cpp`) that scans local Wi-Fi networks and Bluetooth LE signals!
- **Features**: Customizable target subnets, port lists, BLE scan toggle, output format selection (JSON/Console), full copy/download capabilities, and CMake/WinSock build guides.

---

## 🎮 Key Features

- **Lively Resistance Characters**: Features **Commander Sarah Vance**, **Jax "Byte" Miller**, **E.V.A.** (Tactical AI Companion), and **Omega-Zero** (AI Overlord) with animated SVG avatars and speech audio blips.
- **Interactive RAM Inspector**: Live visual Stack Memory vs Heap Allocations layout renderer showing byte sizes, pointer references, smart pointer ownership, and leak warnings.
- **Real-Time 2D Battle Grid**: HTML5 Canvas 2D defense battlefield where unlocked towers auto-engage invading robot waves with glowing laser particle beams.
- **Web Audio API Synthesizer**: Custom retro-futuristic sound effects for lasers, EMP shockwaves, text dialogue typing blips, and epic victory fanfares.
- **Navigation & Preferences**: Dedicated `< Return Home` button linking to `https://tormento-learning-games.vercel.app/` and audio mute toggles.

---

## 🛠️ Technology Stack

- **Core**: React 18, TypeScript 5, HTML5 Canvas 2D, Web Audio API
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS v4, Custom Cyberpunk Glassmorphism Shaders
- **Icons**: Lucide React Icons

---

## 🚀 Quick Start

### Prerequisites
- Node.js `v18+` or `v20+`
- npm `v9+` or `v10+`

### Installation & Running Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Tormento416/Cyberseige-C.git
   cd Cyberseige-C
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📂 Project Directory Structure

```
Cyberseige-C/
├── index.html                  # HTML5 entry point with Google Cyberpunk fonts
├── package.json                # Project dependencies & scripts
├── vite.config.ts              # Vite bundler configuration
├── tsconfig.json               # TypeScript compiler rules
├── src/
│   ├── main.tsx                # React DOM root render
│   ├── App.tsx                 # Core application state coordinator
│   ├── index.css               # Tailwind CSS v4 & custom glassmorphism styles
│   ├── components/
│   │   ├── Navbar.tsx          # Top header with Return Home link & progress
│   │   ├── BattleCanvas.tsx    # Real-time 2D animated combat canvas
│   │   ├── CharacterDialogue.tsx # Speech bubble dialogue with audio blips
│   │   ├── CodeEditor.tsx      # C++ code editor workspace & diagnostic runner
│   │   ├── MemoryVisualizer.tsx # Live Stack vs Heap RAM inspector
│   │   ├── VictoryCutscene.tsx # End-of-module weapon test animation modal
│   │   ├── ConceptGuide.tsx    # C++ formula & time complexity cheat-sheet drawer
│   │   └── FinalToolBuilder.tsx# Mission 6 C++ scanner generator studio
│   ├── data/
│   │   ├── modules.ts          # C++ curriculum modules dataset
│   │   ├── characters.ts       # Resistance character avatars & roles
│   │   └── scannerCodeTemplate.ts # Real C++ Network & Bluetooth scanner code template
│   └── utils/
│       ├── audio.ts            # Web Audio API synthesizer for SFX
│       └── cppInterpreter.ts   # C++ code evaluator & RAM state simulator
└── README.md
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Crafted for humanity's victory against the robot army ⚡
</p>
