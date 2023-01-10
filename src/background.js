class Background {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 0;
        this.y = 0;
        this.w = this.ctx.canvas.width;
        this.h = this.ctx.canvas.height;
    }

    draw(){
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
        this.ctx.fillRect(this.x + this.w, this.y, this.w, this.h);



        
    }

}

