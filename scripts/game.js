
let canvas;
let world;
let keyboard = new Keyboard();
let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

function init() {
    showMainMenue()
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
    if (event.which === 32 && event.target === document.body) {
        event.preventDefault();
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
    let canvasDiv = document.getElementById('canvasDiv')
    let settingsDiv = document.getElementById('settingsDiv')
    settingsDiv.remove()
    canvasDiv.innerHTML += getSettingIconsTemplate()
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
}

function showIngameSettingMenue() {
    let splashScreen = document.getElementById('splashScreen')
    openCloseGameMenue()
    splashScreen.innerHTML = "";
    splashScreen.innerHTML += getIngameSettingMenueTemplate();
    let instructionsContainer = document.getElementById('instructionsContainer')
    instructionsContainer.classList.toggle('mb-top-50')
    checkLocalStorageSettings()
}

function openCloseGameMenue() {
    let splashScreen = document.getElementById('splashScreen')
    splashScreen.classList.toggle('d_none')
}

function showSecondHomeMenue() {
    world.intervalIds.forEach(clearInterval)
    world.gameOver = true;
    let homeIcon = document.getElementById('homeIcon')
    homeIcon.classList.add('d_none')
    removeD_None('gearIcon')
    let endScreen = document.getElementById('endScreen')
    endScreen.classList.remove('d_none')
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

function removeD_None(elementName) {
    let element = document.getElementById(`${elementName}`)
    element.classList.remove('d_none')
}
function addD_None(elementName) {
    let element = document.getElementById(`${elementName}`)
    element.classList.add('d_none')
}

function getGameOverScreen() {
    // addD_None("canvas")
    let homeIcon = document.getElementById('homeIcon')
    homeIcon.classList.remove('d_none')
    let endScreen = document.getElementById('endScreen')
    endScreen.classList.remove('d_none')
    endScreen.style.backgroundImage = "url('img/6.Botones/Tittles/Game Over/Recurso 10.png')";
    endScreen.innerHTML += getRestartIconsTemplate()
}

function getGameWonScreen() {
    // addD_None("canvas")
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

function showImpressum(elementName) {
    let screen = document.getElementById(`${elementName}`)
    screen.innerHTML = "";
    screen.innerHTML += getImpressumTemplate()
    let impressumSection = document.getElementById('impressumSection')

    if ("endScreen" == elementName) {
        removeD_None("homeIcon")
        addD_None('gearIcon')
    } else {
        impressumSection.innerHTML += getSettingIconsImpressumTemplate()
    }
    checkLocalStorageSettings()
}

function hideSplashScreen() {
    let splashScreen = document.getElementById('splashScreen')
    splashScreen.classList.add('d_none')
}

function showSplashScreen() {
    let splashScreen = document.getElementById('splashScreen')
    splashScreen.classList.remove('d_none')
}