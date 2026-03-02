class Keyboard {
    LEFT;
    RIGHT;
    UP;
    DOWN;
    SPACE;
    D;

    /**
    * Initializes keyboard and button event bindings.
    */
    constructor() {
        this.bindKeyPressEvents()
        this.bindBtsPressEvents()
    }

    /**
     * Binds touch events to the control buttons
     * and sets the corresponding movement flags.
     * 
     * touchstart → sets the flag to true
     * touchend   → sets the flag to false
     * 
     * Uses an internal helper function
     * to avoid duplicated code.
     */
    bindBtsPressEvents() {

        const bind = (id, key) => {
            const btn = document.getElementById(id);

            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this[key] = true;
            });

            btn.addEventListener('touchend', (e) => {
                e.preventDefault();
                this[key] = false;
            });
        };

        bind('buttonUp', 'UP');
        bind('buttonDown', 'DOWN');
        bind('buttonLeft', 'LEFT');
        bind('buttonRight', 'RIGHT');
        bind('buttonAttack', 'SPACE');
        bind('buttonPoisen', 'F');
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