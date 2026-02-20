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
        top: 10,
        left: 15,
        right: 15,
        bottom: 20,
    };
    playDeadAnimation = false;
    jellyFishAnimationInterval = false;
    jellyFishFlashingIsDead = false;
    deadThroughBubble = false;

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

    animate() {
        let intervalIndex = 0;
        let interval = setInterval(() => {
            if (this.isColliding(world.character) && world.keyboard.SPACE || this.deadThroughBubble &&  !this.playDeadAnimation) {
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