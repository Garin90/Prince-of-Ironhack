class GameOver {
    constructor(ctx){
        this.ctx = ctx;
        this.x = 0;
        this.y = 0;
        this.w = this.ctx.canvas.width;
        this.h = this.ctx.canvas.height;

        this.img = new Image();
        this.img.src = "resources/GameOverImage.png"
    }

    draw(totalScore) {
        this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        this.ctx.fillStyle = "white";
        this.ctx.font = "bold 48px serif";
        this.ctx.fillText(`SCORE: ${totalScore}`, this.w / 2 - 125, 100);
    
    }

}