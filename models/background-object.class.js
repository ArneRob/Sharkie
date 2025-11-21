class BackgroundObject extends MovableObject{
    canvas = document.getElementById('canvas')
    width = 720;
    height = 310;
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = canvas.height - this.height;
    }
}