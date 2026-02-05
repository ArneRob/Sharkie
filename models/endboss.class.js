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
    IMAGES_INTRO_ANIMATION = [
        "../img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
        "../img/2.Enemy/3 Final Enemy/1.Introduce/10.png",
    ];

    IMAGES_HIDDEN_ENDBOSS = [
        "../img/2.Enemy/3 Final Enemy/1.Introduce/1.png"
    ]

    offset = {
        top: 200,
        left: 30,
        right: 50,
        bottom: 90,
    };
    endbossIntro = false;
    introWasPlayed = false;

    constructor() {
        super().loadImage(this.IMAGES_SWIMMING[0])
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_FIGHT);
        this.loadImages(this.IMAGES_INTRO_ANIMATION)
        this.loadImages(this.IMAGES_HIDDEN_ENDBOSS)
        this.x = 850
        this.y = 0
        this.width = 400
        this.height = 400

        this.animate();
    }

    animate() {
        let i = 0
        setInterval(() => {
            if (this.endbossIntro && !this.introWasPlayed) {
                i = 0
                this.introWasPlayed = true;
            }
            if (this.endbossIntro == true && i < 10) {
                this.playAnimation(this.IMAGES_INTRO_ANIMATION)
            } else if (this.checkLastNearEndbossTime()) {
                this.playAnimation(this.IMAGES_FIGHT)
            } else if (this.introWasPlayed) {
                this.playAnimation(this.IMAGES_SWIMMING)
            } else {
                this.playAnimation(this.IMAGES_HIDDEN_ENDBOSS)
            }
            i++
        }, 1000 / 8);
    }
}