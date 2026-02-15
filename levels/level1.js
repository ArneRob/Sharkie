let level1;
function initLevel1() {
    level1 = new Level(
        [
            new JellyFish(),
            new JellyFish(),
            new JellyFish(),
            new JellyFish(),
            new JellyFishFlashing(),
            new JellyFishFlashing(),
            new JellyFishFlashing(),
            new JellyFishFlashing(),
            new JellyFishFlashing(),
            new JellyFishFlashing(),
            new JellyFishFlashing(),
            new JellyFishFlashing(),
            new JellyFishFlashing(),
        ],
        [
            new Endboss(),
        ],
        [
            new Light()
        ],
        [
            new BackgroundObject('../img/3.Background/Layers/5. Water/D2.png', -719),
            new BackgroundObject('../img/3.Background/Layers/4.Fondo 2/D2.png', -719),
            new BackgroundObject('../img/3.Background/Layers/3.Fondo 1/D2.png', -719),
            new BackgroundObject('../img/3.Background/Layers/2. Floor/D2.png', -719),

            new BackgroundObject('../img/3.Background/Layers/5. Water/D1.png', 0),
            new BackgroundObject('../img/3.Background/Layers/4.Fondo 2/D1.png', 0),
            new BackgroundObject('../img/3.Background/Layers/3.Fondo 1/D1.png', 0),
            new BackgroundObject('../img/3.Background/Layers/2. Floor/D1.png', 0),

            new BackgroundObject('../img/3.Background/Layers/5. Water/D2.png', 719),
            new BackgroundObject('../img/3.Background/Layers/4.Fondo 2/D2.png', 719),
            new BackgroundObject('../img/3.Background/Layers/3.Fondo 1/D2.png', 719),
            new BackgroundObject('../img/3.Background/Layers/2. Floor/D2.png', 719),

            new BackgroundObject('../img/3.Background/Layers/5. Water/D1.png', 719 * 2),
            new BackgroundObject('../img/3.Background/Layers/4.Fondo 2/D1.png', 719 * 2),
            new BackgroundObject('../img/3.Background/Layers/3.Fondo 1/D1.png', 719 * 2),
            new BackgroundObject('../img/3.Background/Layers/2. Floor/D1.png', 719 * 2),

            new BackgroundObject('../img/3.Background/Layers/5. Water/D2.png', 719 * 3),
            new BackgroundObject('../img/3.Background/Layers/4.Fondo 2/D2.png', 719 * 3),
            new BackgroundObject('../img/3.Background/Layers/3.Fondo 1/D2.png', 719 * 3),
            new BackgroundObject('../img/3.Background/Layers/2. Floor/D2.png', 719 * 3),

        ],
        [
            new Coin(350, 180),
            new Coin(380, 150),
            new Coin(415, 135),
            new Coin(450, 135),
            new Coin(485, 150),
            new Coin(515, 180),

            new Coin(1250, 100),
            new Coin(1280, 70),
            new Coin(1315, 55),
            new Coin(1350, 55),
            new Coin(1385, 70),
            new Coin(1415, 100),

            new Coin(2050, 40),
        ],
        [
            new PoisenBottle(10, 20),
            new PoisenBottle(10, 20),
            new PoisenBottle(10, 20),
            new PoisenBottle(10, 20),
            new PoisenBottle(10, 20),
            new PoisenBottle(10, 20),
        ],

    );
}

