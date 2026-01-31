class MovableObject extends DrawableObject {
    speed = 0.15
    otherDirection = false;
    energy = 100;
    collectedCoin = 0;
    collectedPoisenBottle = 0;
    speedY = 0;
    acceleration = 0.3;
    lastHit = 0;
    lastNear = 0;
    characterHitsEndboss = false
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    applyGravity() {
        setInterval(() => {
            {
                this.y -= this.speedY
                this.speedY += this.acceleration;
            }
        }, 1000 / 30);
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left && // wenn hinter x anfang object img 
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // b->t
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right && // l->r
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom // t->bs
    }
    enemieIsNear(mo) {
        return this.x + this.width - this.offset.right + 50 > mo.x + mo.offset.left && // wenn hinter x anfang object img 
            this.y + this.height - this.offset.bottom + 50 > mo.y + mo.offset.top && // b->t
            this.x + this.offset.left - 50 < mo.x + mo.width - mo.offset.right && // l->r
            this.y + this.offset.top - 50 < mo.y + mo.height - mo.offset.bottom // t->bs
    }
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
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
        if (item == "collectedCoin") {
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

    isDead() {
        return this.energy == 0
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }
}