class World {
    canvas;
    ctx;
    character = new Character();
    camera_x = 0;

    statusBar = new StatusBar();
    endbossStatusBar = new EndbossStatusBar();
    coinStatusBar = new CoinStatusBar();
    poisenStatusBar = new PoisenStatusBar();

    coinSound = '../audio/coinSound.mp3';
    poisenBottleSound = '../audio/poisenBottleSound.mp3';

    backgroundAudio;
    underwaterBubble = '../audio/underwaterBubble.mp3';

    sharkieHurtSound = new Audio('../audio/sharkieHurt.mp3');
    electricZapShort = new Audio('../audio/electricZapShort.mp3');

    intervalIds = [];
    gameOver = false;

    currentSound = new Audio('');
    endScreenShownTwoSeconds = false;
    resetGameIsSet = false;
    resetGameInterval = false;
    stopRequestAnimationFrame = false;

    volume = 0;

    coin = level1.coin;
    poisenBottle = level1.poisenBottle;
    level = level1;
    enemies = level1.enemies;
    endboss = level1.endboss;
    backgroundObjects = level1.backgroundObjects;
    light = level1.light;

    endbossCollision = false;

    /**
    * Creates the main world object.
    * Initializes canvas, keyboard, rendering,
    * collision detection, game loop, and sounds.
    */
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = new Keyboard();

        this.draw();
        this.checkCollisions();
        this.checkForItemCollisions();
        this.run();
        this.runSounds();
    }

    /**
     * Starts background sound handling and mute checks.
     */
    runSounds() {
        if (!getLocalStorageItem("backgroundBubble")) {
            this.createBackgroundAudio(this.underwaterBubble);
            setItemToLocalStorage("backgroundBubble");
        }

        setInterval(() => {
            if (this.gameOver) {
                this.backgroundAudio.volume = 0;
            } else if (getLocalStorageItem("mute")) {
                this.muteSounds();
            } else {
                this.soundsOn();
            }
        }, 100);
    }

    /**
     * Mutes all game sounds.
     */
    muteSounds() {
        if (this.backgroundAudio) {
            this.backgroundAudio.volume = 0;
        }
        this.character.sharkieSnoreSound.volume = 0;
        this.character.finSlapSound.volume = 0;
        this.electricZapShort.volume = 0;
        this.sharkieHurtSound.volume = 0;
        this.endboss[0].endbossFightSound.volume = 0;
        this.currentSound.volume = 0;

        this.volume = 0;
    }

    /**
     * Enables all game sounds.
     */
    soundsOn() {
        this.character.sharkieSnoreSound.volume = 0.5;
        this.character.finSlapSound.volume = 0.1;
        this.electricZapShort.volume = 0.05;
        this.endboss[0].endbossFightSound.volume = 0.05;
        this.sharkieHurtSound.volume = 0.05;

        if (this.backgroundAudio) {
            this.backgroundAudio.volume = 0.05;
        }
        this.volume = 0.05;
    }

    /**
     * Starts main game intervals.
     */
    run() {
        let run1Interval = setInterval(() => {
            this.checkCollisions();
            this.checkIfEnemieIsNear();
            this.checkGameOverCondition();
        }, 50);

        let run2Interval = setInterval(() => {
            this.checkForItemCollisions();
        }, 200);

        this.intervalIds.push(run1Interval, run2Interval);
    }

    /**
     * Checks collision between character and endboss.
     */
    checkCollisions() {
        if (this.character.isColliding(this.level.endboss[0]) && this.endboss[0].endbossEnergy > 0) {
            this.endbossCollision = true;
            this.character.hurtSharkie();
        } else {
            this.endbossCollision = false;
        }
    }



    /**
     * Checks proximity between character and enemies.
     */
    checkIfEnemieIsNear() {
        if (this.character.endbossXIntroStart(this.endboss[0])) {
            this.endboss[0].endbossIntro = true;
        }

        if (
            this.character.enemieIsNear(
                this.level.endboss[0],
                this.level.endboss[0].width / 8
            )
        ) {
            this.endboss[0].endbossNearCharacter();
        }

        this.checkEnemiesNear(this.level.enemies);
    }

    /**
     * Checks if enemies are near the character.
     * @param {Array} enemies - List of enemies.
     */
    checkEnemiesNear(enemies) {
        for (let index = 3; index < enemies.length; index++) {
            if (this.character.enemieIsNear(enemies[index], 50)) {
                this.electricZapShort.play();
            }
        }
    }

    /**
     * Checks collisions with collectible items.
     */
    checkForItemCollisions() {
        this.ifCoinCollision(this.coin);
        this.ifPoisenBottleCollision();
    }

    /**
     * Handles coin collisions.
     * @param {Array} collectItem - Coin array.
     */
    ifCoinCollision(collectItem) {
        for (let index = 0; index < this.level.coin.length; index++) {
            if (this.character.isColliding(this.coin[index])) {
                this.playSound(this.coinSound);
                this.character.collect(collectItem[0]);
                this.coin.splice(index, 1);
                this.coinStatusBar.setPercentage(this.character.collectedCoin);
            }
        }
    }

    /**
     * Handles poison bottle collisions.
     */
    ifPoisenBottleCollision() {
        for (let index = 0; index < this.level.poisenBottle.length; index++) {
            if (this.character.isColliding(this.poisenBottle[index])) {
                this.playSound(this.poisenBottleSound);
                this.character.collect("collectedPoisenBottle");
                this.poisenBottle.splice(index, 1);
                this.poisenStatusBar.setPercentage(this.character.collectedPoisenBottle);
            }
        }
    }

    /**
     * Draws the complete game world.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.light);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.statusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.poisenStatusBar);

        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.endbossStatusBar);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.poisenBottle);
        this.addObjectsToMap(this.character.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        if (!this.stopRequestAnimationFrame) {
            requestAnimationFrame(() => this.draw());
        }
    }

    /**
     * Adds multiple objects to the map.
     * @param {Array} objects - Objects to draw.
     */
    addObjectsToMap(objects) {
        objects.forEach(obj => this.addToMap(obj));
    }

    /**
     * Draws a single movable object.
     * @param {Object} mo - Movable object.
     */
    addToMap(mo) {
        if (mo.otherDirection) this.changeImgDirection(mo);

        mo.draw(this.ctx);
        //if collision frame needed, just activate
        // mo.drawFrame(this.ctx);

        if (mo.otherDirection) this.changeBackImgDirection(mo);
    }

    /**
     * Mirrors image direction.
     * @param {Object} mo - Movable object.
     */
    changeImgDirection(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores original image direction.
     * @param {Object} mo - Movable object.
     */
    changeBackImgDirection(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Plays a sound effect.
     * @param {string} soundSrc - Path to sound file.
     */
    playSound(soundSrc) {
        let sound = new Audio(soundSrc);
        sound.volume = getLocalStorageItem("mute") ? 0 : 0.2;

        this.currentSound = sound;
        sound.play();
        sound.onended = () => sound.remove();
    }

    /**
     * Checks win/lose conditions.
     */
    checkGameOverCondition() {
        if (this.level.endboss[0].endbossEnergy <= 0 && !this.gameOver && !this.resetGameIsSet && this.level.endboss[0].endbossDeadAnimationIsOver) {
            this.getGameWonActions()
        } else if (this.character.energy <= 0 && !this.gameOver && this.character.characterDeadAnimationIsOver) {
            this.getGameOverActions()
        }

        if (!this.resetGameInterval) {
            this.resetGameInterval = true;
            this.checkResetGame();
        }
    }

    /**
    * Executes all actions required when the player wins the game.
    * Stops the game loop, shows the winning screen,
    * plays the victory sound, clears all intervals,
    * enables delayed end screen logic,
    * and activates the restart event listener.
    */
    getGameWonActions() {
        this.gameOver = true;
        getGameWonScreen();
        this.playSound('audio/winning_game.mp3');
        this.intervalIds.forEach(clearInterval);
        this.delayedEndScreenShowBooleanOnTrue();
        restartTheGameEventlistener();
    }

    /**
    * Executes all actions required when the player loses the game.
    * Stops the game loop, shows the game over screen,
    * plays the losing sound, clears all intervals,
    * enables delayed end screen logic,
    * and activates the restart event listener.
    */
    getGameOverActions() {
        this.gameOver = true;
        getGameOverScreen();
        this.playSound('audio/lose_game.mp3');
        this.intervalIds.forEach(clearInterval);
        this.delayedEndScreenShowBooleanOnTrue();
        restartTheGameEventlistener();
    }
    /**
     * Checks restart input after game over.
     */
    checkResetGame() {
        let interval = setInterval(() => {
            if (this.gameOver && this.keyboard.SPACE && this.endScreenShownTwoSeconds && !this.resetGameIsSet) {
                this.initRestartGame();
                clearInterval(interval);
                restartGame();
                removeD_None('homeIcon');
            }
        }, 200);
    }

    /**
    * Restarts game via mouse click.
    */
    restartWithMouseClick() {
        if (this.gameOver) {
            this.initRestartGame();
            restartGame();
            removeD_None('homeIcon');
        }
    }

    /**
     * Enables restart after delay.
     */
    delayedEndScreenShowBooleanOnTrue() {
        setTimeout(() => {
            this.endScreenShownTwoSeconds = true;
        }, 1000);
    }

    /**
     * Initializes restart state.
     */
    initRestartGame() {
        removeItemFromLocalStorage('backgroundBubble')
        this.resetGameIsSet = true;
        this.currentSound.volume = 0;
        this.stopRequestAnimationFrame = true;
    }

    /**
     * Creates looping background audio.
     * @param {string} audioSrc - Path to audio file.
     */
    createBackgroundAudio(audioSrc) {
        this.backgroundAudio = document.createElement("audio");
        this.backgroundAudio.src = audioSrc;
        this.backgroundAudio.loop = true;
        this.backgroundAudio.volume = this.volume;
        this.backgroundAudio.play();
    }
}