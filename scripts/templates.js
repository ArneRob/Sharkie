function getMainMenueTemplate() {
    return `
     <div class="settingsImgDiv" id="settingsDiv">
            <img class="splashScreenSettingIcons gearIcon selector" id="gearIcon" src="./img/gear-1077563_640.png" alt="" onclick="showSettingMenue()">
            <img class="splashScreenSettingIcons soundIcon selector " id="soundIcon" src="./img/volume-on.png" alt="" onclick="soundIconSwitch()">
            <img class="splashScreenSettingIcons soundIcon d_none selector " id="muteSoundIcon" src="./img/volume-off.png" alt="" onclick="soundIconSwitch()">
        </div>
        <div class="startButtonContainer">
            <img class="splashScreenStartButton selector " src="./img/6.Botones/Start/3.png" alt="" onclick="startGame()">
            <img class="splashScreenSpaceBarIcon selector " src="./img/6.Botones/Key/Space Bar key.png" alt="">
        </div>
    `
}

function getSettingMenueTemplate() {
    return `
     <div class="settingsImgDiv" id="settingsDiv">
            <img class="splashScreenSettingIcons gearIcon selector" id="gearIcon" src="./img/gear-1077563_640.png" alt="" onclick="showMainMenue()">
            <img class="splashScreenSettingIcons soundIcon selector " id="soundIcon" src="./img/volume-on.png" alt="" onclick="soundIconSwitch()">
            <img class="splashScreenSettingIcons soundIcon d_none selector " id="muteSoundIcon" src="./img/volume-off.png" alt="" onclick="soundIconSwitch()">
        </div>
        <div class="instructionsContainer">
            <img class="instructionsImg selector " src="./img/6.Botones/Instructions 2.png">
            <img id="fullScreenIcon" class="fullScreenIcon selector " src="./img/6.Botones/Full Screen/Mesa de trabajo 7.png">
        </div>
    `
}

function getIngameSettingMenueTemplate() {
    return `
        <div id="instructionsContainer" class="instructionsContainer">
            <img class="instructionsImg selector " src="./img/6.Botones/Instructions 2.png">
            <img id="fullScreenIcon" class="fullScreenIcon selector " src="./img/6.Botones/Full Screen/Mesa de trabajo 7.png">
        </div>
    `
}

function getSettingIconsTemplate() {
    return `
     <div class="settingsImgDivInGame">
            <img class="splashScreenSettingIcons gearIcon selector" id="gearIcon" src="./img/gear-1077563_640.png" alt="" onclick="showIngameSettingMenue()">
            <img class="splashScreenSettingIcons soundIcon selector " id="soundIcon" src="./img/volume-on.png" alt="" onclick="soundIconSwitch()">
            <img class="splashScreenSettingIcons soundIcon d_none selector " id="muteSoundIcon" src="./img/volume-off.png" alt="" onclick="soundIconSwitch()">
        </div>
    `
}

function getRestartIconsTemplate() {
    return `
            <div class="endScreenButtonContainer">
                <img id="splashScreenStartButton" class="splashScreenStartButton selector " src="./img/6.Botones/Try again/Recurso 15.png" alt="" onclick="world.restartWithMouseClick()">
                <img class="splashScreenSpaceBarIcon selector " src="./img/6.Botones/Key/Space Bar key.png" alt="">
            </div>
         `
}