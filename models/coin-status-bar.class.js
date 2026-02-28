class CoinStatusBar extends DrawableObject {
    IMAGES_COINBAR = [
        '../img/4.Marcadores/green/Coin/0_copia4.png',
        '../img/4.Marcadores/green/Coin/20_copia2.png',
        '../img/4.Marcadores/green/Coin/40_copia4.png',
        '../img/4.Marcadores/green/Coin/60_copia4.png',
        '../img/4.Marcadores/green/Coin/80_copia4.png',
        '../img/4.Marcadores/green/Coin/100_copia4.png',
    ];

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINBAR)
        this.x = 20;
        this.y = 70;
        this.width = 200
        this.height = 60;
        this.setPercentage(0)
    }

    /**
    * Sets the percentage value of the bar and updates the corresponding image.
    *
    * @param {number} percentage - The percentage value (e.g., 0, 20, 40, 60, 80, 100).
    * @returns {void}
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        
        let path = this.IMAGES_COINBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
    * Resolves the image array index based on the current percentage value.
    *
    * @returns {number} The index (0-5) corresponding to the image in the coin bar array.
    */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage == 80) {
            return 4
        } else if (this.percentage == 60) {
            return 3
        } else if (this.percentage == 40) {
            return 2
        } else if (this.percentage == 20) {
            return 1
        } else {
            return 0
        }
    }
}