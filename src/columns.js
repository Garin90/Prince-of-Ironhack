class Column {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y + 20;
        this.w = 40;
        this.h = 50;

        this.img = new Image();
        this.img.src = "resources/floorColumns.png"
        this.img.frames = 14;
        
    }

    draw() {
        let acc = 0;
        for(let i = 0; i < this.img.frames; i++){
            this.ctx.drawImage(
                this.img,
                this.img.width * i / this.img.frames,
                0,
                this.img.width / this.img.frames,
                this.img.height,
                this.x + acc,
                this.y,
                this.w,
                this.h
            );

            acc += 40;

        }
          

    }

    move() {
        this.x -= MOTION;
    }
    
}