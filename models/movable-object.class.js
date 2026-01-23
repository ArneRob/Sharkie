class MovableObject extends DrawableObject {
    speed = 1.15
    otherDirection = false;
    energy = 100;
    collectedCoin = 0;
    speedY = 0;
    acceleration = 0.3;
    lastHit = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };
    moveRight() {
        console.log("Moving right")
    }
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
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    collect() {
        this.collectedCoin += 20;
        console.log("working");
        
        if (this.collectedCoin > 100) {
            this.collectedCoin = 100;
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