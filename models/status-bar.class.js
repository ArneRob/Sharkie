class StatusBar extends DrawableObject {
    IMAGES_LIVE = [
        '../img/4.Marcadores/green/Life/0_copia_3.png',
        '../img/4.Marcadores/green/Life/20_copia_4.png',
        '../img/4.Marcadores/green/Life/40_copia_3.png',
        '../img/4.Marcadores/green/Life/60_copia_3.png',
        '../img/4.Marcadores/green/Life/80_copia_3.png',
        '../img/4.Marcadores/green/Life/100_copia_2.png',
    ];
    percentage = 100;
    constructor() {
        super();
        this.loadImages(this.IMAGES_LIVE);

        this.x = 20;
        this.y = 30;
        this.width = 200;
        this.height = 60;

        this.setPercentage(100);
    }

    /**
     * Sets the current life percentage and updates the displayed image.
     * @param {number} percentage - Life percentage (0–100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;

        let path = this.IMAGES_LIVE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the correct image index based on life percentage.
     * @returns {number} Index of the life image.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage == 80) {
            return 4;
        } else if (this.percentage == 60) {
            return 3;
        } else if (this.percentage == 40) {
            return 2;
        } else if (this.percentage == 20) {
            return 1;
        } else {
            return 0;
        }
    }
}