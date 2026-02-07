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
    IMAGES_IDLE_LONG = [
        '../img/1.Sharkie/2.Long_IDLE/i1.png',
        '../img/1.Sharkie/2.Long_IDLE/i2.png',
        '../img/1.Sharkie/2.Long_IDLE/i3.png',
        '../img/1.Sharkie/2.Long_IDLE/i4.png',
        '../img/1.Sharkie/2.Long_IDLE/i5.png',
        '../img/1.Sharkie/2.Long_IDLE/i6.png',
        '../img/1.Sharkie/2.Long_IDLE/i7.png',
        '../img/1.Sharkie/2.Long_IDLE/i8.png',
        '../img/1.Sharkie/2.Long_IDLE/i9.png',
        '../img/1.Sharkie/2.Long_IDLE/i10.png',
        '../img/1.Sharkie/2.Long_IDLE/i11.png',
        '../img/1.Sharkie/2.Long_IDLE/i12.png',
        '../img/1.Sharkie/2.Long_IDLE/i13.png',
        '../img/1.Sharkie/2.Long_IDLE/I14.png',
    ];
    IMAGES_IDLE_SLEEP = [
        '../img/1.Sharkie/2.Long_IDLE/i11.png',
        '../img/1.Sharkie/2.Long_IDLE/i12.png',
        '../img/1.Sharkie/2.Long_IDLE/i13.png',
        '../img/1.Sharkie/2.Long_IDLE/I14.png',
    ];
    world;
    lastSlap = 0;
    idleTimer = 0;
    IdleCounter = 0;
    idleSleep;
    offset = {
        top: 120,
        left: 50,
        right: 50,
        bottom: 60,
    };

    constructor() {
        super().loadImage('../img/1.Sharkie/3.Swim/1.png')
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_SLAP);
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE_LONG)
        this.loadImages(this.IMAGES_IDLE_SLEEP)
        this.animate();
        this.setTimer()
        this.width = 250
        this.height = 250

        this.x = 0
        this.y = 50
    }

    animate() {
        setInterval(() => {
            console.log(this.idleTimer);
            let passedTime = this.idleTimer + 10000;
            let nowTime = new Date().getTime();
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD)
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_SWIM)
            } else if (this.spaceAndSlapTimePassed() || this.spaceAndSlapTimeIsNull()) {
                this.animateAndSaveSlapTime()
                this.subtractLivePointEndboss()
            } else if (this.spaceAndSlapTimePassed() || this.spaceAndSlapTimeIsNull()) {
                this.animateAndSaveSlapTime()
                this.subtractLivePointEndboss()
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT)
            } else if (nowTime > passedTime) {
                if (this.IdleCounter <= 7 && !this.idleSleep) {
                    this.playAnimation(this.IMAGES_IDLE_LONG)
                } else {
                    this.idleSleep = true
                    this.playAnimation(this.IMAGES_IDLE_SLEEP)
                }
                this.IdleCounter++
                if (this.IdleCounter >= 13) { this.IdleCounter == 0 }
            } else {
                this.playAnimation(this.IMAGES_SWIMMING)
            }

        }, 1000 / 9);
        setInterval(() => {

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isDead()) {
                this.x += this.speed * 20;
                this.otherDirection = false;
                this.setTimer()
            }
            if (this.world.keyboard.LEFT && this.x > 0 && !this.isDead()) {
                this.x -= this.speed * 20;
                this.otherDirection = true;
                this.setTimer()
            } // minus 100 is the offset of the character
            if (this.world.keyboard.UP && !this.isDead() && this.y > 0 - 100) {
                this.y -= this.speed * 10;
                this.setTimer()
            }
            if (this.world.keyboard.DOWN && !this.isDead() && this.y < this.world.level.level_end_y) {
                this.y += this.speed * 10;
                this.setTimer()
            }
            this.world.camera_x = -this.x + 50
        }, 1000 / 60);
    }
    setEnergyOfEndboss() {
        this.world.endboss[0].endbossEnergy -= 20
        this.world.endbossStatusBar.setPercentage(this.world.endboss[0].endbossEnergy)
    }
    slapTimePassed() {
        let nowTime = new Date().getTime()
        return this.lastSlap + 700 < nowTime
    }
    setSlapTime() {
        this.lastSlap = new Date().getTime()
    }
    spaceAndSlapTimePassed() {
        return this.world.keyboard.SPACE && this.slapTimePassed()
    }
    spaceAndSlapTimeIsNull() {
        return this.world.keyboard.SPACE && this.lastSlap == 0
    }
    animateAndSaveSlapTime() {
        this.playAnimation(this.IMAGES_SLAP)
        setTimeout(() => {
            this.setSlapTime()
        }, 700);
    }
    subtractLivePointEndboss() {
        if (this.isColliding(this.world.endboss[0]) || this.lastSlap == 0 && this.isColliding(this.world.endboss[0])) {
            this.setEnergyOfEndboss()
        }
    }
    setTimer() {
        this.idleTimer = new Date().getTime();
        this.idleSleep = false
        this.IdleCounter = 0;
    }
}