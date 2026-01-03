const level1 = new Level(
    [
        // new JellyFish(),
        // new JellyFish(),
        // new JellyFish(),
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
        new Coin(50, 100),
        new Coin(80, 70),
        new Coin(115, 55),
        new Coin(150, 55),
        new Coin(185, 70),
        new Coin(215, 100),
    ],
);