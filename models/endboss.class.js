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
    IMAGES_DEAD = [
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
        "../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
    ];

    IMAGES_HIDDEN_ENDBOSS = [
        "../img/2.Enemy/3 Final Enemy/1.Introduce/1.png"
    ]
    endbossFightSound = new Audio('../audio/endbossFight.mp3')
    offset = {
        top: 200,
        left: 30,
        right: 50,
        bottom: 90,
    };
    world;
    endbossIntro = false;
    introWasPlayed = false;
    lastBiteDate = 0;
    endbossFollowInterVal = false;

    constructor() {
        super().loadImage(this.IMAGES_HIDDEN_ENDBOSS[0])
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_FIGHT);
        this.loadImages(this.IMAGES_INTRO_ANIMATION)
        this.loadImages(this.IMAGES_DEAD)

        this.x = 850
        this.y = 0
        this.width = 400
        this.height = 400

        this.animate();
    }

    animate() {
        let i = 0
        setInterval(() => {
            if (this.endbossEnergy <= 0) {
                this.playAnimation(this.IMAGES_DEAD)
            } else {
                if (this.endbossIntro && !this.introWasPlayed) {
                    i = 0
                    this.introWasPlayed = true;
                    this.currentImage = 0;
                }
                if (this.endbossIntro == true && i < 10) {
                    this.playAnimation(this.IMAGES_INTRO_ANIMATION)
                } else if (this.checkLastNearEndbossTime() && this.lastBitePast()) {
                    this.playAnimation(this.IMAGES_FIGHT)
                    this.endbossFightSound.play()
                    this.setLastBite()
                } else if (this.introWasPlayed && i >= 10) {
                    this.playAnimation(this.IMAGES_SWIMMING)
                    this.followCharacter()
                } else {
                    this.playAnimation(this.IMAGES_HIDDEN_ENDBOSS)
                }
            }
            i++
        }, 1000 / 10);
    }
    followCharacter() {
        if (!this.endbossFollowInterVal) {
            this.endbossFollowInterVal = true;
            setInterval(() => {
                if (this.characterX() < this.x) {
                    this.x -= this.speed * 13
                } else if (this.characterX() > this.x) {
                    this.x += this.speed * 13
                }
                if (this.characterY() > this.y) {
                    this.y += this.speed * 13
                } else if (this.characterY() < this.y) {
                    this.y -= this.speed * 13
                }
            }, 1000 / 10);
        }
    }

    characterX() {
        return this.world.character.x
    }
    characterY() {
        let offset = this.world.character.y - 100
        return offset
    }
    lastBitePast() {
        let nowTime = new Date().getTime();
        let timePassed = this.lastBiteDate + 1000
        return nowTime > timePassed || this.lastBiteDate == 0
    }
    setLastBite() {
        let timePassed = this.lastBiteDate + 1000
        let nowTime = new Date().getTime();
        if (nowTime > timePassed || this.lastBiteDate == 0) {
            this.lastBiteDate = new Date().getTime();
        }
    }
}

