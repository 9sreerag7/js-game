const circle = document.getElementById('circle');
const line = document.getElementById('line');

let isJumping = false;
let rotation = 0;
let linePosition = -50;

window.addEventListener('keydown', () => {
    if (!isJumping) {
        jump();
    }
});

function jump() {
    isJumping = true;
    circle.style.transition = "bottom 0.5s ease-out";
    circle.style.bottom = "45%"; 
    setTimeout(() => {
        circle.style.transition = "bottom 0.5s ease-in";
        circle.style.bottom = "20%"; 
        setTimeout(() => { isJumping = false; }, 500);
    }, 500);
}

const gameLoop = setInterval(() => {
    linePosition += 8;
    line.style.right = linePosition + "px";
    if (linePosition > window.innerWidth + 50) {
        linePosition = -50;
    }
    rotation += 5;
    circle.style.transform = `rotate(${rotation}deg)`;
    const circleRect = circle.getBoundingClientRect();
    const lineRect = line.getBoundingClientRect();
    if (
        lineRect.left < circleRect.right &&
        lineRect.right > circleRect.left &&
        lineRect.top < circleRect.bottom &&
        circleRect.bottom > lineRect.top
    ) {
        handleGameOver();
    }
}, 20);

function handleGameOver() {
    clearInterval(gameLoop);
    alert("Game Over!");
    location.reload();
}