class jellyFish extends MovableObject {

    IMAGES_SWIMMING_Jelly = [
        '../img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        '../img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        '../img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        '../img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png',
    ];

    constructor() {
        super().loadImage('../img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png')
        this.loadImages(this.IMAGES_SWIMMING_Jelly);
        this.x = 400 + Math.random() * 400
        this.y = Math.random() * 400
        this.speed = 0.15 + Math.random() * 0.25
        this.width = 80
        this.height = 80

        this.animate()
    }

    animate() {
        this.moveLeft()
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_SWIMMING_Jelly.length
            let path = this.IMAGES_SWIMMING_Jelly[i];
            this.img = this.imageCache[path]
            this.currentImage++;
        }, 1000 / 5);
    }
}