class World {
    character = new Character();
    coin = level1.coin;
    poisenBottle = level1.poisenBottle
    level = level1;
    enemies = level1.enemies;
    endboss = level1.endboss;
    backgroundObjects = level1.backgroundObjects;
    light = level1.light;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinStatusBar = new CoinStatusBar()
    poisenStatusBar = new PoisenStatusBar()
    throwableObjects = []
    coinSound = new Audio('../audio/coinSound.mp3')
    poisenBottleSound = new Audio('../audio/poisenBottleSound.mp3')
    underwaterBubble = new Audio('../audio/underwaterBubble.mp3')
    sharkieHurtSound = new Audio('../audio/sharkieHurt.mp3')
    endbossFightSound = new Audio('../audio/endbossFight.mp3')


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.checkForItemCollisions();
        this.run()
        this.runSounds()
    }

    setWorld() {
        this.character.world = this;
        for (let index = 0; index < this.coin.length; index++) {
            this.coin[index].setWorld(this);
        };

    }
    runSounds() {
        setInterval(() => {
            if (getLocalStorageItem("mute")) {
                this.poisenBottleSound.volume = 0
                this.underwaterBubble.volume = 0
                this.coinSound.volume = 0
                this.sharkieHurtSound.volume = 0
                this.endbossFightSound.volume = 0
            } else {
                this.poisenBottle.preload = "auto"
                this.coinSound.volume = 0.5
                this.endbossFightSound.volume = 0.5
                this.sharkieHurtSound.volume = 0.5
                this.poisenBottleSound.volume = 0.5
                this.underwaterBubble.volume = 0.1
                this.underwaterBubble.loop = true
            }
           this.underwaterBubble.play()
        }, 500);
       
    }
    run() {
        setInterval(() => {
            this.checkCollisions()
            this.checkThrowObjects()
            this.checkIfEnemieIsNear()
        }, 400);
        setInterval(() => {
            this.checkForItemCollisions()
        }, 10);
    }
    checkThrowObjects() {
        if (this.keyboard.F && this.character.collectedPoisenBottle > 0) {
            let bubble = new ThrowableObject(this.character.x, this.character.y)
            this.throwableObjects.push(bubble);
            this.character.collectedPoisenBottle -= 20
            this.poisenStatusBar.setPercentage(this.character.collectedPoisenBottle);
        }
    }
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.sharkieHurtSound.play()
                this.statusBar.setPercentage(this.character.energy);
            }
        });
        if (this.character.isColliding(this.level.endboss[0])) {
            this.character.hit();
            this.sharkieHurtSound.play()

            this.statusBar.setPercentage(this.character.energy);
        }
    }
    checkIfEnemieIsNear() {
        if (this.character.enemieIsNear(this.level.endboss[0])) {
            this.endboss[0].endbossNearCharacter()
            this.endbossFightSound.play()
        }
    }
    checkForItemCollisions() {
        this.ifCoinCollision();
        this.ifPoisenBottleCollision();
    }
    ifCoinCollision() {
        for (let index = 0; index < this.level.coin.length; index++) {
            if (this.character.isColliding(this.coin[index])) {
                this.coinSound.play()
                this.character.collect("collectedCoin");
                this.coin.splice(index, 1)
                this.coinStatusBar.setPercentage(this.character.collectedCoin);
            }
        }
    }
    ifPoisenBottleCollision() {
        for (let index = 0; index < this.level.poisenBottle.length; index++) {
            if (this.character.isColliding(this.poisenBottle[index])) {
                this.poisenBottleSound.play()
                this.character.collect("collectedPoisenBottle");
                this.poisenBottle.splice(index, 1)
                this.poisenStatusBar.setPercentage(this.character.collectedPoisenBottle);
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
        this.addToMap(this.poisenStatusBar)
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
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