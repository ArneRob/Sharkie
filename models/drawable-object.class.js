class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 250;
    height = 100;
    width = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

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

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    pushIntervalids(interval, flagName, world) {
        if (world && !this[flagName]) {
            this[flagName] = true;
            world.intervalIds.push(interval)
        }
    }

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

    makeNewNumber(obj, axis) {
        return (this[`${axis}`] * obj.jFishMultiplikator) + (Math.random() * 20)
    }

    getNewYCoordinate(obj, axis) {
        let y = (obj.jellyFlashCounter * this[`${axis}`]) + (Math.random() * 100)
        this[`${axis}`] = y
    }

}