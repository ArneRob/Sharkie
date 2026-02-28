class Keyboard {
    LEFT;
    RIGHT;
    UP;
    DOWN;
    SPACE;
    D;

    constructor() {
        this.bindKeyPressEvents()
        this.bindBtsPressEvents()
    }
    /**
    * Binds touchstart and touchend event listeners to specific HTML button elements.
    * Updates the movement and action states based on user interaction with the mobile controls.
    *
    * @returns {void}
    */
    bindBtsPressEvents() {
        document.getElementById('buttonUp').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.UP = true
        });
        document.getElementById('buttonDown').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.DOWN = true
        });
        document.getElementById('buttonLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true
        });
        document.getElementById('buttonRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true
        });
        document.getElementById('buttonAttack').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true
        });
        document.getElementById('buttonPoisen').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.F = true
        });
        document.getElementById('buttonUp').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.UP = false
        });
        document.getElementById('buttonDown').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.DOWN = false
        });
        document.getElementById('buttonLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false
        });
        document.getElementById('buttonRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false
        });
        document.getElementById('buttonAttack').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false
        });
        document.getElementById('buttonPoisen').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.F = false
        });
    }
    /**
    * Binds keydown and keyup event listeners to the window object.
    * Maps physical key codes (WASD, Arrows, Space, F) to the internal control states.
    *
    * @returns {void}
    */
    bindKeyPressEvents() {
        window.addEventListener('keydown', (event) => {
            if (event.which == 87 || event.which == 38) {
                this.UP = true
            }
            if (event.which == 83 || event.which == 40) {
                this.DOWN = true
            }
            if (event.which == 65 || event.which == 37) {
                this.LEFT = true
            }
            if (event.which == 68 || event.which == 39) {
                this.RIGHT = true
            }
            if (event.which == 32) {
                this.SPACE = true
            }
            if (event.which == 70) {
                this.F = true
            }
            if (event.which === 32 && event.target === document.body) {
                event.preventDefault();
            }
        });
        window.addEventListener('keyup', (event) => {
            if (event.which == 87 || event.which == 38) {
                this.UP = false
            }
            if (event.which == 83 || event.which == 40) {
                this.DOWN = false
            }
            if (event.which == 65 || event.which == 37) {
                this.LEFT = false
            }
            if (event.which == 68 || event.which == 39) {
                this.RIGHT = false
            }
            if (event.which == 32) {
                this.SPACE = false
            }
            if (event.which == 70) {
                this.F = false;
            }
        });
    }
}