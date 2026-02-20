class ThrowableObject extends MovableObject {
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };
    bubbleBurstSound = new Audio('../audio/bubbleBurstSound.mp3')
    soundWasPlayed = false;
    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png')
        this.x = x + 170
        this.y = y + 70;
        this.throw();
        this.checkIntervals()
    }

    throw() {
        this.speedY = 0;
        this.applyGravity();
    }
    checkIntervals() {
        setInterval(() => {
            this.checkEnemiesBubbleHit(world.level.enemies)
        }, 100);
    }

    checkEnemiesBubbleHit(enemies) {
        for (let index = 0; index < enemies.length; index++) {
            if (this.isColliding(enemies[index])) {
                world.enemies[index].deadThroughBubble = true

                setTimeout(() => {
                    this.x = 4000
                    if (!this.soundWasPlayed) {
                        this.soundWasPlayed = true;
                        this.bubbleBurstSound.play()
                    }
                }, 100);
            }
        }
    }
}