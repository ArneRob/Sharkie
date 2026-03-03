class Keyboard {
    LEFT;
    RIGHT;
    UP;
    DOWN;
    SPACE;
    D;

    keyMap = {
        87: 'UP', 38: 'UP',
        83: 'DOWN', 40: 'DOWN',
        65: 'LEFT', 37: 'LEFT',
        68: 'RIGHT', 39: 'RIGHT',
        32: 'SPACE',
        70: 'F'
    };

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
            const key = this.keyMap[event.which];
            if (key) this[key] = true;

            if (event.which === 32 && event.target === document.body) {
                event.preventDefault();
            }
        });

        window.addEventListener('keyup', (event) => {
            const key = this.keyMap[event.which];
            if (key) this[key] = false;
        });
    }
}