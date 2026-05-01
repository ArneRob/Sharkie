# Sharkie

A 2D underwater action game built with vanilla JavaScript and the HTML5 Canvas API.

## Gameplay

You control Sharkie, an underwater shark navigating through ocean levels. Collect coins and poison bottles, defeat jellyfish enemies, and face a final boss to win.

- **Slap** nearby enemies with `Space`
- **Throw** poison bubbles with `F`
- **Move** with Arrow keys or WASD
- **Collect** coins and poison bottles by swimming over them
- **Survive** until the end boss is defeated

## Features

- Smooth parallax scrolling background with multiple depth layers
- Animated character states: swimming, idle, sleep, slap, hurt, dead
- Two enemy types (jellyfish + flashing variant) plus a multi-phase end boss
- Health, coin, and poison-bottle status bars
- Sound effects and looping background audio with mute toggle (persisted via LocalStorage)
- Touch controls for mobile devices
- Win / game-over screens with restart option

## Tech Stack

- Vanilla JavaScript (ES6+ classes, OOP inheritance)
- HTML5 Canvas 2D
- CSS3 (responsive layout + media queries)
- HTML5 Audio API
- Browser LocalStorage

## Project Structure

```
/models       — Game classes (character, enemies, world, collectibles, UI bars)
/levels       — Level definitions (enemies, layout, backgrounds)
/scripts      — Entry logic, image paths, menu templates
/img          — Sprite sheets organized by character/enemy/background/UI
/audio        — Sound effects and background music
index.html    — Entry point
game.js       — Initialization and global helpers
```

## Getting Started

No build step required. Open `index.html` in any modern browser or serve the folder with a local HTTP server:

```bash
npx serve .
# then open http://localhost:3000
```

## Controls

| Action         | Keyboard          | Mobile            |
|----------------|-------------------|-------------------|
| Move           | Arrow keys / WASD | On-screen buttons |
| Slap attack    | Space             | Slap button       |
| Throw bubble   | F                 | Throw button      |
| Start / Restart | Space / Click    | Tap               |

## License

This project is for educational purposes.
