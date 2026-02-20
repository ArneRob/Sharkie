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
        '../img/1.Sharkie/2.Long_IDLE/I2.png',
        '../img/1.Sharkie/2.Long_IDLE/I3.png',
        '../img/1.Sharkie/2.Long_IDLE/I4.png',
        '../img/1.Sharkie/2.Long_IDLE/I5.png',
        '../img/1.Sharkie/2.Long_IDLE/I6.png',
        '../img/1.Sharkie/2.Long_IDLE/I7.png',
        '../img/1.Sharkie/2.Long_IDLE/I8.png',
        '../img/1.Sharkie/2.Long_IDLE/I9.png',
        '../img/1.Sharkie/2.Long_IDLE/I10.png',
        '../img/1.Sharkie/2.Long_IDLE/I11.png',
        '../img/1.Sharkie/2.Long_IDLE/I12.png',
        '../img/1.Sharkie/2.Long_IDLE/I13.png',
        '../img/1.Sharkie/2.Long_IDLE/I14.png',
    ];
    IMAGES_IDLE_SLEEP = [
        '../img/1.Sharkie/2.Long_IDLE/I11.png',
        '../img/1.Sharkie/2.Long_IDLE/I12.png',
        '../img/1.Sharkie/2.Long_IDLE/I13.png',
        '../img/1.Sharkie/2.Long_IDLE/I14.png',
    ];
    lastSlap = 0;
    idleTimer = 0;
    IdleCounter = 0;
    idleSleep;
    slapCounter = 0;
    stayAndSlap = false;
    swimAndSlap = false;
    characterAnimationInterval = false;
    keyListenerInterval = false;
    slapAnimationIsOver = true;
    finSlapSound = new Audio('../audio/finSlapSound.mp3')
    characterDeadAnimation = false;
    characterDeadAnimationIsOver = false;
    intervalSpeed = 1000 / 9
    offset = {
        top: 130,
        left: 50,
        right: 60,
        bottom: 70,
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
        let intervalIndex = 0;
        if (!this.characterDeadAnimation) {
            let interval = setInterval(() => {
                if (this.isDead() && !this.characterDeadAnimation && !world.gameOver) {
                    intervalIndex = 0
                    clearInterval(interval)
                    this.intervalSpeed = 1000 / 5
                    this.animate()
                    this.currentImage = 0
                    this.characterDeadAnimation = true;
                }
                if (this.space() && this.slapAnimationIsOver) {
                    intervalIndex = 0
                    this.slapAnimationIsOver = false;
                    this.swimAndSlap = true;
                    this.currentImage = 0;
                }
                if (this.space()) { this.spacePressed() }
                let passedTime = this.idleTimer + 10000;
                let nowTime = new Date().getTime();
                if (this.characterDeadAnimation && this.isDead()) {
                    this.playAnimation(this.IMAGES_DEAD)
                    if (intervalIndex >= 4) {
                        this.characterDeadAnimation = false;
                        this.characterDeadAnimationIsOver = true;
                        world.stopRequestAnimationFrame = true;
                    }
                } else if (this.swimAndSlap && intervalIndex <= 5 && !this.characterDeadAnimationIsOver) {
                    this.playAnimation(this.IMAGES_SLAP)
                    this.finSlapSound.play()
                    this.setTimer()
                    this.ifJellyFishCollisionAndSlap()
                    this.subtractLivePointEndboss()
                    if (intervalIndex == 5) {
                        this.slapAnimationIsOver = true;
                        this.swimAndSlap = false
                    }
                } else if (this.isHurt() && !this.characterDeadAnimationIsOver) {
                    this.playAnimation(this.IMAGES_HURT)
                } else if (world.keyboard.RIGHT || world.keyboard.LEFT && !this.characterDeadAnimationIsOver) {
                    this.playAnimation(this.IMAGES_SWIM)
                } else if (nowTime > passedTime && !this.characterDeadAnimationIsOver) {
                    if (this.IdleCounter <= 7 && !this.idleSleep) {
                        this.playAnimation(this.IMAGES_IDLE_LONG)
                    } else if (!this.characterDeadAnimationIsOver) {
                        this.idleSleep = true
                        this.playAnimation(this.IMAGES_IDLE_SLEEP)
                        this.dropYCoordinate()
                    }
                    this.IdleCounter++
                    if (this.IdleCounter >= 13) { this.IdleCounter == 0 }
                } else if (!this.stayAndSlap && !this.swimAndSlap && !this.characterDeadAnimationIsOver) {
                    this.playAnimation(this.IMAGES_SWIMMING)
                }
                this.pushIntervalids(interval, "characterAnimationInterval", world)
                intervalIndex++
            }, this.intervalSpeed);
            if (!this.keyListenerInterval) {
                let keyListenerInterval = setInterval(() => {

                    if (world.keyboard.RIGHT && this.x < world.level.level_end_x && !this.isDead()) {
                        this.x += this.speed * 20;
                        this.otherDirection = false;
                        this.setTimer()
                    }
                    if (world.keyboard.LEFT && this.x > 0 && !this.isDead()) {
                        this.x -= this.speed * 20;
                        this.otherDirection = true;
                        this.setTimer()
                    } // minus 100 is the offset of the character
                    if (world.keyboard.UP && !this.isDead() && this.y > 0 - 100) {
                        this.y -= this.speed * 10;
                        this.setTimer()
                    }
                    if (world.keyboard.DOWN && !this.isDead() && this.y < world.level.level_end_y) {
                        this.y += this.speed * 10;
                        this.setTimer()
                    }
                    if (this.x <= 200) {
                        world.camera_x = 0
                    } else if(this.x >= 1700) {
                        world.camera_x = -1500
                    } else if(!this.x <= 200){
                        world.camera_x = -this.x + 200
                    }

                    this.pushIntervalids(keyListenerInterval, "keyListenerInterval", world)
                }, 1000 / 60);
            }
        }
    }
    dropYCoordinate() {
        if (this.y < world.level.level_end_y - 50) {
            this.y += 10
        }
    }
    spacePressed() {
        this.spaceWasPressed = new Date().getTime()
    }
    checkIfSpaceWasPressedInRange() {
        let nowTime = new Date().getTime()
        return this.spaceWasPressed + 500 > nowTime
    }
    setEnergyOfEndboss() {
        world.endboss[0].endbossEnergy -= 20
        world.endbossStatusBar.setPercentage(world.endboss[0].endbossEnergy)
    }
    slapTimePassed() {
        let nowTime = new Date().getTime()
        return this.lastSlap + 500 < nowTime
    }
    setSlapTime() {
        this.lastSlap = new Date().getTime()
    }
    space() {
        return world.keyboard.SPACE
    }
    subtractLivePointEndboss() {
        if (this.lastSlap == 0 && this.isColliding(world.endboss[0]) || this.slapTimePassed() && this.isColliding(world.endboss[0])) {
            this.setEnergyOfEndboss()
            this.setSlapTime()
        }
    }
    setTimer() {
        this.idleTimer = new Date().getTime();
        this.idleSleep = false
        this.IdleCounter = 0;
    }

    ifJellyFishCollisionAndSlap() {
        for (let index = 0; index < world.level.enemies.length; index++) {
            if (this.isColliding(world.level.enemies[index]) && this.swimAndSlap) {
                setTimeout(() => {
                    // world.level.enemies.splice(index, 1)
                }, 100);
            }
        }
    }

    hurtSharkie() {
        this.hit();
        world.sharkieHurtSound.play()
        world.statusBar.setPercentage(this.energy);
    }
}