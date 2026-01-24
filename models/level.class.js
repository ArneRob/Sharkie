class Level {
    enemies;
    light;
    coin;
    poisenBottle;
    backgroundObjects;
    level_end_x = 2000;

    constructor(enemies, light, backgroundObjects, coin, poisenBottle) {
        this.enemies = enemies;
        this.light = light;
        this.backgroundObjects = backgroundObjects;
        this.coin = coin;
        this.poisenBottle = poisenBottle;
    }
}