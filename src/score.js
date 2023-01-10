class Score {
    constructor(ctx){
        this.ctx = ctx;
        this.x = 10;
        this.y = 10;
        this.totalScore = 0;
    }

    increment() {
        this.totalScore += MOTION;
    }

    draw() {
        this.ctx.fillStyle = "white";
        this.ctx.fillText(`Score: ${this.totalScore}`, this.x, this.y)
    }


}