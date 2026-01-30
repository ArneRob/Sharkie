class Endboss extends MovableObject {
    IMAGES_SWIMMING = [
        "../img/2.Enemy/3 Final Enemy/2.floating/1.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/2.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/3.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/4.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/5.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/6.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/7.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/8.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/9.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/10.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/11.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/12.png",
        "../img/2.Enemy/3 Final Enemy/2.floating/13.png",
    ];

    IMAGES_FIGHT = [
        "../img/2.Enemy/3 Final Enemy/Attack/1.png",
        "../img/2.Enemy/3 Final Enemy/Attack/2.png",
        "../img/2.Enemy/3 Final Enemy/Attack/3.png",
        "../img/2.Enemy/3 Final Enemy/Attack/4.png",
        "../img/2.Enemy/3 Final Enemy/Attack/5.png",
        "../img/2.Enemy/3 Final Enemy/Attack/6.png",
    ];
    offset = {
        top: 200,
        left: 30,
        right: 50,
        bottom: 90,
    };
    endbossFightSound = new Audio('../audio/endbossFight.mp3')

    constructor() {
        super().loadImage(this.IMAGES_SWIMMING[0])
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_FIGHT);
        this.x = 350
        this.y = 0
        this.width = 400
        this.height = 400

        this.animate();
    }

    animate() {
        setInterval(() => {
                this.playAnimation(this.IMAGES_SWIMMING)
        }, 1000 / 6);
    }
    
    animateFight() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_FIGHT)
        }, 1000 / 4);
        setInterval(() => {
            this.endbossFightSound.volume = 0.5
            this.endbossFightSound.play()
        }, 1000);
    }

}