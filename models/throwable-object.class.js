class ThrowableObject extends MovableObject {
    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png')
        this.x = x + 200;
        this.y = y + 70;
        this.throw();
    }

    throw() {
        this.speedY = 0;
        this.applyGravity();
    }
}