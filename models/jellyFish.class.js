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
        top: 12,
        left: 15,
        right: 15,
        bottom: 15,
    };
    jellyFishAnimationInterval = false;
    deadThroughBubble = false;

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

    animate() {
        this.moveLeft()
        let intervalIndex = 0;
        let interval = setInterval(() => {
            if (this.isColliding(world.character) && world.keyboard.SPACE || this.deadThroughBubble && !this.playDeadAnimation) {
                this.playDeadAnimation = true
                intervalIndex = 0;
                this.currentImage = 0;
            }
            if (this.isColliding(world.character) && !this.playDeadAnimation && world.endboss[0].endbossEnergy > 0) {
                world.character.hurtSharkie()
            }
            if (this.playDeadAnimation && intervalIndex <= 12) {
                this.playAnimation(this.IMAGES_DEAD)
                if (intervalIndex >= 12) {
                    this.jellyFishFlashingIsDead = true;
                    this.x = 4000
                }
            } else if (!this.jellyFishFlashingIsDead) {
                this.playAnimation(this.IMAGES_SWIMMING)
            }
            this.pushIntervalids(interval, "jellyFishAnimationInterval", world)
            intervalIndex++
        }, 1000 / 8);
    }
}