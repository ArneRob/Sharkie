class ThrowableObject extends MovableObject {
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };
    bubbleBurstSound = '../audio/bubblePlupSound.mp3';
    soundWasPlayed = false;

    /**
    * Creates a poison bubble.
    * Offsets its position relative to the character
    * and initializes throw behavior.
    */
    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');

        this.x = x + 170;
        this.y = y + 70;

        this.throw();
        this.checkIntervals();
    }

    /**
     * Initializes the throw movement and gravity.
     */
    throw() {
        this.speedY = 0;
        this.applyGravity();
    }

    /**
     * Starts collision checks with enemies and endboss.
     */
    checkIntervals() {
        setInterval(() => {
            this.checkEnemiesBubbleHit(world.level.enemies);

            if (this.isColliding(world.endboss[0])) {
                this.bubbleCharacter(true);
            }
        }, 100);
    }

    /**
     * Checks collision between bubble and enemies.
     * @param {Array} enemies - List of enemies.
     */
    checkEnemiesBubbleHit(enemies) {
        for (let index = 0; index < enemies.length; index++) {
            if (this.isColliding(enemies[index])) {
                world.enemies[index].deadThroughBubble = true;
                this.bubbleCharacter();
            }
        }
    }

    /**
     * Handles bubble burst logic.
     * @param {boolean} [endboss=false] - Indicates if endboss was hit.
     */
    bubbleCharacter(endboss = false) {
        setTimeout(() => {
            this.x = 4000;

            if (!this.soundWasPlayed) {
                this.soundWasPlayed = true;
                world.playSound(this.bubbleBurstSound);

                if (endboss) {
                    world.character.setEnergyOfEndboss();
                }
            }
        }, 100);
    }
}