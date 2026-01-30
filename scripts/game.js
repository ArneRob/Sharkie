
let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    showMainMenue()
    checkLocalStorageSettings()
    window.addEventListener("keydown", checkIfRIghtKey)
}

function startGame() {
    canvasOn()
    startMenueOff()
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log(`My Character is`, world.character)
    console.log(`My Enemie is`, world.enemies)
}

window.addEventListener('keydown', (event) => {
    if (event.which == 87 || event.which == 38) {
        keyboard.UP = true
    }
    if (event.which == 83 || event.which == 40) {
        keyboard.DOWN = true
    }
    if (event.which == 65 || event.which == 37) {
        keyboard.LEFT = true
    }
    if (event.which == 68 || event.which == 39) {
        keyboard.RIGHT = true
    }
    if (event.which == 32) {
        keyboard.SPACE = true
    }
    if (event.which == 70) {
        keyboard.F = true
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
    if (event.which == 32) {
        keyboard.SPACE = false
    }
    if (event.which == 70) {
        keyboard.F = false;
    }
});

function checkIfRIghtKey(event) {
    if (event.which == 32 && canvas == undefined) {
        startGame()
    }
}

function canvasOn() {
    let canvas = document.getElementById('canvas')
    canvas.classList.remove('d_none')
}

function startMenueOff() {
    let startMenue = document.getElementById('splashScreen')
    startMenue.classList.add('d_none')
}

function soundIconSwitch() {
    toggleSoundIcons()
    toggleMuteValueLocalStorage()
}

function toggleSoundIcons() {
    muteSoundIcon = document.getElementById('muteSoundIcon')
    muteSoundIcon.classList.toggle('d_none')
    soundIcon = document.getElementById('soundIcon')
    soundIcon.classList.toggle('d_none')
}

function showMainMenue() {
    let splashScreen = document.getElementById('splashScreen')
    splashScreen.innerHTML = "";
    splashScreen.innerHTML += getMainMenueTemplate()
    checkLocalStorageSettings()
}

function showSettingMenue() {

    let splashScreen = document.getElementById('splashScreen')
    splashScreen.innerHTML = "";
    splashScreen.innerHTML += getSettingMenueTemplate();
    checkLocalStorageSettings()
}

function getFullScreen() {
    let canvas = document.getElementById('canvas')
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function getLocalStorageItem(key) {
    let x = localStorage.getItem(`${key}`);
    return x
}

function setItemToLocalStorage(key, value) {
    localStorage.setItem(`${key}`, `${value}`);
}

function removeItemFromLocalStorage(key) {
    localStorage.removeItem(`${key}`);
}

function checkLocalStorageSettings() {
    if (getLocalStorageItem("mute")) {
        toggleSoundIcons()
    }
}

function toggleMuteValueLocalStorage() {
    if (getLocalStorageItem("mute")) {
        removeItemFromLocalStorage("mute")
    } else {
        setItemToLocalStorage("mute",)
    }
}