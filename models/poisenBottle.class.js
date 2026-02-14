class PoisenBottle extends DrawableObject {

    IMAGES_POISEN = [
        '../img/4.Marcadores/Posión/Animada/1.png',
        '../img/4.Marcadores/Posión/Animada/2.png',
        '../img/4.Marcadores/Posión/Animada/3.png',
        '../img/4.Marcadores/Posión/Animada/4.png',
    ];
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };
    poisenBottleAnimateInterval = false;
    constructor(x, y) {
        super().loadImage('../img/4.Marcadores/Posión/Animada/1.png')
        this.loadImages(this.IMAGES_POISEN);
        this.x = 200 + Math.random() * 1000
        this.y = 400
        this.width = 50
        this.height = 70

        this.animate()
    }

    animate() {
       let interval = setInterval(() => {
            let i = this.currentImage % this.IMAGES_POISEN.length
            let path = this.IMAGES_POISEN[i];
            this.img = this.imageCache[path]
            this.currentImage++;
            this.pushIntervalids(interval, "poisenBottleAnimateInterval", world)
        }, 1000 / 6);
    }
}