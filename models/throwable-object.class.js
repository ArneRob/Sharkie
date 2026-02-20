class ThrowableObject extends MovableObject {
    offset = 200
    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png')
        this.x = x + this.offset;
        this.y = y + 70;
        this.throw();
    }

    throw() {
        this.speedY = 0;
        this.applyGravity();
    }
}