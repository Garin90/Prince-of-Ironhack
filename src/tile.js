class Tile {
    constructor (ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = 25;
        this.h = 25;
        this.tilesNumber = 39;
        this.distanceBetweenTiles = 14;


        this.img = new Image();
        this.img.src = "resources/floorTile.png"
        
    }

    draw() {

        let accumulator = 0;
        for(let i = 0; i < this.tilesNumber; i++){
                this.ctx.drawImage(this.img, this.x + accumulator, this.y, this.w, this.h);
                accumulator += this.distanceBetweenTiles;
        }
    }

    move() {
        this.x -= MOTION;
    }
}