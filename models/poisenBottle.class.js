class PoisenBottle extends MovableObject {
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };
    poisenBottleAnimateInterval = false;

    /**
    * Creates a poison bottle.
    * Randomizes horizontal position and starts animation.
    */
    constructor() {
        super().loadImage('../img/4.Marcadores/Posión/Animada/1.png');

        this.loadImages(returnIMAGES_POISENBOTTLE());

        this.x = 200 + Math.random() * 1000;
        this.y = 400;
        this.width = 50;
        this.height = 70;

        this.animate();
    }

    /**
     * Starts the poison bottle animation loop.
     */
    animate() {
        let interval = setInterval(() => {
            this.playAnimation(returnIMAGES_POISENBOTTLE())
            this.pushIntervalids(
                interval,
                "poisenBottleAnimateInterval",
                world
            );
        }, 1000 / 6);
    }
}