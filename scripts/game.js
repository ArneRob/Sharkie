
let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    showMainMenue()
    localStorage.removeItem("fullScreen")
    window.addEventListener("keydown", checkIfRIghtKey)
}

function startGame() {
    canvasOn()
    startMenueOff()
    getSettingIconsInGame()
    canvas = document.getElementById('canvas');
    initLevel1()
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
    if (getLocalStorageItem("fullScreen")) {
        fullScreenIcon.addEventListener("click", exitFullscreen)
    } else {
        fullScreenIcon.addEventListener("click", getFullScreen)
    }
}

function openCloseGameMenue() {
    let splashScreen = document.getElementById('splashScreen')
    splashScreen.classList.toggle('d_none')
    let canvas = document.getElementById('canvas')
    canvas.classList.toggle('d_none')
}

function showSecondHomeMenue() {
    let homeIcon = document.getElementById('homeIcon')
    homeIcon.classList.add('d_none')
    let endScreen = document.getElementById('endScreen')
    endScreen.style.backgroundImage = "url('./img/3.Background/Mesa de trabajo 1.png')";
    endScreen.innerHTML = "";
    endScreen.innerHTML += getSecondMainMenueTemplate()

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
    } setItemToLocalStorage("fullScreen")
    let fullScreenIcon = document.getElementById('fullScreenIcon')
    fullScreenIcon.addEventListener("click", exitFullscreen)
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } removeItemFromLocalStorage("fullScreen")
    let fullScreenIcon = document.getElementById('fullScreenIcon')
    fullScreenIcon.addEventListener("click", exitFullscreen)
}

function getGameOverScreen() {
    let homeIcon = document.getElementById('homeIcon')
    homeIcon.classList.remove('d_none')
    let endScreen = document.getElementById('endScreen')
    endScreen.classList.remove('d_none')
    endScreen.style.backgroundImage = "url('img/6.Botones/Tittles/Game Over/Recurso 10.png')";
    endScreen.innerHTML += getRestartIconsTemplate()
}

function getGameWonScreen() {
    let homeIcon = document.getElementById('homeIcon')
    homeIcon.classList.remove('d_none')
    let endScreen = document.getElementById('endScreen')
    endScreen.classList.remove('d_none')
    endScreen.style.backgroundImage = "url('./img/6.Botones/Try again/Mesa de trabajo 1.png')";
    endScreen.innerHTML += getRestartIconsTemplate()
}

function gameOverScreenOff() {
    let endScreen = document.getElementById('endScreen')
    endScreen.classList.add('d_none')
    endScreen.innerHTML = ""
}

function restartGame() {
    resetGameVar()
    gameOverScreenOff()
    canvasOn()
    console.log("reset");
}

function resetGameVar() {
    let homeIcon = document.getElementById('homeIcon')
    homeIcon.classList.add('d_none')
    world.character.energy = 100
    world.endboss[0].endbossEnergy = 100
    resetObjects()
    initLevel1()
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard)
}

function restartTheGameEventlistener() {
    let splashScreenStartButton = document.getElementById('splashScreenStartButton')
    splashScreenStartButton.addEventListener('click', world.restartWithMouseClick);
}