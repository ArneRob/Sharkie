class Character extends MovableObject {
    constructor() {
        super().loadImage('../img/1.Sharkie/3.Swim/1.png')
        this.loadImages([
            '../img/1.Sharkie/3.Swim/1.png',
            '../img/1.Sharkie/3.Swim/2.png',
            '../img/1.Sharkie/3.Swim/3.png',
            '../img/1.Sharkie/3.Swim/4.png',
            '../img/1.Sharkie/3.Swim/5.png',
            '../img/1.Sharkie/3.Swim/6.png',
        ]);

        this.width = 250
        this.height = 250

        this.x = 0
        this.y = 50
    }
}