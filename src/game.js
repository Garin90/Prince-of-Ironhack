class Game{
    constructor(ctx) {
        this.ctx = ctx;
        this.interval = null;

        this.prince = new Prince(ctx);
        this.bg = new Background(ctx);
        this.obstacles = [];
        this.score = new Score(ctx);
        this.gameOver = new GameOver(ctx);
        this.enemies = [];


        this.halfCanvas = this.ctx.canvas.width/2;
        this.tickNewObstaclesCheck = 0;

        this.tickNewObstaclesCheck = 0;
        this.isPositionPassed = false;

        this.randomYFloor = 0;
        this.started = false
        
    }

    start() {
        this.started = true
        this.initListeners();
        this.addObstacles();
        this.addEnemy();
        

        this.interval = setInterval(() => {
            this.clear();
            this.draw();
            this.move();
            this.princePositionChecker();
            this.addNewEnemy();
            this.enemyColisionChecker();
            this.addNewObstacles();
            this.isFloorCheckerPrince();
            this.isFloorCheckerEnemy();
            this.skewerColisionChecker();
            this.princeFallDownKill();      
        }, 1000/60);
        
    }

    stop() {
        
        clearInterval(this.interval);
        this.gameOver.draw(this.score.totalScore);
        const playAgain = document.getElementById("play-again-msg")
        playAgain.classList.remove('hidden')
    }


    initListeners() {
        document.onkeydown = (e) => {
            this.prince.onKeyDown(e.keyCode);
            this.killCheck(e.keyCode);
        };
        document.onkeyup = (e) => {this.prince.onKeyUp(e.keyCode)};
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        if(!this.isVisible(this.obstacles[0])) {
            this.obstacles.shift();
        }

        if(this.enemies[0] && !this.isVisible(this.enemies[0])) {
            this.enemies.shift();
        }
        
    }

    draw() {
        this.bg.draw();
        this.score.draw();
        this.obstacles.forEach((obstacle) => obstacle.draw());
        this.prince.draw(this.halfCanvas);
        this.enemies.forEach((enemy) => enemy.draw());
        
    }

    move() {
        this.prince.move(this.halfCanvas);
        this.enemies.forEach((enemy) => enemy.move())

        //moving background elements
        if(this.prince.isInTheMiddle(this.halfCanvas)){
            this.obstacles.forEach((obstacle) => obstacle.move());
            this.enemies.forEach((enemy) => enemy.backgroundMotion());
            this.score.increment();
        }

        

    }

    addObstacles() {
        this.randomYFloor = Math.floor(Math.random() * 83) + 200;
        this.obstacles.push(new Tile(this.ctx, 0, this.randomYFloor));
        this.obstacles.push(new Window(this.ctx, 400));
        this.obstacles.push(new Column(this.ctx, 0, this.randomYFloor));
        this.obstacles.push(new Column(this.ctx, 0, this.randomYFloor + 46));
        this.obstacles.push(new Column(this.ctx, 0, this.randomYFloor + 46 * 2));
        this.obstacles.push(new Torch(this.ctx, 150));
        this.obstacles.push(new Skewer(this.ctx, 0, this.randomYFloor));

        
        
    }

    addEnemy() {
        this.enemies.push(new Enemy(this.ctx, 600 + 400));
        
    }
        
    addNewObstacles() {
        this.randomYFloor = Math.floor(Math.random() * 83) + 200;
        if(this.isPositionPassed === true || this.score.totalScore === 1){            
            this.obstacles.push(new Tile(this.ctx, 600, this.randomYFloor));
            this.obstacles.push(new Window(this.ctx, 350 + 600));
            this.obstacles.push(new Column(this.ctx, 600, this.randomYFloor));
            this.obstacles.push(new Column(this.ctx, 600, this.randomYFloor + 46));
            this.obstacles.push(new Column(this.ctx, 600, this.randomYFloor + 46 * 2));
            this.obstacles.push(new Torch(this.ctx, 100 + 600));
            this.obstacles.push(new Skewer(this.ctx, 600, this.randomYFloor));

            if(this.score.totalScore !== 1){
            this.enemies.push(new Enemy(this.ctx, 600 + 400));
            }
             
            console.log("Added newObstacles", this.obstacles.length);
        }
        
        this.isPositionPassed = false;
        
        
    }

    addNewEnemy() {
        if(this.isPositionPassed === true){            

            this.enemies.push(new Enemy(this.ctx, 600 + 400));
            console.log("Added new Enemy", this.enemies.length);
            
        }    
    }

    isVisible(element) {
        if(element.x > -600){
            return true;
        }

    }

    princePositionChecker() {
        if(this.score.totalScore % this.halfCanvas === 0 
            && this.score.totalScore !== 0 
            && (this.score.totalScore / this.halfCanvas) % 2 === 0
            ) {

            this.isPositionPassed = true;
            console.log("prince position checked");
        }
    }

    isFloorCheckerPrince() {
        
        this.obstacles.forEach((obstacle) => {
            if(obstacle.tilesNumber){
                const ColY = this.prince.y + this.prince.h >= obstacle.y + 13;
                const floorInX = this.prince.x + this.prince.w > obstacle.x
                && this.prince.x + this.prince.w / 2 <= obstacle.x + obstacle.distanceBetweenTiles * (obstacle.tilesNumber + 1)
            
                if (floorInX && ColY){
                    this.prince.vy = 0;
                    
                }


            
            }
        })
    }

    isFloorCheckerEnemy() {
        
        this.obstacles.forEach((obstacle) => {
            this.enemies.forEach((enemy) => {
                if(obstacle.tilesNumber){
                    const ColY = enemy.y + enemy.h >= obstacle.y + 13;
                    const floorInX = enemy.x + enemy.w > obstacle.x
                    && enemy.x + enemy.w / 2 <= obstacle.x + obstacle.distanceBetweenTiles * (obstacle.tilesNumber + 1)
                
                    if (floorInX && ColY){
                        enemy.vy = 0;
                        
                    }


                
                }
            })
        })
    }

    skewerColisionChecker() {
        this.obstacles.forEach((obstacle) => {
            if(obstacle.skewerChecker){
                const colX = this.prince.x + this.prince.w >= obstacle.x 
                && obstacle.x + obstacle.w >= this.prince.x;
                
                const colY = this.prince.y + this.prince.h >= obstacle.y 
                && obstacle.y + obstacle.h >= this.prince.y;

                if(colX && colY){
                    console.log("Colision");
                    this.stop();

                }
            }
        })
    }

    enemyColisionChecker() {
        this.enemies.forEach((enemy) => {

            const colX = this.prince.x + this.prince.w >= enemy.x 
            && enemy.x + enemy.w >= this.prince.x;
            
            const colY = this.prince.y + this.prince.h >= enemy.y 
            && enemy.y + enemy.h >= this.prince.y;

            if(colX && colY){
                console.log("Enemy colision");
                this.stop();

            }
            
        })
    }

    killCheck(keyCode) {
        if (keyCode === SPACE){
            this.enemies.forEach((enemy) => {
                if (enemy.x - this.prince.x <= 100){
                    this.enemies.shift();
                }
            })
        }
    }

    princeFallDownKill(){
        if(this.prince.y >= this.ctx.canvas.height){
            this.stop();
        }
    }

}