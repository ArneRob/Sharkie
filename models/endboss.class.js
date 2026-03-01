class Endboss extends MovableObject {
    IMAGES_SWIMMING = [
        "../img/2.Enemy/3 Final Enemy/2.floating/1.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/2.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/3.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/4.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/5.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/6.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/7.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/8.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/9.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/10.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/11.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/12.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/13.png",
    ];

    IMAGES_FIGHT = [
        "../img/2.Enemy/3 Final Enemy/Attack/1.png",
        "../img/2.Enemy/3 Final Enemy/Attack/2.png",
        "../img/2.Enemy/3 Final Enemy/Attack/3.png",
        "../img/2.Enemy/3 Final Enemy/Attack/4.png",
        "../img/2.Enemy/3 Final Enemy/Attack/5.png",
        "../img/2.Enemy/3 Final Enemy/Attack/6.png",
    ];
    IMAGES_INTRO_ANIMATION = [
        "../img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/10.png",
    ];
    IMAGES_DEAD = [
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
    ];

    IMAGES_HIDDEN_ENDBOSS = [
        "../img/2.Enemy/3 Final Enemy/1.Introduce/1.png"
    ]
    endbossFightSound = new Audio('../audio/endbossFight.mp3')
    offset = {
        top: 200,
        left: 30,
        right: 50,
        bottom: 90,
    };
    endbossOtherDirection = false;
    endbossAnimationIntervalIsPushed = false;
    endbossFollowIntervalIsPushed = false;
    endbossTurnArroundInterval = false;
    endbossIntro = false;
    introWasPlayed = false;
    endbossFollowInterVal = false;
    endbossFightImageCounter = 0;
    endbossDeadAnimation = false;
    endbossDeadAnimationIsOver = false;
    intervalSpeed = 1000 / 10
    intervalIndex = 0
    endbossAnimationInterval

    /**
    * Creates the end boss.
    * Loads all animation states and initializes
    * position, size, and behavior checks.
    */
    constructor() {
        super().loadImage(this.IMAGES_HIDDEN_ENDBOSS[0])
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_FIGHT);
        this.loadImages(this.IMAGES_INTRO_ANIMATION)
        this.loadImages(this.IMAGES_DEAD)

        this.x = 1650
        this.y = 0
        this.width = 400
        this.height = 400

        this.animate();
        this.check()
    }

    /**
    * Animates the endboss.
    * Controls intro, fight, swim, hidden, and death animations,
    * including slower death handling and interval management.
    */
    animate() {
        this.intervalIndex = 0
        if (!this.endbossDeadAnimation) {
            this.endbossAnimationInterval = setInterval(() => {
                if (this.canExeSlowerDeathAnimation()) {
                    this.slowerDeathAnimation()
                }
                if (this.canPlayDeadAnimation()) {
                    this.executeEndbossDeath()
                } else {
                    if (this.canInitEndbossIntro()) {
                        this.executeInitEndbossIntro()
                    }
                    if (this.canPlayEndbossIntro()) {
                        this.executeEndbossIntro()
                    } else if (this.checkLastNearEndbossTime() && !this.endbossDeadAnimationIsOver) {
                        this.executeFightAnimation()
                    } else if (this.canPlayAnimationSwim()) {
                        this.executeEndbossSwim()
                    } else if (this.canHideEndboss()) {
                        this.playAnimation(this.IMAGES_HIDDEN_ENDBOSS)
                    }
                }
                this.pushIntervalids(this.endbossAnimationInterval, "endbossAnimationIntervalIsPushed", world)
                this.intervalIndex++
            }, this.intervalSpeed);
        }
    }

    /**
     * Checks whether the endboss can be hidden.
     * @returns {boolean}
     */
    canHideEndboss() {
        return !this.endbossDeadAnimationIsOver
    }

    /**
     * Executes the swimming animation and follows the character.
     */
    executeEndbossSwim() {
        this.playAnimation(this.IMAGES_SWIMMING)
        this.followCharacter()
    }

    /**
     * Checks whether the swim animation can be played.
     * @returns {boolean}
     */
    canPlayAnimationSwim() {
        return this.introWasPlayed && this.intervalIndex >= 10 && !this.checkLastNearEndbossTime() && !this.endbossDeadAnimationIsOver
    }

    /**
     * Executes the fight animation sequence.
     */
    executeFightAnimation() {
        this.currentImage = this.endbossFightImageCounter
        this.playAnimation(this.IMAGES_FIGHT)
        this.endbossFightSound.play()
        this.endbossFightImageCounter++
        this.followCharacter()
        if (this.endbossFightImageCounter >= 6) {
            this.endbossFightImageCounter = 0;
        }
    }

    /**
     * Initializes the endboss intro animation.
     */
    executeInitEndbossIntro() {
        this.intervalIndex = 0
        this.introWasPlayed = true;
        this.currentImage = 0;
    }

    /**
     * Plays the endboss intro animation.
     */
    executeEndbossIntro() {
        this.playAnimation(this.IMAGES_INTRO_ANIMATION)
        if (this.intervalIndex == 10) {
            this.endbossIntro = false;
        }
    }

    /**
     * Checks whether the intro animation can be played.
     * @returns {boolean}
     */
    canPlayEndbossIntro() {
        return this.endbossIntro && this.intervalIndex < 10 && !this.endbossDeadAnimationIsOver
    }

    /**
     * Checks whether the intro animation should be initialized.
     * @returns {boolean}
     */
    canInitEndbossIntro() {
        return this.endbossIntro && !this.introWasPlayed
    }

    /**
     * Executes the endboss death animation.
     */
    executeEndbossDeath() {
        this.playAnimation(this.IMAGES_DEAD)
        if (this.intervalIndex >= 3) {
            this.endbossDeadAnimation = false;
            this.endbossDeadAnimationIsOver = true;
            world.stopRequestAnimationFrame = true;
        }
    }

    /**
     * Checks whether the death animation can be played.
     * @returns {boolean}
     */
    canPlayDeadAnimation() {
        return this.endbossEnergy <= 0 && this.endbossDeadAnimation
    }

    /**
     * Checks whether the slower death animation should be executed.
     * @returns {boolean}
     */
    canExeSlowerDeathAnimation() {
        return this.endbossEnergy <= 0 && !this.endbossDeadAnimation && !world.gameOver
    }

    /**
     * Executes a slower version of the death animation.
     */
    slowerDeathAnimation() {
        this.intervalIndex = 0
        clearInterval(this.endbossAnimationInterval)
        this.intervalSpeed = 1000 / 5
        this.animate()
        this.currentImage = 0
        this.endbossDeadAnimation = true;
    }

    /**
     * Makes the endboss follow the character.
     */
    followCharacter() {
        if (!this.endbossFollowInterVal) {
            this.endbossFollowInterVal = true;

            let interval = setInterval(() => {
                if (this.characterX() < this.x) {
                    this.x -= this.speed * 60
                } else if (this.characterX() > this.x) {
                    this.x += this.speed * 60
                }
                if (this.characterY() > this.y) {
                    this.y += this.speed * 20
                } else if (this.characterY() < this.y) {
                    this.y -= this.speed * 20
                }
                this.pushIntervalids(interval, "endbossFollowIntervalIsPushed", world)
            }, 1000 / 10);
        }
    }

    /**
     * Checks direction and updates status bar position.
     */
    check() {
        let interval = setInterval(() => {
            if (world) {
                if (this.characterBehindMo(world.character)) {
                    this.otherDirection = true;
                } else {
                    this.otherDirection = false;
                }
            }
            if (this.introWasPlayed) {
                world.endbossStatusBar.x = this.x + 70
                world.endbossStatusBar.y = this.y + 120
            }
            this.pushIntervalids(interval, "endbossTurnArroundInterval", world)
        }, 100);
    }

    /**
     * Returns the character's current X position.
     * @returns {number}
     */
    characterX() {
        return world.character.x
    }

    /**
     * Returns the character's adjusted Y position.
     * @returns {number}
     */
    characterY() {
        let offset = world.character.y - 100
        return offset
    }
}

