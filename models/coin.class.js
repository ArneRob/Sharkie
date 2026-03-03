class Coin extends MovableObject {
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };
    coinAnimationInterval = false;

    /**
    * Creates a coin at a specific position.
    * Loads animation frames and starts animation.
    */
    constructor(x, y) {
        super().loadImage('../img/4.Marcadores/1. Coins/1.png')
        this.loadImages(returnIMAGES_COINS());
        this.x = x
        this.y = 200 + y
        this.width = 30
        this.height = 30

        this.animate()
    }
     /**
     * Animates the Coin.
     * The interval runs at 6 FPS.
     */
    animate() {
        let interval = setInterval(() => {
           this.playAnimation(returnIMAGES_COINS())
            this.pushIntervalids(interval, "coinAnimationInterval", world)
        }, 1000 / 6);
    }
}