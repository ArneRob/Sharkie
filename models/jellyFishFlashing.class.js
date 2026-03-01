class JellyFishFlashing extends MovableObject {

    IMAGES_SWIMMING = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png',
    ];
    IMAGES_DEAD = [
        '../img/2.Enemy/2 Jelly fish/Dead/green/g1.png',
        '../img/2.Enemy/2 Jelly fish/Dead/green/g2.png',
        '../img/2.Enemy/2 Jelly fish/Dead/green/g3.png',
        '../img/2.Enemy/2 Jelly fish/Dead/green/g4.png',
    ];
    offset = {
        top: 5,
        left: 13,
        right: 13,
        bottom: 18,
    };
    playDeadAnimation = false;
    jellyFishAnimationInterval = false;
    jellyFishFlashingIsDead = false;
    deadThroughBubble = false;
    intervalIndex
    interval

    /**
     * Creates a new flashing jellyfish instance.
     * Loads default, swimming, and dead images,
     * sets initial position, size, and speed,
     * starts the animation loop,
     * and assigns randomized axis coordinates.
     */
    constructor() {
        super().loadImage('../img/2.Enemy/2 Jelly fish/Dead/Pink/P1.png')
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 400
        this.y = 150
        this.speed = 0.15
        this.width = 80
        this.height = 80

        this.animate()
        this.getNewAxisCoordinate(jFishFlashObj, 3, "x")
        this.getNewYCoordinate(jFishFlashObj, "y")
    }

    /**
     * Animates the jellyfish.
     * Checks collisions with the character, applies damage,
     * starts the death animation and plays either swimming
     * or death animations depending on the current state.
     * The interval runs at 8 FPS.
     */
    animate() {
        this.intervalIndex = 0;
        this.interval = setInterval(() => {
            if (this.canInitDeadAnimation()) {
                this.initPlayDeadAnimation()
            }
            if (this.canHurtSharkie()) {
                world.character.hurtSharkie()
            }
            if (this.canExecutePlayDeadAnimation()) {
                this.executePlayDeadAnimation()
            } else if (!this.jellyFishFlashingIsDead) {
                this.playAnimation(this.IMAGES_SWIMMING)
            }
            this.pushIntervalids(this.interval, "jellyFishAnimationInterval", world)
            this.intervalIndex++
        }, 1000 / 8);
    }

    /**
     * Executes the jellyfish death animation.
     */
    executePlayDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD)
        if (this.intervalIndex >= 12) {
            this.jellyFishFlashingIsDead = true;
            this.x = 4000
        }
    }

    /**
     * Checks whether the death animation should be executed.
     * @returns {boolean}
     */
    canExecutePlayDeadAnimation() {
        return this.playDeadAnimation && this.intervalIndex <= 12
    }

    /**
     * Checks whether the jellyfish can hurt the character.
     * @returns {boolean}
     */
    canHurtSharkie() {
        return this.isColliding(world.character) && !this.playDeadAnimation && world.endboss[0].endbossEnergy > 0
    }

    /**
     * Initializes the death animation.
     */
    initPlayDeadAnimation() {
        this.playDeadAnimation = true
        this.intervalIndex = 0;
        this.currentImage = 0;
    }

    /**
     * Checks whether the death animation should be initialized.
     * @returns {boolean}
     */
    canInitDeadAnimation() {
        return this.isColliding(world.character) && world.keyboard.SPACE || this.deadThroughBubble && !this.playDeadAnimation
    }
}