export class Cell {
    constructor(audioIndex, context, x, y, w, h, minOffset, maxOffset) {
        this._audio = document.createElement('audio');
        this._audio.innerHTML = '<source src="' + 'static/synthesized-piano-notes/' + audioIndex + '.mp3' + '" type="audio/mpeg" />'
        this._context = context;
        this._x = x;
        this._y = y;
        this._w = w;
        this._h = h;
        this._minOffset = minOffset;
        this._maxOffset = maxOffset;

        //this._isAlive = Math.random() < 0.5;

        this._isAlive = false;
        this.glider();

        this.draw();
    }

    draw(isGridVisible) {
        this._context.beginPath();

        if (isGridVisible) {
            this._context.rect(this._x, this._y, this._w, this._h);
        }

        if (this._isAlive) {
            this._context.fillRect(this._x, this._y, this._w, this._h);
            this._audio.play().then((r) => {})
        } else {
            this._context.clearRect(this._x, this._y, this._w, this._h);
        }

        this._context.stroke();
    }

    update() {
        let neighbors = [];
        let counter = 0;

        try {
            /*
                left         =   -5      +5
                leftUp       =   -5      -5
                up           =   +5      -5
                rightUp      =   +15     -5
                right        =   +15     +5
                bottomRight  =   +15     +15
                bottom       =   +5      +15
                bottomLeft   =   -5      +15
            */

            let left = this._context.getImageData(this._x - this._minOffset, this._y + this._minOffset, this._w, this._h).data[3];
            let leftUp = this._context.getImageData(this._x - this._minOffset, this._y - this._minOffset, this._w, this._h).data[3];
            let up = this._context.getImageData(this._x + this._minOffset, this._y - this._minOffset, this._w, this._h).data[3];
            let rightUp = this._context.getImageData(this._x + this._maxOffset, this._y - this._minOffset, this._w, this._h).data[3];
            let right = this._context.getImageData(this._x + this._maxOffset, this._y + this._minOffset, this._w, this._h).data[3];
            let bottomRight = this._context.getImageData(this._x + this._maxOffset, this._y + this._maxOffset, this._w, this._h).data[3];
            let bottom = this._context.getImageData(this._x + this._minOffset, this._y + this._maxOffset, this._w, this._h).data[3];
            let bottomLeft = this._context.getImageData(this._x - this._minOffset, this._y + this._maxOffset, this._w, this._h).data[3];

            neighbors.push(left, leftUp, up, rightUp, right, bottomRight, bottom, bottomLeft);

            neighbors.forEach((n) => {
                if (n === 255) counter++;
            });
        } catch (e) {
            console.error('Out of table?\n' + e);
        }

        /* -----+
        | Rules |
        --------+
        | Any live cell with two or three live neighbours survives.
        | Any dead cell with three live neighbours becomes a live cell.
        | All other live cells die in the next generation. Similarly, all other dead cells stay dead.
        +------*/
        if ((counter === 2 || counter === 3) && this._isAlive) {
            this.setAlive(true);
        } else if (counter === 3 && !this._isAlive) {
            this.setAlive(true);
        } else {
            this.setAlive(false);
        }
    }

    glider() {
        if (this._x >= 100 && this._y === 100 && this._x < 130) {
            this._isAlive = true;
        }
        if (this._x === 120 && this._y === 90) {
            this._isAlive = true;
        }
        if (this._x === 110 && this._y === 80) {
            this._isAlive = true;
        }
    }

    setAlive(value) {
        this._isAlive = value;
    }
}