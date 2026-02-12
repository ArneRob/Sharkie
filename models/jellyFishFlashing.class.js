class JellyFishFlashing extends MovableObject {

    IMAGES_SWIMMING = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png',
    ];
    offset = {
        top: -10,
        left: -15,
        right: 30,
        bottom: 20,
    };
    jellyFishAnimationInterval = false;

    constructor() {
        super().loadImage('../img/2.Enemy/2 Jelly fish/Dead/Pink/P1.png')
        this.loadImages(this.IMAGES_SWIMMING);
        this.x = 400
        this.y = Math.random() * 400
        this.speed = 0.15
        this.width = 80
        this.height = 80

        this.animate()
    }

    animate() {
        this.moveLeft()
        let interval = setInterval(() => {
            let i = this.currentImage % this.IMAGES_SWIMMING.length
            let path = this.IMAGES_SWIMMING[i];
            this.img = this.imageCache[path]
            this.currentImage++;
            this.pushIntervalids(interval, "jellyFishAnimationInterval", this.world)
        }, 1000 / 5);
    }
}