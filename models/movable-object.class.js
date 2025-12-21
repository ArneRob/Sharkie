class MovableObject extends DrawableObject {
    speed = 0.15
    otherDirection = false;
    energy = 100;
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
        console.log(this.y + this.height - this.offset.bottom, 60);

        //  return this.x + this.width > mo.x && // wenn hinter x anfang object img 
        //     this.y + this.height > mo.y && // b->t
        //     this.x < mo.x + mo.width && // l->r
        //     this.y < mo.y + mo.height// t->b

        return this.x + this.width - this.offset.right > mo.x + mo.offset.left && // wenn hinter x anfang object img 
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // b->t
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right && // l->r
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom // t->bs


        // return this.x + this.width - this.offset.right < mo.x + mo.offset.left && // vor dem object true
        //     this.y + this.height - this.offset.bottom < mo.y + mo.height - mo.offset.bottom && //über dem object true
        //     this.x + this.offset.left >  mo.x - mo.width/2 && // hinter dem object
        //     this.y < mo.y + this.offset.bottom; //unter der object true
    }
    // 
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
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