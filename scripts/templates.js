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
         <div class="impressumContainer" onclick="showImpressum()">
            <p>§</p>
            <h4>Impressum</h4>
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
            <img class="controllerMobile selector " src="./img/controllerMobile.png">
            <img class="instructionsImg selector " src="./img/6.Botones/Instructions 2.png">
            <img id="fullScreenIcon" class="fullScreenIcon selector " src="./img/6.Botones/Full Screen/Mesa de trabajo 7.png">
        </div>
    `
}

function getIngameSettingMenueTemplate() {
    return `
        <div id="instructionsContainer" class="instructionsContainer">
            <img class="controllerMobile selector " src="./img/controllerMobile.png">
            <img class="instructionsImg selector " src="./img/6.Botones/Instructions 2.png">
            <img id="fullScreenIcon" class="fullScreenIcon selector " src="./img/6.Botones/Full Screen/Mesa de trabajo 7.png">
        </div>
    `
}

function getSettingIconsTemplate() {
    return `
     <div class="settingsImgDivInGame">
            <img class="splashScreenSettingIcons homeIcon selector" id="homeIcon" src="./img/homeImage.png" alt="" onclick="showSecondHomeMenue()">
            <img class="splashScreenSettingIcons gearIcon selector" id="gearIcon" src="./img/gear-1077563_640.png" alt="" onclick="showIngameSettingMenue()">
            <img class="splashScreenSettingIcons soundIcon selector " id="soundIcon" src="./img/volume-on.png" alt="" onclick="soundIconSwitch()">
            <img class="splashScreenSettingIcons soundIcon d_none selector " id="muteSoundIcon" src="./img/volume-off.png" alt="" onclick="soundIconSwitch()">
        </div>
    `
}

function getSettingIconsImpressumTemplate() {
    return `
     <div class="settingsImgDivInGame">
            <img class="splashScreenSettingIcons homeIcon selector" id="homeIcon" src="./img/homeImage.png" alt="" onclick="showMainMenue()">
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

function getSecondMainMenueTemplate() {
    return `
            <div class="endScreenButtonContainer">
                <img class="splashScreenStartButton selector " src="./img/6.Botones/Start/3.png" alt="" onclick="world.restartWithMouseClick()">
                <img class="splashScreenSpaceBarIcon selector " src="./img/6.Botones/Key/Space Bar key.png" alt="">
            </div>
            <div class="impressumContainer" onclick="showImpressum()">
                <p>§</p>
                <h4>Impressum</h4>
            </div>
            `
}

function getImpressumTemplate() {
    return `
        <section class="impressumSection" id="impressumSection">
        <div id="impressumtext" class="impressumtext">
            <h2>Impressum</h2>
            <p>Arne R. Klimmt</p>
            <p> Rockendorfer Weg 73</p>
            <p>06128 Halle(Saale)</p>
            <p>Kontakt</p>
            <p>Telefon: 015115158508</p>
            <p>E-Mail: arne-klimmt@gmx.de</p>
        </div>
        </section>
        `
}