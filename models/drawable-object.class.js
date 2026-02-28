class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 250;
    height = 100;
    width = 100;
    /**
    * Loads a single image from the specified path and assigns it to the img property.
    *
    * @param {string} path - The file path or URL of the image to be loaded.
    * @returns {void}
    */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
    * Draws the current image onto the provided 2D rendering context at the object's coordinates.
    *
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context used for drawing.
    * @returns {void}
    */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    /**
    * Draws a debug frame (bounding box) around specific game entities to visualize collision areas.
    * Special color handling is applied if the object is an instance of Endboss.
    *
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context used for drawing.
    * @returns {void}
    */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof JellyFish || this instanceof Endboss || this instanceof JellyFishFlashing) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
            ctx.stroke();
            if (this instanceof Endboss) {
                ctx.beginPath();
                ctx.lineWidth = '5';
                ctx.strokeStyle = 'red';
                ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
                ctx.stroke();
            }
        }
    }

    /**
    * Preloads multiple images from an array of paths and stores them in the imageCache object.
    *
    * @param {string[]} arr - An array containing the file paths of the images to be loaded.
    * @returns {void}
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
    * Stores an interval ID in the world's collection if a specific flag is not yet set.
    *
    * @param {number} interval - The ID of the interval to be stored.
    * @param {string} flagName - The property name used as a toggle flag on the current object.
    * @param {Object} world - The world object containing the intervalIds array.
    * @returns {void}
    */
    pushIntervalids(interval, flagName, world) {
        if (world && !this[flagName]) {
            this[flagName] = true;
            world.intervalIds.push(interval)
        }
    }

    /**
    * Calculates and updates the coordinate for a specific axis based on a flashing counter logic.
    *
    * @param {Object} obj - The object containing state information like jellyFlashCounter and multipliers.
    * @param {number} counter - The threshold at which the counter resets and the multiplier increases.
    * @param {string} axis - The axis to update (e.g., 'x' or 'y').
    * @returns {void}
    */
    getNewAxisCoordinate(obj, counter, axis) {
        if (obj.jellyFlashCounter == 0) {
            this[`${axis}`] = this.makeNewNumber(obj, axis)
            obj.savedXForFlashingJelly = this[`${axis}`]
            obj.jellyFlashCounter++
        } else {
            this[`${axis}`] = obj.savedXForFlashingJelly
            obj.jellyFlashCounter++
        }
        if (obj.jellyFlashCounter >= counter) {
            obj.jellyFlashCounter = 0
            obj.jFishMultiplikator++
        }
    }

    /**
    * Generates a new coordinate number based on the current axis value, a multiplier, and a random offset.
    *
    * @param {Object} obj - The object providing the jFishMultiplikator.
    * @param {string} axis - The axis property name to read from.
    * @returns {number} The calculated coordinate value.
    */
    makeNewNumber(obj, axis) {
        return (this[`${axis}`] * obj.jFishMultiplikator) + (Math.random() * 20)
    }

    /**
    * Calculates and updates the Y-coordinate using a flash counter and a random offset.
    *
    * @param {Object} obj - The object providing the jellyFlashCounter state.
    * @param {string} axis - The axis property name to update.
    * @returns {void}
    */
    getNewYCoordinate(obj, axis) {
        let y = (obj.jellyFlashCounter * this[`${axis}`]) + (Math.random() * 100)
        this[`${axis}`] = y
    }

}