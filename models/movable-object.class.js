class MovableObject extends DrawableObject {
    speed = 0.15
    otherDirection = false;
    energy = 100;
    endbossEnergy = 100;
    collectedCoin = 0;
    collectedPoisenBottle = 0;
    speedY = 0;
    acceleration = 0.3;
    lastHit = 0;
    lastNear = 0;
    lastHitDate = 0;
    applyGravityInterval = false;
    moveLeftInterval = false;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };
    moveLeft() {
        let interval = setInterval(() => {
            this.x -= this.speed;
            this.pushIntervalids(interval, "moveLeftInterval", this.world)
        }, 1000 / 60);
    }

    applyGravity() {
        let interval = setInterval(() => {
            {
                this.y -= this.speedY
                this.speedY += this.acceleration;
                this.pushIntervalids(interval, "applyGravityInterval", this.world)
            }
        }, 1000 / 30);
    }

    playAnimation(images) {
        if (images[0] == "../img/1.Sharkie/3.Swim/1.png") {
            // console.log(this.currentImage % images.length);
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        } else {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }
    enemieIsNear(mo) {
        return this.x + this.width - this.offset.right + 50 > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom + 50 > mo.y + mo.offset.top &&
            this.x + this.offset.left - 50 < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top - 50 < mo.y + mo.height - mo.offset.bottom
    }
    endbossXIntroStart(mo) {
        return this.x + this.width + 180 > mo.x
    }
    characterBehindMo(mo){
        return this.x + this.width < mo.x + mo.width
    }
    // time passed represents time to to pass every X milliseconds for dmg 
    hit() {
        let timePassed = this.lastHitDate + 700
        if (this.lastHit > timePassed || this.lastHit == 0) {
            this.energy -= 20;
            this.lastHit = new Date().getTime();
            this.lastHitDate = this.lastHit
        } else {
            this.lastHit = new Date().getTime();
        }
        if (this.energy < 0) {
            this.energy = 0;
        }
    }

    endbossNearCharacter() {
        this.lastNear = new Date().getTime();
    }
    checkLastNearEndbossTime() {
        let timePassed = new Date().getTime() - this.lastNear;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    collect(item) {
        let key = this.returnObjectEntrieKey(item, 7)
        if (key == "IMAGES_COINS") {
            this.collectedCoin += 20
            if (this.collectedCoin > 100) {
                this.collectedCoin = 100;
            }
        } else {
            this.collectedPoisenBottle += 20
            if (this.collectedPoisenBottle > 100) {
                this.collectedPoisenBottle = 100;
            }
        }
    }

    returnObjectEntrieKey(item, position) {
        let itemKeyObj = Object.entries(item)
        let key = itemKeyObj[position][0]
        return key
    }

    isDead() {
        return this.energy == 0
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }
}