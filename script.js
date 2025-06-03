let gameseq = [];
let userseq = [];

let started = false;
let level = 0;

let btns = ["red", "green", "purple", "yellow"];

let h2 = document.querySelector("h2");

document.addEventListener("click", function() {
    if(started == false) {
        console.log("Game started");
        started = true;

        levelUp();
    }
});

function btnflash(btn) {
    if (!btn) {
        console.error("Button not found for flash!");
        return;
    }
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function levelUp() {
    level++;
    h2.innerText = "Level " + level;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    
    gameseq.push(randColor);

    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randbtn);
    btnflash(randbtn);
}

function CheckAns(idx) {
    if(userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(function() {
                userseq = [];
                levelUp();
            }, 1000);
        }
    } else {
        // Flash body red
        document.body.classList.add("wrong");
        setTimeout(() => {
            document.body.classList.remove("wrong");
        }, 100);

        h2.innerHTML = `Game Over! <b style = "color: red;">Your score was ${level}</b> <br>Click to restart.`;
        setTimeout(resetGame, 2000);
    }
}

function btnPress() {
    let btn = this;
    btnflash(btn);
    
    userColor = btn.getAttribute("id");
    userseq.push(userColor);

    CheckAns(userseq.length-1);

    
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnPress);
}

function resetGame() {
    gameseq = [];
    userseq = [];
    started = false;
    level = 0;

}