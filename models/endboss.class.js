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
    endbossOtherDirection = false;
    endbossAnimationIntervalIsPushed = false;
    endbossFollowIntervalIsPushed = false;
    endbossTurnArroundInterval = false;
    endbossIntro = false;
    introWasPlayed = false;
    endbossFollowInterVal = false;
    endbossFightImageCounter = 0;
    endbossDeadAnimation = false;
    endbossDeadAnimationIsOver = false;

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
        this.check()
    }

    animate() {
        let intervalIndex = 0
        let endbossAnimationInterval = setInterval(() => {
            if (this.endbossEnergy <= 0 && !this.endbossDeadAnimation && !world.gameOver) {
                intervalIndex = 0
                this.endbossDeadAnimation = true;
            }
            if (this.endbossEnergy <= 0 && this.endbossDeadAnimation) {
                this.playAnimation(this.IMAGES_DEAD)
                if (intervalIndex <= 4) {
                    this.endbossDeadAnimation = false;
                    this.endbossDeadAnimationIsOver = true;
                }
            } else {
                if (this.endbossIntro && !this.introWasPlayed) {
                    intervalIndex = 0
                    this.introWasPlayed = true;
                    this.currentImage = 0;
                }
                if (this.endbossIntro && intervalIndex < 10) {
                    this.playAnimation(this.IMAGES_INTRO_ANIMATION)
                    if (intervalIndex == 10) { this.endbossIntro = false; }
                } else if (this.checkLastNearEndbossTime()) {
                    this.currentImage = this.endbossFightImageCounter
                    this.playAnimation(this.IMAGES_FIGHT)
                    this.endbossFightSound.play()
                    this.endbossFightImageCounter++

                    if (this.endbossFightImageCounter >= 6) {
                        this.endbossFightImageCounter = 0;
                    }
                } else if (this.introWasPlayed && intervalIndex >= 10 && !this.checkLastNearEndbossTime()) {
                    this.playAnimation(this.IMAGES_SWIMMING)
                    this.followCharacter()
                } else {
                    this.playAnimation(this.IMAGES_HIDDEN_ENDBOSS)
                }
            } this.pushIntervalids(endbossAnimationInterval, "endbossAnimationIntervalIsPushed", world)
            intervalIndex++
        }, 1000 / 10);
    }
    followCharacter() {
        if (!this.endbossFollowInterVal) {
            this.endbossFollowInterVal = true;

            let interval = setInterval(() => {
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
                this.pushIntervalids(interval, "endbossFollowIntervalIsPushed", world)
            }, 1000 / 10);
        }

    }
    check() {
        let interval = setInterval(() => {
            if (world) {
                if (this.characterBehindMo(world.character)) {
                    this.otherDirection = true;
                } else {
                    this.otherDirection = false;
                }
            }
            this.pushIntervalids(interval, "endbossTurnArroundInterval", world)
        }, 100);
    }

    characterX() {
        return world.character.x
    }
    characterY() {
        let offset = world.character.y - 100
        return offset
    }
}

