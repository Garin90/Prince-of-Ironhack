class Prince {
    constructor(ctx){
        this.ctx = ctx;
        this.x = 10;
        this.y = 50;
        this.w = 25;
        this.h = 50;
        this.vx = 0;
        this.vy = 0;
        this.ay = 0.1;
        this.positionFrame = 1;
        this.tickRight = 0;
        this.tickLeft = 0;
        this.motionCounter = 0;

        this.imgLeft = new Image();
        this.imgLeft.src = "resources/princeAloneLeft.png";

        this.imgRight = new Image();
        this.imgRight.src = "resources/princeAloneRight.png";

        this.imgRunRight = new Image();
        this.imgRunRight.src = "resources/runRight.png";
        this.imgRunRight.frames = 4;
        this.imgRunRight.frameIndex = 3;

        this.imgRunLeft = new Image();
        this.imgRunLeft.src = "resources/runLeft.png";
        this.imgRunLeft.frames = 4;
        this.imgRunLeft.frameIndex = 0;

        this.imgJump = new Image();
        this.imgJump.src = "resources/princeJumping.png";


        
    }  

    draw(halfCanvas) {
   
        if(this.positionFrame === 1 && this.vx === 0 && this.x <= halfCanvas && this.vy === 0) {
            this.ctx.drawImage(this.imgRight, this.x, this.y, this.w, this.h);
        }
        else if(this.positionFrame === -1 && this.vx === 0 && this.x <= halfCanvas && this.vy === 0) {
            this.ctx.drawImage(this.imgLeft, this.x, this.y - 3, this.w, this.h + 1);
        }
        else if ((this.vx > 0 || this.x > this.ctx.canvas.width/2 || this.x > halfCanvas) && this.vy === 0){
            this.ctx.drawImage(
                this.imgRunRight,
                this.imgRunRight.frameIndex * this.imgRunRight.width / this.imgRunRight.frames,
                0,
                this.imgRunRight.width / this.imgRunRight.frames,
                this.imgRunRight.height,
                this.x, 
                this.y, 
                this.w, 
                this.h 
            )
            this.animateRight();
            this.positionFrame = 1;
        }

        else if (this.vx < 0 && this.x <= halfCanvas && this.vy === 0){
            this.ctx.drawImage(
                this.imgRunLeft,
                this.imgRunLeft.frameIndex * this.imgRunLeft.width / this.imgRunLeft.frames,
                0,
                this.imgRunLeft.width / this.imgRunLeft.frames,
                this.imgRunLeft.height,
                this.x, 
                this.y, 
                this.w, 
                this.h 
            )
            this.animateLeft();
            this.positionFrame = -1;
        } else if (this.vy != 0){
            this.ctx.drawImage (this.imgJump, this.x, this.y, this.w, this.h);
        }       
    }
        
    

    move(halfCanvas) {

        if(this.x >= halfCanvas + 1){
            this.vx = 0;
            this.x = halfCanvas + 0.9;
        } else {
            this.x += this.vx;
        }

        this.y += this.vy;
        this.vy += this.ay;

    }


    animateRight(){
        this.tickRight++;
        if(this.tickRight > 15) {
            this.tickRight = 0;
            this.imgRunRight.frameIndex --;
            if(this.imgRunRight.frameIndex <= 0){
                this.imgRunRight.frameIndex = 3;
            }

        }
        
    }

    animateLeft(){
        this.tickLeft++;
        if(this.tickLeft > 15) {
            this.tickLeft = 0;
            this.imgRunLeft.frameIndex ++;
            if(this.imgRunLeft.frameIndex >= this.imgRunLeft.frames){
                this.imgRunLeft.frameIndex = 0;
            }

        }
        
    }

    onKeyDown(key) {
        if(key === RIGHT) {
            this.vx = MOTION;
        }
        else if(key === LEFT) {
            this.vx = -MOTION;
        }
        else if(key === UP){
            if(this.vy === 0){
            this.vy = - 4;
            }
        }

    }

    onKeyUp(key) {
        if(key === RIGHT){
            this.vx = 0;
        }
        else if (key === LEFT){
            this.vx = 0;
        }
        

    }

    isInTheMiddle(halfCanvas){
        if(this.x >= halfCanvas){
            return true;
        }
    }
}