function getMainMenueTemplate() {
    return `
     <div class="settingsImgDiv">
            <img class="splashScreenSettingIcons gearIcon selector " src="./img/gear-1077563_640.png" alt="">
            <img class="splashScreenSettingIcons soundIcon selector " id="soundIcon" src="./img/volume-on.png" alt="" onclick="soundIconSwitch()">
            <img class="splashScreenSettingIcons soundIcon d_none selector " id="muteSoundIcon" src="./img/volume-off.png" alt="" onclick="soundIconSwitch()">
        </div>
        <div class="startButtonContainer">
            <img class="splashScreenStartButton selector " src="./img/6.Botones/Start/3.png" alt="" onclick="startGame()">
            <img class="splashScreenSpaceBarIcon selector " src="./img/6.Botones/Key/Space Bar key.png" alt="">
        </div>
    `
}