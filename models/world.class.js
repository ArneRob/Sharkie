class World {
    character = new Character();
    coin = level1.coin;
    poisenBottle = level1.poisenBottle
    level = level1;
    enemies = level1.enemies;
    backgroundObjects = level1.backgroundObjects;
    light = level1.light;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinStatusBar = new CoinStatusBar()
    PoisenStatusBar = new PoisenStatusBar()
    throwableObjects = []
    coinSound = new Audio('../audio/coinSound.mp3')

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.checkForItemCollisions();
        this.run()
    }

    setWorld() {
        this.character.world = this;
        for (let index = 0; index < this.coin.length; index++) {
            this.coin[index].setWorld(this);
        };

    }
    run() {
        setInterval(() => {
            this.checkCollisions()
            this.checkThorwObjects()
        }, 300);
        setInterval(() => {
            this.checkForItemCollisions()
        }, 10);
    }
    checkThorwObjects() {
        if (this.keyboard.D) {
            let bubble = new ThrowableObject(this.character.x, this.character.y)
            this.throwableObjects.push(bubble);
        }
    }
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }
    checkForItemCollisions() {
        for (let index = 0; index < this.level.coin.length; index++) {
            if (this.character.isColliding(this.coin[index])) {
                this.coinSound.play()
                this.character.collect();
                this.coin.splice(index, 1)
                this.coinStatusBar.setPercentage(this.character.collectedCoin);
            }
        }
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.light);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar)
        this.addToMap(this.coinStatusBar)
        this.addToMap(this.PoisenStatusBar)
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.poisenBottle);
        this.addObjectsToMap(this.throwableObjects)
        this.addToMap(this.character);


        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj)
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.changeImgDirection(mo)
        }
        mo.draw(this.ctx)
        mo.drawFrame(this.ctx)

        if (mo.otherDirection) {
            this.changeBackImgDirection(mo)
        }
    };
    changeImgDirection(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1
    }
    changeBackImgDirection(mo) {
        mo.x = mo.x * -1
        this.ctx.restore();
    }
}