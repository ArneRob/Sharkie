let canvas;
let world;
let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

/**
 * Initializes the game and registers global event listeners.
 */
function init() {
    showMainMenue()
    window.addEventListener("keydown", checkIfRIghtKey)
    preventTouchContextMenu()
}

/**
 * Prevents the context menu from opening via right-click or touch.
 */
function preventTouchContextMenu() {
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    }, false);
}

/**
 * Starts the game and initializes world and level.
 */
function startGame() {
    canvasOn()
    startMenueOff()
    getSettingIconsInGame()
    canvas = document.getElementById('canvas');
    initLevel1()
    world = new World(canvas);
}

/**
 * Checks if the correct key (spacebar) was pressed to start the game.
 * @param {KeyboardEvent} event
 */
function checkIfRIghtKey(event) {
    if (event.which == 32 && canvas == undefined) {
        startGame()
    }
}

/**
 * Loads the settings icons during the game.
 */
function getSettingIconsInGame() {
    let canvasDiv = document.getElementById('canvasDiv')
    let settingsDiv = document.getElementById('settingsDiv')
    settingsDiv.remove()
    canvasDiv.innerHTML += getSettingIconsTemplate()
    checkLocalStorageSettings()
}

/**
 * Makes the canvas visible.
 */
function canvasOn() {
    let canvas = document.getElementById('canvas')
    canvas.classList.remove('d_none')
}

/**
 * Hides the start menu.
 */
function startMenueOff() {
    let startMenue = document.getElementById('splashScreen')
    startMenue.classList.add('d_none')
}

/**
 * Toggles between mute and unmute sound modes.
 */
function soundIconSwitch() {
    if (!getLocalStorageItem("mute")) {
        muteSoundIcons()
        setItemToLocalStorage("mute")
    } else {
        unMuteSoundIcons()
        removeItemFromLocalStorage("mute")
    }
}

/**
 * Shows the sound icon and hides the mute icon.
 */
function unMuteSoundIcons() {
    let muteSoundIcon = document.getElementById('muteSoundIcon')
    muteSoundIcon.classList.add('d_none')
    let soundIcon = document.getElementById('soundIcon')
    soundIcon.classList.remove('d_none')
}

/**
 * Shows the mute icon and hides the sound icon.
 */
function muteSoundIcons() {
    let muteSoundIcon = document.getElementById('muteSoundIcon')
    muteSoundIcon.classList.remove('d_none')
    let soundIcon = document.getElementById('soundIcon')
    soundIcon.classList.add('d_none')
}

/**
 * Displays the main menu.
 */
function showMainMenue() {
    let splashScreen = document.getElementById('splashScreen')
    splashScreen.innerHTML = "";
    splashScreen.innerHTML += getMainMenueTemplate()
    checkLocalStorageSettings()
}

/**
 * Displays the settings menu.
 */
function showSettingMenue() {
    let splashScreen = document.getElementById('splashScreen')
    splashScreen.innerHTML = "";
    splashScreen.innerHTML += getSettingMenueTemplate();
    checkLocalStorageSettings()
}

/**
 * Displays the in-game settings menu.
 */
function showIngameSettingMenue() {
    let splashScreen = document.getElementById('splashScreen')
    openCloseGameMenue()
    splashScreen.innerHTML = "";
    splashScreen.innerHTML += getIngameSettingMenueTemplate();
    let instructionsContainer = document.getElementById('instructionsContainer')
    instructionsContainer.classList.toggle('mb-top-50')
    checkLocalStorageSettings()
}

/**
 * Toggles the visibility of the game menu.
 */
function openCloseGameMenue() {
    let splashScreen = document.getElementById('splashScreen')
    splashScreen.classList.toggle('d_none')
}

/**
 * Displays the second home menu after two seconds on game end.
 */
function showSecondHomeMenue() {
    world.endScreenShownTwoSeconds = true;
    world.intervalIds.forEach(clearInterval)
    world.gameOver = true;
    let homeIcon = document.getElementById('homeIcon')
    homeIcon.classList.add('d_none')
    removeD_None('gearIcon')
    addD_None('splashScreen')
    let endScreen = document.getElementById('endScreen')
    endScreen.classList.remove('d_none')
    endScreen.style.backgroundImage = "url('./img/3.Background/Mesa de trabajo 1.png')";
    endScreen.innerHTML = "";
    endScreen.innerHTML += getSecondMainMenueTemplate()
}

/**
 * Retrieves a value from localStorage.
 * @param {string} key
 * @returns {string|null}
 */
function getLocalStorageItem(key) {
    let x = localStorage.getItem(`${key}`);
    return x
}

/**
 * Stores a value in localStorage.
 * @param {string} key
 * @param {string} value
 */
function setItemToLocalStorage(key, value) {
    localStorage.setItem(`${key}`, `${value}`);
}

/**
 * Removes an item from localStorage.
 * @param {string} key
 */
function removeItemFromLocalStorage(key) {
    localStorage.removeItem(`${key}`);
}

/**
 * Checks stored settings (e.g., mute status).
 */
function checkLocalStorageSettings() {
    if (getLocalStorageItem("mute")) {
        muteSoundIcons()
    }
}

/**
 * Removes the CSS class 'd_none' from an element.
 * @param {string} elementName
 */
function removeD_None(elementName) {
    let element = document.getElementById(`${elementName}`)
    element.classList.remove('d_none')
}

/**
 * Adds the CSS class 'd_none' to an element.
 * @param {string} elementName
 */
function addD_None(elementName) {
    let element = document.getElementById(`${elementName}`)
    element.classList.add('d_none')
}

/**
 * Displays the game over screen.
 */
function getGameOverScreen() {
    let homeIcon = document.getElementById('homeIcon')
    homeIcon.classList.remove('d_none')
    let endScreen = document.getElementById('endScreen')
    endScreen.classList.remove('d_none')
    endScreen.style.backgroundImage = "url('img/6.Botones/Tittles/Game Over/Recurso 10.png')";
    endScreen.innerHTML += getRestartIconsTemplate()
}

/**
 * Displays the game won screen.
 */
function getGameWonScreen() {
    let homeIcon = document.getElementById('homeIcon')
    homeIcon.classList.remove('d_none')
    let endScreen = document.getElementById('endScreen')
    endScreen.classList.remove('d_none')
    endScreen.style.backgroundImage = "url('./img/6.Botones/Try again/Mesa de trabajo 1.png')";
    endScreen.innerHTML += getRestartIconsTemplate()
}

/**
 * Hides the game over screen.
 */
function gameOverScreenOff() {
    let endScreen = document.getElementById('endScreen')
    endScreen.classList.add('d_none')
    endScreen.innerHTML = ""
}

/**
 * Restarts the game.
 */
function restartGame() {
    resetGameVar()
    gameOverScreenOff()
    canvasOn()
}

/**
 * Resets all game-related variables.
 */
function resetGameVar() {
    let homeIcon = document.getElementById('homeIcon')
    homeIcon.classList.add('d_none')
    world.character.energy = 100
    world.endboss[0].endbossEnergy = 100
    resetObjects()
    initLevel1()
    canvas = document.getElementById('canvas');
    world = new World(canvas)
}

/**
 * Adds a mouse click event listener to restart the game.
 */
function restartTheGameEventlistener() {
    let splashScreenStartButton = document.getElementById('splashScreenStartButton')
    splashScreenStartButton.addEventListener('click', world.restartWithMouseClick);
}

/**
 * Displays the imprint (legal notice) section.
 * @param {string} elementName
 */
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

/**
 * Hides the splash screen.
 */
function hideSplashScreen() {
    let splashScreen = document.getElementById('splashScreen')
    splashScreen.classList.add('d_none')
}

/**
 * Shows the splash screen.
 */
function showSplashScreen() {
    let splashScreen = document.getElementById('splashScreen')
    splashScreen.classList.remove('d_none')
}