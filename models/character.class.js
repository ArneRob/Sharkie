class Character extends MovableObject {

    IMAGES_SWIMMING = [
        '../img/1.Sharkie/3.Swim/1.png',
        '../img/1.Sharkie/3.Swim/2.png',
        '../img/1.Sharkie/3.Swim/3.png',
        '../img/1.Sharkie/3.Swim/4.png',
        '../img/1.Sharkie/3.Swim/5.png',
        '../img/1.Sharkie/3.Swim/6.png',
    ];
    currentImage = 0;

    constructor() {
        super().loadImage('../img/1.Sharkie/3.Swim/1.png')
        this.loadImages(this.IMAGES_SWIMMING);

        this.animate();

        this.width = 250
        this.height = 250

        this.x = 0
        this.y = 50
    }

    animate() {
        setInterval(() => {
            let path = this.IMAGES_SWIMMING[this.currentImage];
            this.img = this.imageCache[path]
            this.currentImage++;
            if (this.currentImage > 5) {
                this.currentImage = 0
            }
        }, 1000 / 5);

    }
}