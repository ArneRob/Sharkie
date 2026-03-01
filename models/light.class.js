class Light extends MovableObject {
    canvas = document.getElementById('canvas')
    width = 1440;
    height = 480;

    /**
    * Creates a light background layer.
    * Positions it at ground level.
    */
    constructor() {
        super().loadImage('../img/3.Background/Layers/1. Light/COMPLETO.png')

        this.x = 0;
        this.y = 480 - this.height;

    }
}