class Torch {
    constructor(ctx, x) {
        this.ctx = ctx;
        this.x = x;
        this.y = Math.floor(Math.random() * 100);
        this.w = 50;
        this.h = 100;

        this.img = new Image();
        this.img.src = "resources/torchPictures.png";
        this.img.frames = 8;
        this.img.frameIndex = 5;

        this.tick = 0;
        

    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.width / this.img.frames,
            0,
            this.img.width / this.img.frames,
            this.img.height,
            this.x, 
            this.y, 
            this.w, 
            this.h
            );
        
        this.animate();      

    }

    move() {
        this.x -= MOTION;
    }

    animate() {
        this.tick++;
        if(this.tick > 5){
            this.img.frameIndex++;
            this.tick = 0;
            if(this.img.frames <= this.img.frameIndex){
                this.img.frameIndex = 5;
            }
        }
        
    }
}