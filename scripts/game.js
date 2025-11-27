
let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log(`My Character is`, world.character)
    console.log(`My Enemie is`, world.enemies)
}

window.addEventListener('keydown', (event) => {
    if (event.which == 87 || event.which == 38) {
        console.log("up");
        keyboard.UP = true
    }
    if (event.which == 83 || event.which == 40) {
        console.log("down");
        keyboard.DOWN = true
    }
    if (event.which == 65 || event.which == 37) {
        console.log("left");
        keyboard.LEFT = true
    }
    if (event.which == 68 || event.which == 39) {
        console.log("right");
        keyboard.RIGHT = true
    }
});

window.addEventListener('keyup', (event) => {
    if (event.which == 87 || event.which == 38) {
        keyboard.UP = false
    }
    if (event.which == 83 || event.which == 40) {
        keyboard.DOWN = false
    }
    if (event.which == 65 || event.which == 37) {
        keyboard.LEFT = false
    }
    if (event.which == 68 || event.which == 39) {
        keyboard.RIGHT = false
    }
});