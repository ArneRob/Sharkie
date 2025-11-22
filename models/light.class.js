class Light extends MovableObject {
    canvas = document.getElementById('canvas')
    width = 720;
    height = 480;

    constructor() {
        super().loadImage('../img/3.Background/Layers/1. Light/1.png')

        this.x = 0;
        this.y = canvas.height - this.height;

    }
}