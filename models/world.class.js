class World {
    character = new Character();
    enemies = [
        new jellyFish(),
        new jellyFish(),
        new jellyFish(),
    ];
    waves = [
        new Wave(),
    ];
    floor = [
        new Floor()
    ];
    backgroundObjects = [
        new BackgroundObject('../img/3.Background/Layers/3.Fondo 1/D.png', 0, 120)
    ];
    canvas;
    ctx;
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.waves);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.floor);

        this.addToMap(this.character);

        this.addObjectsToMap(this.enemies);



        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj)
        });
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width ,mo.height,)
    };

}