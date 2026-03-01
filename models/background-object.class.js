class BackgroundObject extends MovableObject{
    canvas = document.getElementById('canvas')
    width = 720;
    height = 480;
    /**
     * Creates a new generic object with a given image and x position.
    * Positions the object on the ground level.
    */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}