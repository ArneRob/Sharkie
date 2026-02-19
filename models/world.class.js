class World {
    character = new Character();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    endbossStatusBar = new EndbossStatusBar()
    coinStatusBar = new CoinStatusBar()
    poisenStatusBar = new PoisenStatusBar()
    throwableObjects = []
    coinSound = '../audio/coinSound.mp3'
    poisenBottleSound = '../audio/poisenBottleSound.mp3'
    backgroundAudio;
    underwaterBubble = ('../audio/underwaterBubble.mp3')
    sharkieHurtSound = new Audio('../audio/sharkieHurt.mp3')
    electricZapShort = new Audio('../audio/electricZapShort.mp3')
    bubble
    intervalIds = []
    gameOver = false;
    currentSound = new Audio('');
    endScreenShownTwoSeconds = false;
    resetGameIsSet = false;
    resetGameInterval = false;
    stopRequestAnimationFrame = false;
    volume = 0;
    coin = level1.coin;
    poisenBottle = level1.poisenBottle
    level = level1;
    enemies = level1.enemies;
    endboss = level1.endboss;
    backgroundObjects = level1.backgroundObjects;
    light = level1.light;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.checkCollisions();
        this.checkForItemCollisions();
        this.run()
        this.runSounds()
    }

    runSounds() {
        if (!getLocalStorageItem("backgroundBubble")) {
            this.createAudio(this.underwaterBubble)
            setItemToLocalStorage("backgroundBubble")
        }
        let soundCheckInterval = setInterval(() => {
            if (getLocalStorageItem("mute")) {
                if (this.backgroundAudio) {
                    this.backgroundAudio.volume = 0
                }
                this.electricZapShort.volume = 0
                this.sharkieHurtSound.volume = 0
                this.endboss[0].endbossFightSound.volume = 0
                this.currentSound.volume = 0
                this.volume = 0;
            } else {
                this.electricZapShort.volume = 0.05
                this.endboss[0].endbossFightSound.volume = 0.05
                this.sharkieHurtSound.volume = 0.05
                if (this.backgroundAudio) {
                    this.backgroundAudio.volume = 0.05
                }
                this.volume = 0.05
            }
        }, 100);
    }
    run() {
        let run1Interval = setInterval(() => {
            this.checkCollisions()
            this.checkThrowObjects()
            this.checkIfEnemieIsNear()
            this.checkGameOverCondition()
        }, 200);
        let run2Interval = setInterval(() => {
            this.checkForItemCollisions()
        }, 200);
        this.intervalIds.push(run1Interval)
        this.intervalIds.push(run2Interval)
    }
    checkThrowObjects() {
        if (this.keyboard.F && this.character.collectedPoisenBottle > 0) {
            this.bubble = new ThrowableObject(this.character.x, this.character.y)
            this.throwableObjects.push(this.bubble);
            this.character.collectedPoisenBottle -= 20
            this.poisenStatusBar.setPercentage(this.character.collectedPoisenBottle);
            if (this.bubble.isColliding(this.level.endboss[0])) {
                console.log("orcaSchaden");
            }
        }
    }
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.sharkieHurtSound.play()
                this.statusBar.setPercentage(this.character.energy);
            }
        });
        if (this.character.isColliding(this.level.endboss[0])) {
            this.character.hit();
            this.sharkieHurtSound.play()

            this.statusBar.setPercentage(this.character.energy);
        }
    }
    checkIfEnemieIsNear() {
        if (this.character.endbossXIntroStart(this.endboss[0])) {
            this.endboss[0].endbossIntro = true;
        }
        if (this.character.enemieIsNear(this.level.endboss[0], this.level.endboss[0].width / 8)) {
            this.endboss[0].endbossNearCharacter()
        }
        this.checkEnemiesNear(this.level.enemies)
    }
    checkEnemiesNear(enemies) {
        for (let index = 3; index < enemies.length; index++) {
           if (this.character.enemieIsNear(enemies[index], 50)) {
                this.electricZapShort.play()
            }
        }
    }
    checkForItemCollisions() {
        this.ifCoinCollision(this.coin);
        this.ifPoisenBottleCollision();
    }
    ifCoinCollision(collectItem) {
        for (let index = 0; index < this.level.coin.length; index++) {
            if (this.character.isColliding(this.coin[index])) {
                this.playSound(this.coinSound)
                this.character.collect(collectItem[0]);
                this.coin.splice(index, 1)
                this.coinStatusBar.setPercentage(this.character.collectedCoin);
            }
        }
    }
    ifPoisenBottleCollision() {
        for (let index = 0; index < this.level.poisenBottle.length; index++) {
            if (this.character.isColliding(this.poisenBottle[index])) {
                this.playSound(this.poisenBottleSound)
                this.character.collect("collectedPoisenBottle");
                this.poisenBottle.splice(index, 1)
                this.poisenStatusBar.setPercentage(this.character.collectedPoisenBottle);
            }
        }
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.light);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar)
        this.addToMap(this.endbossStatusBar)
        this.addToMap(this.coinStatusBar)
        this.addToMap(this.poisenStatusBar)
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.poisenBottle);
        this.addObjectsToMap(this.throwableObjects)
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        if (!this.stopRequestAnimationFrame) {
            requestAnimationFrame(function () {
                self.draw();
            });
        }
    }

    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj)
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.changeImgDirection(mo)
        }
        mo.draw(this.ctx)
        mo.drawFrame(this.ctx)

        if (mo.otherDirection) {
            this.changeBackImgDirection(mo)
        }
    };
    changeImgDirection(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1
    }
    changeBackImgDirection(mo) {
        mo.x = mo.x * -1
        this.ctx.restore();
    }

    playSound(soundSrc) {
        let sound = new Audio(soundSrc);
        if (getLocalStorageItem("mute")) {
            sound.volume = 0
        } else {
            sound.volume = 0.2
        }
        this.currentSound = sound
        sound.play();
        sound.onended = () => {
            sound.remove();
        };
    }
    checkGameOverCondition() {
        if (this.level.endboss[0].endbossEnergy == 0 && !this.gameOver && !this.resetGameIsSet) {
            this.gameOver = true;
            getGameWonScreen()
            this.playSound('audio/winning_game.mp3')
            this.intervalIds.forEach(clearInterval)
            this.delayedEndScreenShowBooleanOnTrue()
            restartTheGameEventlistener()
        } else if (this.character.energy == 0 && !this.gameOver) {
            this.gameOver = true;
            getGameOverScreen()
            this.playSound('audio/lose_game.mp3')
            this.intervalIds.forEach(clearInterval)
            this.delayedEndScreenShowBooleanOnTrue()
            restartTheGameEventlistener()
        }
        if (!this.resetGameInterval) {
            this.resetGameInterval = true;
            this.checkResetGame()
        }
    }
    checkResetGame() {
        let interval = setInterval(() => {
            if (this.gameOver && this.keyboard.SPACE && this.endScreenShownTwoSeconds && !this.resetGameIsSet) {
                this.initRestartGame()
                clearInterval(interval)
                restartGame()
            }
        }, 200);
    }

    delayedEndScreenShowBooleanOnTrue() {
        setTimeout(() => {
            this.endScreenShownTwoSeconds = true;
        }, 2000);
    }
    restartWithMouseClick() {
        if (this.gameOver) {
            this.initRestartGame()
            restartGame()
        }
    }
    initRestartGame() {
        this.resetGameIsSet = true;
        this.currentSound.volume = 0
        this.stopRequestAnimationFrame = true;
    }

    createAudio(audioSrc) {
        this.backgroundAudio = document.createElement("AUDIO")
        this.backgroundAudio.id = "audio"
        this.backgroundAudio.src = audioSrc
        this.backgroundAudio.play()
        this.backgroundAudio.loop = true
        this.backgroundAudio.volume = this.volume
    }

}

