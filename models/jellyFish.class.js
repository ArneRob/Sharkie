class JellyFish extends MovableObject {

    IMAGES_SWIMMING = [
        '../img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        '../img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        '../img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        '../img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png',
    ];
    offset = {
        top: 12,
        left: 15,
        right: 15,
        bottom: 15,
    };
    jellyFishAnimationInterval = false;

    constructor() {
        super().loadImage('../img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png')
        this.loadImages(this.IMAGES_SWIMMING);
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
        let interval = setInterval(() => {
            let i = this.currentImage % this.IMAGES_SWIMMING.length
            let path = this.IMAGES_SWIMMING[i];
            this.img = this.imageCache[path]
            this.currentImage++;
            this.pushIntervalids(interval, "jellyFishAnimationInterval", world)
        }, 1000 / 5);
    }
}