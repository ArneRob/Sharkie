class JellyFishFlashing extends MovableObject {

    IMAGES_SWIMMING = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png',
    ];
    offset = {
        top: 10,
        left: 15,
        right: 15,
        bottom: 20,
    };
    jellyFishAnimationInterval = false;

    constructor() {
        super().loadImage('../img/2.Enemy/2 Jelly fish/Dead/Pink/P1.png')
        this.loadImages(this.IMAGES_SWIMMING);
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

        let interval = setInterval(() => {
            let i = this.currentImage % this.IMAGES_SWIMMING.length
            let path = this.IMAGES_SWIMMING[i];
            this.img = this.imageCache[path]
            this.currentImage++;
            this.pushIntervalids(interval, "jellyFishAnimationInterval", world)
        }, 1000 / 8);
    }
}