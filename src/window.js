class Window {
    constructor(ctx, x){
        this.ctx = ctx;
        this.x = x;
        this.y = Math.floor(Math.random() * 100);
        this.w = 50;
        this.h = 100;

        this.img = new Image();
        this.img.src = "resources/Window.png";

    }

    draw() {
        this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }

    move() {
        this.x -= MOTION;
    }

}



