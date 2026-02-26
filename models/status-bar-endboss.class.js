class EndbossStatusBar extends DrawableObject {
    IMAGES_LIVE = [
        '../img/4.Marcadores/Purple/0_ .png',
        '../img/4.Marcadores/Purple/20__1.png',
        '../img/4.Marcadores/Purple/40_ .png',
        '../img/4.Marcadores/Purple/60_ .png',
        '../img/4.Marcadores/Purple/80_ .png',
        '../img/4.Marcadores/Purple/100_ .png',
    ];
    world;
    percentage = 100;
    checkIntroEndbossInterval = false;
    constructor() {
        super();
        this.loadImages(this.IMAGES_LIVE);

        this.x = 490;
        this.y = -80;
        this.width = 200;
        this.height = 60;

        this.setPercentage(100);
        this.checkIntroOver();
    }

    /**
     * Sets the endboss life percentage and updates the displayed image.
     * @param {number} percentage - Life percentage (0–100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;

        let path = this.IMAGES_LIVE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Checks if the endboss intro animation is finished.
     * Shows the status bar after intro.
     */
    checkIntroOver() {
        let interval = setInterval(() => {
            if (world.endboss[0].introWasPlayed) {
                this.showEndbossStatusBar();
            }

            this.pushIntervalids(
                interval,
                "checkIntroEndbossInterval",
                world
            );
        }, 200);
    }

    /**
     * Resolves the correct image index based on life percentage.
     * @returns {number} Index of the endboss life image.
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

    /**
     * Makes the endboss status bar visible on screen.
     */
    // showEndbossStatusBar() {
    //     this.y = 70;
    // }
}