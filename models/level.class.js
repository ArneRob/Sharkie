class Level {
    enemies;
    light;
    coin;
    backgroundObjects;
    level_end_x = 2000;

    constructor(enemies, light, backgroundObjects, coin) {
        this.enemies = enemies;
        this.light = light;
        this.backgroundObjects = backgroundObjects;
        this.coin = coin;
    }
}