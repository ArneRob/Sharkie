class CoinStatusBar extends DrawableObject {
    
    percentage = 0;

    /**
    * Creates the coin status bar.
    * Sets position, size, and initializes percentage to 0.
    */
    constructor() {
        super();
        this.loadImages(returnIMAGES_COINBAR())
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
        
        let path = returnIMAGES_COINBAR()[this.resolveImageIndex()];
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