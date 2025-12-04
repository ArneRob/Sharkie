class Character extends MovableObject {

    IMAGES_SWIMMING = [
        '../img/1.Sharkie/1.IDLE/1.png',
        '../img/1.Sharkie/1.IDLE/2.png',
        '../img/1.Sharkie/1.IDLE/3.png',
        '../img/1.Sharkie/1.IDLE/4.png',
        '../img/1.Sharkie/1.IDLE/5.png',
        '../img/1.Sharkie/1.IDLE/6.png',
        '../img/1.Sharkie/1.IDLE/7.png',
        '../img/1.Sharkie/1.IDLE/8.png',
        '../img/1.Sharkie/1.IDLE/9.png',
        '../img/1.Sharkie/1.IDLE/10.png',
        '../img/1.Sharkie/1.IDLE/11.png',
        '../img/1.Sharkie/1.IDLE/12.png',
        '../img/1.Sharkie/1.IDLE/13.png',
        '../img/1.Sharkie/1.IDLE/14.png',
        '../img/1.Sharkie/1.IDLE/15.png',
        '../img/1.Sharkie/1.IDLE/16.png',
        '../img/1.Sharkie/1.IDLE/17.png',
        '../img/1.Sharkie/1.IDLE/18.png',
    ];

    IMAGES_SWIM = [
        "../img/1.Sharkie/3.Swim/1.png",
        "../img/1.Sharkie/3.Swim/2.png",
        "../img/1.Sharkie/3.Swim/4.png",
        "../img/1.Sharkie/3.Swim/5.png",
    ];

    IMAGES_SLAP = [
        '../img/1.Sharkie/4.Attack/Fin slap/1.png',
        '../img/1.Sharkie/4.Attack/Fin slap/2.png',
        '../img/1.Sharkie/4.Attack/Fin slap/3.png',
        '../img/1.Sharkie/4.Attack/Fin slap/4.png',
        '../img/1.Sharkie/4.Attack/Fin slap/5.png',
        '../img/1.Sharkie/4.Attack/Fin slap/6.png',
        '../img/1.Sharkie/4.Attack/Fin slap/7.png',
        '../img/1.Sharkie/4.Attack/Fin slap/8.png',
    ];
    IMAGES_DEAD = [
        '../img/1.Sharkie/6.dead/1.Poisoned/1.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/2.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/3.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/4.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/5.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/6.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/7.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/8.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/9.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/10.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/11.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/12.png',
    ];
    IMAGES_HURT = [
        '../img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        '../img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        '../img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        '../img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
    ];
    world;

    constructor() {
        super().loadImage('../img/1.Sharkie/3.Swim/1.png')
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_SLAP);
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.animate();

        this.width = 250
        this.height = 250

        this.x = 0
        this.y = 50
    }

    animate() {

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD)
            } else
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_SWIM)
                    console.log("swim");
                    if (this.world.keyboard.SPACE) {
                        this.playAnimation(this.IMAGES_SLAP)
                    }
                } else if (this.world.keyboard.SPACE) {
                    this.playAnimation(this.IMAGES_SLAP)
                } else if (this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT)
                } else {
                    this.playAnimation(this.IMAGES_SWIMMING)
                }
        }, 1000 / 6);
        setInterval(() => {

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed * 15;
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed * 15;
                this.otherDirection = true;
            }
            if (this.world.keyboard.UP) {
                this.y -= this.speed * 10;
            }
            if (this.world.keyboard.DOWN) {
                this.y += this.speed * 10;
            }
            this.world.camera_x = -this.x + 50
        }, 1000 / 60);
    }
}