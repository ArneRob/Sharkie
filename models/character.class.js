class Character extends MovableObject {

    IMAGES_SWIMMING = [
        '../img/1.Sharkie/3.Swim/1.png',
        '../img/1.Sharkie/3.Swim/2.png',
        '../img/1.Sharkie/3.Swim/3.png',
        '../img/1.Sharkie/3.Swim/4.png',
        '../img/1.Sharkie/3.Swim/5.png',
        '../img/1.Sharkie/3.Swim/6.png',
    ];
    world;

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
            let i = this.currentImage % this.IMAGES_SWIMMING.length
            let path = this.IMAGES_SWIMMING[i];
            this.img = this.imageCache[path]
            this.currentImage++;
        }, 1000 / 5);
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed * 15;
                this.otherDirection = false;
            }
             if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed * 15;
                this.otherDirection = true;
            }
            if (this.world.keyboard.UP ) {
                this.y -= this.speed * 10;
            }
            if (this.world.keyboard.DOWN ) {
                this.y += this.speed * 10;
            }
            this.world.camera_x = -this.x + 50
        }, 1000 / 60);


    }
}