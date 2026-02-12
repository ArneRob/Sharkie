
let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    showMainMenue()
    window.addEventListener("keydown", checkIfRIghtKey)
}

function startGame() {
    canvasOn()
    startMenueOff()
    getSettingIconsInGame()
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
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

function getSettingIconsInGame() {
    let fullScreen = document.getElementById('fullScreen')
    let settingsDiv = document.getElementById('settingsDiv')
    settingsDiv.remove()
    fullScreen.innerHTML += getSettingIconsTemplate()
    checkLocalStorageSettings()
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
    if (!getLocalStorageItem("mute")) {
        muteSoundIcons()
        setItemToLocalStorage("mute")
    } else {
        unMuteSoundIcons()
        removeItemFromLocalStorage("mute")
    }
}

function unMuteSoundIcons() {
    let muteSoundIcon = document.getElementById('muteSoundIcon')
    muteSoundIcon.classList.add('d_none')
    let soundIcon = document.getElementById('soundIcon')
    soundIcon.classList.remove('d_none')
}

function muteSoundIcons() {
    let muteSoundIcon = document.getElementById('muteSoundIcon')
    muteSoundIcon.classList.remove('d_none')
    let soundIcon = document.getElementById('soundIcon')
    soundIcon.classList.add('d_none')
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
    let fullScreenIcon = document.getElementById('fullScreenIcon')
    fullScreenIcon.addEventListener("click", getFullScreen)
}

function showIngameSettingMenue() {
    let splashScreen = document.getElementById('splashScreen')
    openCloseGameMenue()
    splashScreen.innerHTML = "";
    splashScreen.innerHTML += getIngameSettingMenueTemplate();
    let instructionsContainer = document.getElementById('instructionsContainer')
    instructionsContainer.classList.toggle('mb-top-50')
    checkLocalStorageSettings()
    let fullScreenIcon = document.getElementById('fullScreenIcon')
    fullScreenIcon.addEventListener("click", getFullScreen)
}

function openCloseGameMenue() {
    let splashScreen = document.getElementById('splashScreen')
    splashScreen.classList.toggle('d_none')
    let canvas = document.getElementById('canvas')
    canvas.classList.toggle('d_none')
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
        muteSoundIcons()
    }
}

function getFullScreen() {
    let fullScreen = document.getElementById('fullScreen')
    enterFullscreen(fullScreen)
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
    let fullScreenIcon = document.getElementById('fullScreenIcon')
    fullScreenIcon.addEventListener("click", exitFullscreen)
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    let fullScreenIcon = document.getElementById('fullScreenIcon')
    fullScreenIcon.addEventListener("click", exitFullscreen)
}

function getGameOverScreen() {
    let endScreen = document.getElementById('endScreen')
    endScreen.classList.remove('d_none')
    endScreen.style.backgroundImage = "url('img/6.Botones/Tittles/Game Over/Recurso 10.png')";
    endScreen.innerHTML += getRestartIconsTemplate()
}

function getGameWonScreen() {
    let endScreen = document.getElementById('endScreen')
    endScreen.classList.remove('d_none')
    endScreen.innerHTML += getRestartIconsTemplate()
}

function gameOverScreenOff() {
    let endScreen = document.getElementById('endScreen')
    endScreen.classList.add('d_none')
    endScreen.innerHTML = ""
}

function restartGame() {
    resetGame()
    gameOverScreenOff()
    canvasOn()
}

function resetGame() {
    resetMovableVar()
    // resetCharacterVar()
    // resetWorldVar()
    world = "";
    canvas = ""
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function resetMovableVar() {
     world.character.energy = 100;
     world.character.endbossEnergy = 100;
     world.endboss[0].endbossEnergy = 100
}

function resetWorldVar() {
    world.coin = level1.coin;
    world.poisenBottle = level1.poisenBottle
    world.level = level1;
    world.enemies = level1.enemies;
    world.endboss = level1.endboss;
    world.backgroundObjects = level1.backgroundObjects;
    world.light = level1.light;
    world.canvas;
    world.ctx;
    world.keyboard;
    world.camera_x = 0;
    world.throwableObjects = []
    world.coinSound = '../audio/coinSound.mp3'
    world.poisenBottleSound = '../audio/poisenBottleSound.mp3'
    world.bubble
    world.intervalIds = []
    world.gameOver = false;
    world.endScreenShownTwoSeconds = false;
    world.resetGameIsSet = false;
}

function resetCharacterVar() {
    world.character.world;
    world.character.lastSlap = 0;
    world.character.idleTimer = 0;
    world.character.IdleCounter = 0;
    world.character.idleSleep;
    world.character.slapCounter = 0;
    world.character.stayAndSlap = false;
    world.character.swimAndSlap = false;
    world.character.characterAnimationInterval = false;
    world.character.keyListenerInterval = false;
}