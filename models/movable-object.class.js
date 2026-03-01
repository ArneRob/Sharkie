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
    /**
     * Moves the object to the left continuously.
     */
    moveLeft() {
        let interval = setInterval(() => {
            this.x -= this.speed;
            this.pushIntervalids(interval, "moveLeftInterval", world);
        }, 1000 / 60);
    }

    /**
     * Applies gravity to the object.
     */
    applyGravity() {
        let interval = setInterval(() => {
            this.y -= this.speedY;
            this.speedY += this.acceleration;
            this.pushIntervalids(interval, "applyGravityInterval", world);
        }, 1000 / 30);
    }

    /**
     * Plays an animation using the given image array.
     * @param {string[]} images - Animation image paths.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Checks collision with another movable object.
     * @param {MovableObject} mo - Object to check collision with.
     * @returns {boolean} True if colliding.
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }

    /**
     * Checks if another object is within a given range.
     * @param {MovableObject} mo - Object to check.
     * @param {number} range - Distance range.
     * @returns {boolean} True if object is near.
     */
    enemieIsNear(mo, range) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left - range &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top - range &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right + range &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom + range
        );
    }

    /**
     * Checks if the character reached the endboss intro trigger position.
     * @param {MovableObject} mo - Endboss object.
     * @returns {boolean} True if intro should start.
     */
    endbossXIntroStart(mo) {
        return this.x + this.width + 180 > mo.x;
    }

    /**
     * Checks if the character is behind another object.
     * @param {MovableObject} mo - Object to compare with.
     * @returns {boolean} True if character is behind.
     */
    characterBehindMo(mo) {
        return this.x + this.width < mo.x + mo.width;
    }

    /**
     * Reduces energy when hit, including hit cooldown.
     * if endboss Collision with character then less cooldown
     */
    hit() {
        let timePassed = this.lastHitDate + 700;
        if (world.endbossCollision) { timePassed = this.lastHitDate + 400 }
        if (this.lastHit > timePassed || this.lastHit === 0) {
            this.energy -= 20;
            this.lastHit = new Date().getTime();
            this.lastHitDate = this.lastHit;
        } else {
            this.lastHit = new Date().getTime();
        }

        if (this.energy < 0) {
            this.energy = 0;
        }
    }

    /**
     * Stores the timestamp when the endboss is near.
     */
    endbossNearCharacter() {
        this.lastNear = new Date().getTime();
    }

    /**
     * Checks if the endboss was near recently.
     * @returns {boolean} True if endboss was near within the last second.
     */
    checkLastNearEndbossTime() {
        let timePassed = new Date().getTime() - this.lastNear;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
     * Collects an item and increases the corresponding value.
     * @param {Object} item - Collected item.
     */
    collect(item) {
        let key = this.returnObjectEntrieKey(item, 7);

        if (key === "IMAGES_COINS") {
            this.collectedCoin += 20;
            if (this.collectedCoin > 100) this.collectedCoin = 100;
        } else {
            this.collectedPoisenBottle += 20;
            if (this.collectedPoisenBottle > 100) this.collectedPoisenBottle = 100;
        }
    }

    /**
     * Returns a key from an object entry by index.
     * @param {Object} item - Object to read from.
     * @param {number} position - Entry index.
     * @returns {string} Object key.
     */
    returnObjectEntrieKey(item, position) {
        let itemKeyObj = Object.entries(item);
        return itemKeyObj[position][0];
    }

    /**
     * Checks if the object has no energy left.
     * @returns {boolean} True if dead.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Checks if the object was hit recently.
     * @returns {boolean} True if hurt.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }
}