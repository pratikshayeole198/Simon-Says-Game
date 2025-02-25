
let gameSeq=[];
let userSeq=[];

let btns=["yellow","red","purple","green"];

let started=false;
let level=0;
let highestScore=0;

let h2=document.querySelector("h2");
document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game is started");
        started=true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){

    userSeq=[]; //jaise hi level up ho jaye user seq ko reset kr denge to empty value

    level++;
    h2.innerText=`level ${level}`;
     
    //game will choose any random button uske bad us button ko flash krwayega
    let randomIdx=Math.floor(Math.random()*3);  //ram=ndom index 0 se 3 tak hoga
    let randomColor=btns[randomIdx];
    let randomBtn=document.querySelector(`.${randomColor}`);
    // console.log(randomIdx);
    // console.log(randomColor);
    // console.log(randomBtn);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randomBtn);
}

function checkAns(idx){
    // console.log("curr level:",level);
    

    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length===gameSeq.length){  //we are at last index
          setTimeout(levelUp,1000);
        }
    }else{

        if(level>highestScore){
            highestScore=level;
        }

        h2.innerHTML=`Game Over! Your score was <b>${level}</b>, Highest score: <b>${highestScore}</b><br>Press any key to start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    } 
}
function btnPress(){
   
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");

for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}