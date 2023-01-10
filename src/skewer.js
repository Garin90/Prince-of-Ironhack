class Skewer{
    constructor (ctx, x, y){
        this.ctx = ctx
        this.x = x + Math.floor(Math.random() * 450) + 50;
        this.y = y - 7;
        this.w = 30;
        this.h = 25;
        this.skewerChecker = true;

        this.img = new Image();
        this.img.src = "resources/Skewers.png";

    }

    draw() {
        this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }

    move() {
        this.x -= MOTION;
    }
}