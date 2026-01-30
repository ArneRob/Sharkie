class Level {
    enemies;
    endboss
    light;
    coin;
    poisenBottle;
    backgroundObjects;
    level_end_x = 2000;

    constructor(enemies, endboss, light, backgroundObjects, coin, poisenBottle) {
        this.enemies = enemies;
        this.endboss = endboss
        this.light = light;
        this.backgroundObjects = backgroundObjects;
        this.coin = coin;
        this.poisenBottle = poisenBottle;
    }
}