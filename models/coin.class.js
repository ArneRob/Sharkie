class Coin extends DrawableObject{

    IMAGES_COINS = [
        '../img/4.Marcadores/1. Coins/1.png',
        '../img/4.Marcadores/1. Coins/2.png',
        '../img/4.Marcadores/1. Coins/3.png',
        '../img/4.Marcadores/1. Coins/4.png',
    ];
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    constructor() {
        super().loadImage('../img/4.Marcadores/1. Coins/1.png')
        this.loadImages(this.IMAGES_COINS);
        this.x = Math.random()  * 2000
        this.y = Math.random() * 720
        this.width = 30
        this.height = 30

        this.animate()
    }
    
    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_COINS.length
            let path = this.IMAGES_COINS[i];
            this.img = this.imageCache[path]
            this.currentImage++;
        }, 1000 / 6);
    }
}