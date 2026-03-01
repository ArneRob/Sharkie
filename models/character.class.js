class Character extends MovableObject {

    IMAGES_SWIMMING = [
        '../img/1.Sharkie/1.IDLE/1.png',
        '../img/1.Sharkie/1.IDLE/2.png',
        '../img/1.Sharkie/1.IDLE/3.png',
        '../img/1.Sharkie/1.IDLE/4.png',
        '../img/1.Sharkie/1.IDLE/5.png',
        '../img/1.Sharkie/1.IDLE/6.png',
        '../img/1.Sharkie/1.IDLE/7.png',
        '../img/1.Sharkie/1.IDLE/8.png',
        '../img/1.Sharkie/1.IDLE/9.png',
        '../img/1.Sharkie/1.IDLE/10.png',
        '../img/1.Sharkie/1.IDLE/11.png',
        '../img/1.Sharkie/1.IDLE/12.png',
        '../img/1.Sharkie/1.IDLE/13.png',
        '../img/1.Sharkie/1.IDLE/14.png',
        '../img/1.Sharkie/1.IDLE/15.png',
        '../img/1.Sharkie/1.IDLE/16.png',
        '../img/1.Sharkie/1.IDLE/17.png',
        '../img/1.Sharkie/1.IDLE/18.png',
    ];

    IMAGES_SWIM = [
        "../img/1.Sharkie/3.Swim/1.png",
        "../img/1.Sharkie/3.Swim/2.png",
        "../img/1.Sharkie/3.Swim/4.png",
        "../img/1.Sharkie/3.Swim/5.png",
    ];

    IMAGES_SLAP = [
        '../img/1.Sharkie/4.Attack/Fin slap/1.png',
        '../img/1.Sharkie/4.Attack/Fin slap/4.png',
        '../img/1.Sharkie/4.Attack/Fin slap/5.png',
        '../img/1.Sharkie/4.Attack/Fin slap/6.png',
        '../img/1.Sharkie/4.Attack/Fin slap/7.png',
        '../img/1.Sharkie/4.Attack/Fin slap/8.png',
    ];
    IMAGES_DEAD = [
        '../img/1.Sharkie/6.dead/1.Poisoned/1.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/2.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/3.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/4.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/5.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/6.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/7.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/8.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/9.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/10.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/11.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/12.png',
    ];
    IMAGES_HURT = [
        '../img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        '../img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        '../img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        '../img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
    ];
    IMAGES_IDLE_LONG = [
        '../img/1.Sharkie/2.Long_IDLE/i1.png',
        '../img/1.Sharkie/2.Long_IDLE/I2.png',
        '../img/1.Sharkie/2.Long_IDLE/I3.png',
        '../img/1.Sharkie/2.Long_IDLE/I4.png',
        '../img/1.Sharkie/2.Long_IDLE/I5.png',
        '../img/1.Sharkie/2.Long_IDLE/I6.png',
        '../img/1.Sharkie/2.Long_IDLE/I7.png',
        '../img/1.Sharkie/2.Long_IDLE/I8.png',
        '../img/1.Sharkie/2.Long_IDLE/I9.png',
        '../img/1.Sharkie/2.Long_IDLE/I10.png',
        '../img/1.Sharkie/2.Long_IDLE/I11.png',
        '../img/1.Sharkie/2.Long_IDLE/I12.png',
        '../img/1.Sharkie/2.Long_IDLE/I13.png',
        '../img/1.Sharkie/2.Long_IDLE/I14.png',
    ];
    IMAGES_IDLE_SLEEP = [
        '../img/1.Sharkie/2.Long_IDLE/I11.png',
        '../img/1.Sharkie/2.Long_IDLE/I12.png',
        '../img/1.Sharkie/2.Long_IDLE/I13.png',
        '../img/1.Sharkie/2.Long_IDLE/I14.png',
    ];
    lastSlap = 0;
    idleTimer = 0;
    IdleCounter = 0;
    nowTime = 0;
    passedTime = 0;
    idleSleep;
    slapCounter = 0;
    stayAndSlap = false;
    swimAndSlap = false;
    characterAnimationInterval = false;
    keyListenerInterval = false;
    slapAnimationIsOver = true;
    finSlapSound = new Audio('../audio/finSlapSound.mp3')
    sharkieSnoreSound = new Audio("../audio/snoreSoundSharkie.mp3")
    characterDeadAnimation = false;
    characterDeadAnimationIsOver = false;
    interval;
    intervalSpeed = 1000 / 9
    intervalIndex = 0;
    offset = {
        top: 130,
        left: 50,
        right: 50,
        bottom: 70,
    };

    /**
    * Creates the main character (Sharkie).
    * Loads all animation states, initializes controls,
    * sets size and starting position, and starts animation logic.
    */
    constructor() {
        super().loadImage('../img/1.Sharkie/3.Swim/1.png')
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_SLAP);
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE_LONG)
        this.loadImages(this.IMAGES_IDLE_SLEEP)
        this.animate();
        this.startKeyListener()
        this.setTimer()
        this.width = 250
        this.height = 250

        this.x = 0
        this.y = 50
    }
    /**
     * Starts the main animation loop for the character.
     */
    animate() {
        this.intervalIndex = 0;
        if (!this.characterDeadAnimation) {
            this.interval = setInterval(() => {
                if (this.isDead() && !this.characterDeadAnimation && !world.gameOver) {
                    this.playSlowerDeadAnimation()
                }
                if (this.space() && this.slapAnimationIsOver) {
                    this.preparSlapAnimation()
                }
                if (this.space()) { this.spacePressed() }
                this.setTimeForSleep()
                if (this.characterDeadAnimation && this.isDead()) {
                    this.playDeadAnimationAndResetBooleans()
                } else if (this.canSlap()) {
                    this.executeCharacterSlap()
                } else if (this.isHurt() && !this.characterDeadAnimationIsOver) {
                    this.playAnimation(this.IMAGES_HURT)
                } else if (this.canSwim()) {
                    this.playAnimation(this.IMAGES_SWIM)
                } else if (this.canSleep()) {
                    this.executeCharacterSleep()
                } else if (this.canIdle()) {
                    this.playAnimation(this.IMAGES_SWIMMING)
                }
                this.pushIntervalids(this.interval, "characterAnimationInterval", world)
                this.intervalIndex++
            }, this.intervalSpeed);
        }
    }

    /**
     * Starts the key listener interval for character movement.
     */
    startKeyListener() {
        if (!this.characterDeadAnimation) {
            if (!this.keyListenerInterval) {
                let keyListenerInterval = setInterval(() => {

                    this.charMoveRight()
                    this.charMoveLeft()
                    this.charMoveUp()
                    this.charMoveDown()
                    this.moveCameraXY()

                    this.pushIntervalids(keyListenerInterval, "keyListenerInterval", world)
                }, 1000 / 60);
            }
        }
    }

    /**
     * Updates the camera position based on the character's X coordinate.
     */
    moveCameraXY() {
        if (this.x <= 200) {
            world.camera_x = 0
        } else if (this.x >= 1700) {
            world.camera_x = -1500
        } else if (!this.x <= 200) {
            world.camera_x = -this.x + 200
        }
    }

    /**
     * Moves the character downward if allowed.
     */
    charMoveDown() {
        if (world.keyboard.DOWN && !this.isDead() && this.y < world.level.level_end_y) {
            if (isSafari) {
                this.y += this.speed * 15;
            } else {
                this.y += this.speed * 10;
            }
            this.setTimer()
        }
    }

    /**
     * Moves the character upward if allowed.
     */
    charMoveUp() {
        if (world.keyboard.UP && !this.isDead() && this.y > 0 - 100) {

            if (isSafari) {
                this.y -= this.speed * 15;
            } else {
                this.y -= this.speed * 10;
            }
            this.setTimer()
        }
    }

    /**
     * Moves the character to the left if allowed.
     */
    charMoveLeft() {
        if (world.keyboard.LEFT && this.x > 0 && !this.isDead()) {
            if (isSafari) {
                this.x -= this.speed * 30;
            } else {
                this.x -= this.speed * 20;
            }
            this.otherDirection = true;
            this.setTimer()
        }
    }

    /**
     * Moves the character to the right if allowed.
     */
    charMoveRight() {
        if (world.keyboard.RIGHT && this.x < world.level.level_end_x && !this.isDead()) {
            if (isSafari) {
                this.x += this.speed * 30;
            } else {
                this.x += this.speed * 20;
            }
            this.otherDirection = false;
            this.setTimer()
        }
    }

    /**
     * Checks whether the character can play the idle animation.
     */
    canIdle() {
        return !this.stayAndSlap && !this.swimAndSlap && !this.characterDeadAnimationIsOver
    }

    /**
     * Executes the character's sleep animation sequence.
     */
    executeCharacterSleep() {
        if (this.IdleCounter <= 7 && !this.idleSleep) {
            this.playAnimation(this.IMAGES_IDLE_LONG)
        } else if (!this.characterDeadAnimationIsOver) {
            this.idleSleep = true
            this.sharkieSnoreSound.play()
            this.playAnimation(this.IMAGES_IDLE_SLEEP)
            this.dropYCoordinate()
        }
        this.IdleCounter++
        if (this.IdleCounter >= 13) { this.IdleCounter == 0 }
    }

    /**
     * Checks whether the character can enter sleep state.
     */
    canSleep() {
        return this.nowTime > this.passedTime && !this.characterDeadAnimationIsOver
    }

    /**
     * Checks whether the character can swim.
     */
    canSwim() {
        return world.keyboard.RIGHT || world.keyboard.LEFT && !this.characterDeadAnimationIsOver
    }

    /**
     * Checks whether the character can perform a slap.
     */
    canSlap() {
        return this.swimAndSlap && this.intervalIndex <= 5 && !this.characterDeadAnimationIsOver
    }

    /**
     * Executes the character slap action.
     */
    executeCharacterSlap() {
        this.playAnimation(this.IMAGES_SLAP)
        this.finSlapSound.play()
        this.setTimer()
        this.subtractLivePointEndboss()
        if (this.intervalIndex == 5) {
            this.slapAnimationIsOver = true;
            this.swimAndSlap = false
        }
    }

    /**
     * Updates the time reference for sleep detection.
     */
    setTimeForSleep() {
        this.nowTime = new Date().getTime();
        this.passedTime = this.idleTimer + 10000;
    }

    /**
     * Plays the dead animation and resets related flags.
     */
    playDeadAnimationAndResetBooleans() {
        this.playAnimation(this.IMAGES_DEAD)
        if (this.intervalIndex >= 5) {
            this.characterDeadAnimation = false;
            this.characterDeadAnimationIsOver = true;
            world.stopRequestAnimationFrame = true;
        }
    }

    /**
     * Prepares the slap animation state.
     */
    preparSlapAnimation() {
        this.intervalIndex = 0
        this.slapAnimationIsOver = false;
        this.swimAndSlap = true;
        this.currentImage = 0;
    }

    /**
     * Plays the slower dead animation.
     */
    playSlowerDeadAnimation() {
        this.intervalIndex = 0
        clearInterval(this.interval)
        this.intervalSpeed = 1000 / 5
        this.animate()
        this.currentImage = 0
        this.characterDeadAnimation = true;
    }

    /**
     * Slightly drops the character's Y coordinate.
     */
    dropYCoordinate() {
        if (this.y < world.level.level_end_y - 50) {
            this.y += 10
        }
    }

    /**
     * Stores the timestamp when space was pressed.
     */
    spacePressed() {
        this.spaceWasPressed = new Date().getTime()
    }

    /**
     * Checks whether space was pressed within a specific time range.
     * @returns {boolean}
     */
    checkIfSpaceWasPressedInRange() {
        let nowTime = new Date().getTime()
        return this.spaceWasPressed + 500 > nowTime
    }

    /**
     * Reduces the endboss energy and updates its status bar.
     */
    setEnergyOfEndboss() {
        world.endboss[0].endbossEnergy -= 20
        world.endbossStatusBar.setPercentage(world.endboss[0].endbossEnergy)
    }

    /**
     * Checks whether enough time has passed since the last slap.
     * @returns {boolean}
     */
    slapTimePassed() {
        let nowTime = new Date().getTime()
        return this.lastSlap + 500 < nowTime
    }

    /**
     * Stores the current time as the last slap time.
     */
    setSlapTime() {
        this.lastSlap = new Date().getTime()
    }

    /**
     * Checks whether the space key is currently pressed.
     * @returns {boolean}
     */
    space() {
        return world.keyboard.SPACE
    }

    /**
     * Subtracts a life point from the endboss if collision conditions are met.
     */
    subtractLivePointEndboss() {
        if (this.lastSlap == 0 && this.isColliding(world.endboss[0]) || this.slapTimePassed() && this.isColliding(world.endboss[0])) {
            this.setEnergyOfEndboss()
            this.setSlapTime()
        }
    }

    /**
     * Resets the idle timer and related sleep states.
     */
    setTimer() {
        this.idleTimer = new Date().getTime();
        this.idleSleep = false
        this.IdleCounter = 0;
    }

    /**
     * Handles the character being hurt.
     */
    hurtSharkie() {
        this.hit();
        world.sharkieHurtSound.play()
        world.statusBar.setPercentage(this.energy);
    }
}