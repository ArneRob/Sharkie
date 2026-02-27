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
         <div class="impressumContainer" onclick="showImpressum('splashScreen')">
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
              <div class="mobileButtonsImgsDiv">
                <div class="mobileDirectionsButtons">
                    <div>
                        <img class="touchButtonsWidth" src="./img/everyDirection.png" alt="">
                        <p>Up</p>
                    </div>
                    <div>
                        <img class="touchButtonsWidth buttonDown" src="./img/everyDirection.png" alt="">
                        <p>Down</p>
                    </div>
                    <div>
                        <img class="touchButtonsWidth buttonLeft" src="./img/everyDirection.png" alt="">
                        <p>Left</p>
                    </div>
                    <div>
                        <img class="touchButtonsWidth buttonRight" src="./img/everyDirection.png" alt="">
                        <p>Right</p>
                    </div>
                </div>
                <div class="mobileSpecialButtons">
                    <div>
                        <img class="touchButtonsWidth" src="./img/attackButtonImg.png" alt="">
                        <p>SlapAttack</p>
                    </div>
                     <div>
                        <img class="touchButtonsWidth" src="./img/poisenButtonNew.png" alt="">
                        <p>PoisenAttack</p>
                    </div>
                </div>
            </div>
            <img class="instructionsImg selector " src="./img/6.Botones/Instructions 2.png">
        </div>
    `
}

function getIngameSettingMenueTemplate() {
    return `
        <div id="instructionsContainer" class="instructionsContainer">
            <div class="mobileButtonsImgsDiv">
                <div class="mobileDirectionsButtons">
                    <div>
                        <img class="touchButtonsWidth" src="./img/everyDirection.png" alt="">
                        <p>Up</p>
                    </div>
                    <div>
                        <img class="touchButtonsWidth buttonDown" src="./img/everyDirection.png" alt="">
                        <p>Down</p>
                    </div>
                    <div>
                        <img class="touchButtonsWidth buttonLeft" src="./img/everyDirection.png" alt="">
                        <p>Left</p>
                    </div>
                    <div>
                        <img class="touchButtonsWidth buttonRight" src="./img/everyDirection.png" alt="">
                        <p>Right</p>
                    </div>
                </div>
                <div class="mobileSpecialButtons">
                    <div>
                        <img class="touchButtonsWidth" src="./img/attackButtonImg.png" alt="">
                        <p>SlapAttack</p>
                    </div>
                     <div>
                        <img class="touchButtonsWidth" src="./img/poisenButtonNew.png" alt="">
                        <p>PoisenAttack</p>
                    </div>
                </div>
            </div>
            <img class="instructionsImg selector " src="./img/6.Botones/Instructions 2.png">
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
            <div class="impressumContainer" onclick="showImpressum('endScreen')">
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