class Enemy{
    constructor(ctx, x){
        this.ctx = ctx;
        this.x = x;
        this.y = 50;
        this.w = 50;
        this.h = 50;
        this.vx = 0;
        this.vy = 0;
        this.ay = 0.1;

        this.imgCarlos = new Image;
        this.imgCarlos.src = "resources/Carlos.PNG";

        this.imgJulio = new Image;
        this.imgJulio.src = "resources/Julio.PNG"

        this.imgCristian = new Image;
        this.imgCristian.src = "resources/Cristian.PNG";

        this.imgEdgar = new Image;
        this.imgEdgar.src = "resources/Edgar.PNG";

        this.tick = 0;
        this.frequency = 100;
        this.movementTick = 0;
    }

    draw() {
        this.tick ++;

        if(this.tick < this.frequency){
            this.ctx.drawImage(this.imgCarlos, this.x, this.y, this.w, this.h);
        }

        else if(this.tick > this.frequency && this.tick < this.frequency * 2){
            this.ctx.drawImage(this.imgJulio, this.x, this.y, this.w, this.h);
        }

        else if(this.tick > this.frequency * 2 && this.tick < this.frequency * 3){
            this.ctx.drawImage(this.imgCristian, this.x, this.y, this.w, this.h);
        }

        else if(this.tick > this.frequency * 3 && this.tick < this.frequency * 4){
            this.ctx.drawImage(this.imgEdgar, this.x, this.y, this.w, this.h);
        }
        else if (this.tick > this.frequency * 4){
            this.tick = 0;
        }
        
    }

    move() {
        this.x += this.vx
        this.y += this.vy;
        this.vy += this.ay;

        this.movementTick ++;
        if(this.movementTick < 150){
            this.vx = -1;
        }
        else if(this.movementTick > 150 && this.movementTick < 300){
            this.vx = 1;
        }
        else if (this.movementTick > 300){
            this.movementTick = 0;
        }
    
    }

    backgroundMotion() {
        this.x += -MOTION;
    }


}