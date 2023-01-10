const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


const game = new Game(ctx);
const video = document.getElementById("video");
video.volume = 0.2;
const play = document.getElementById("game");
play.classList.add("hidden");
document.addEventListener("click", function() {
    video.play();
  });
  

document.addEventListener("keydown", (e) => {
    if(e.keyCode === ENTER){
        if (game.started) {
            location.reload()
        } else {
            const welcome = document.getElementById("welcome");
            welcome?.remove();
            play.classList.remove("hidden")
            game.start();
            
            
        }
       
    }
})
    






