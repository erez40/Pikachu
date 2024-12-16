let player = document.getElementById("player");
let enemy = document.getElementById("enemy");
let scoreElement = document.getElementById("scoreId");

let score = 0;
let isjumping = false;

console.log(player);
console.log(enemy);
console.log(scoreElement);
console.log(score);
console.log(isjumping);


function updateScore() {
    score++;
    scoreElement.innerHTML = "Your score:" + score;
}

window.addEventListener("keydown", checkKey);


function checkKey(e) {
    console.log(e.key);
    if (e.key === "ArrowUp" || e.key === " "){
        Jump();
    }
}

function Jump() {
    if (isjumping) {
        return;
    }
    isjumping = true;
    player.classList.add("Jump");
    setTimeout(removeAnimation, 1000);
    let JumpSound = new Audio("jump.wav");
    JumpSound.play
}
function removeAnimation() {
    player.classList.remove("Jump");
    isjumping = false;
    updateScore();
}

let checkCiollisionInterval = setInterval(checkCiollision, 100)

function checkCiollision() {
    if (elementsOverlap(player, enemy)) {
        clearInterval(checkCiollisionInterval);
        let best = localStorage.getItem("best");
        if (!best || best < score){
            localStorage.setItem("best", score);
        best = score;
    }

    document.body.innerHTML = `
    <p id="overId"> Game over !!! </p>
    <p id= "result"> Your score is ${score} </p>
    <p id="best"> Your score is... ${best} </p>
    <p id= "retry"> Retry press F5 or Fn + F5></p>
    `;
    let overSound = new Audio("game-over (1).wav");
    overSound.play();
   }
}

function elementsOverlap(el1, el2) {
    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();
  
  
    return !(
      domRect1.top > domRect2.bottom ||
      domRect1.right < domRect2.left ||
      domRect1.bottom < domRect2.top ||
      domRect1.left > domRect2.right
    );
}

