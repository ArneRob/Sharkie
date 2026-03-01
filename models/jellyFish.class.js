class JellyFish extends MovableObject {

    IMAGES_SWIMMING = [
        '../img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        '../img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        '../img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        '../img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png',
    ];
    IMAGES_DEAD = [
        '../img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        '../img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
        '../img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        '../img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png',
    ];
    offset = {
        top: 5,
        left: 13,
        right: 13,
        bottom: 18,
    };
    jellyFishAnimationInterval = false;
    deadThroughBubble = false;
    intervalIndex = 0;
    interval

    /**
     * Creates a new regular jellyfish instance.
     * Loads default, swimming, and dead images,
     * sets randomized vertical position and speed,
     * defines size and horizontal position,
     * assigns a new X axis coordinate,
     * and starts the animation loop.
     */
    constructor() {
        super().loadImage('../img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png')
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 400
        this.y = Math.random() * 400
        this.speed = 0.15 + Math.random() * 0.25
        this.width = 80
        this.height = 80
        this.getNewAxisCoordinate(jFishObj, 1, "x")
        this.animate()
    }

    /**
     * Animates the jellyfish.
     * Moves it to the left, checks collisions with the character,
     * applies damage, and handles swimming or death animations.
     * The interval runs at 8 FPS.
     */
    animate() {
        this.moveLeft()
        this.intervalIndex = 0;
        this.interval = setInterval(() => {
            if (this.canPlayDeadAnimation()) {
                this.initDeadAnimation()
            }
            if (this.canHurtSharkie()) {
                world.character.hurtSharkie()
            }
            if (this.canExecuteDeath()) {
                this.jellyFishExecuteDeath()
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
    jellyFishExecuteDeath() {
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
    canExecuteDeath() {
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
    initDeadAnimation() {
        this.playDeadAnimation = true
        this.intervalIndex = 0;
        this.currentImage = 0;
    }

    /**
     * Checks whether the death animation should be started.
     * @returns {boolean}
     */
    canPlayDeadAnimation() {
        return this.isColliding(world.character) && world.keyboard.SPACE || this.deadThroughBubble && !this.playDeadAnimation
    }
}