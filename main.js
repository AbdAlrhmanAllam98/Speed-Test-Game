let easyWords=["Hello","Code","Town","Task","Runner","Roles","Test","Rust","Scala","Funny"];
let normalWords=easyWords.concat(["Country","Testing","Youtube","Linkedin","Twitter","Github","Leetcode","Internet","Python","Cascade","Coding","Working","Playing"]);
let hardWords=normalWords.concat(["Programming","Javascript","Destructuring","Paradigm","Styling","Documentation","Dependencies"]);
let words=[];
let levels={
    "Easy":5,
    "Normal":3,
    "Hard":2
};
let selectLevel=document.getElementById("levels");
let theLevel=document.querySelector(".message .level");
let totalSeconds=document.querySelector(".message .seconds");
let startButton=document.getElementsByTagName("button")[0];
let theWord=document.querySelector(".the-word");
let input=document.getElementsByClassName("input")[0];
let upcomingWords=document.querySelector(".upcoming-words");
let timeLeft=document.querySelector(".control .time span");
let userScore=document.querySelector(".control .score .got");
let totalScore=document.querySelector(".control .score .total");
let finish=document.querySelector(".finish");
let gameInstrcution=document.querySelector(".game .game-instruction p");
let word='';
let firstTime=true;

fillGameInstruction();
initalizeDefaultValues()
selectLevel.addEventListener("click",function(){
    theLevel.innerHTML=selectLevel.value;
    totalSeconds.innerHTML=levels[selectLevel.value];
    timeLeft.innerHTML =levels[selectLevel.value];
    arrayForEveryLevel();
    totalScore.innerHTML = words.length;
});

input.onpaste=function(){
    return false;
};
startButton.onclick=function(){
    startButton.remove();
    input.focus();
    startGame();
};

function fillGameInstruction(){
    gameInstrcution.innerHTML=`
    Select your level do you want to play on it.</br>
    <u>Levels</u></br>
    <b>Easy   :</b>  you should  finish the word that written before the input before ${levels["Easy"]} second.</br>
    <b>Normal :</b> you should  finish the word that written before the input before ${levels["Normal"]} second.</br>
    <b>Hard   :</b> you should finish the word  that written before the input before ${levels["Hard"]} second.</br>
    `
}
function initalizeDefaultValues(){
    theLevel.innerHTML="Normal";
    totalSeconds.innerHTML=levels["Normal"];
    timeLeft.innerHTML = totalSeconds.innerHTML;
    words=normalWords;
    totalScore.innerHTML = words.length;
}
function arrayForEveryLevel(){
    if(selectLevel.value=="Easy"){
        words=easyWords;
    }
    else if(selectLevel.value=="Normal"){
        words=normalWords;
    }
    else if(selectLevel.value=="Hard"){
        words=hardWords;
    }
}
function startGame(){
    generateWord()
    generateUpComingWords();
    startTimeCount();
}
function generateWord(){
    word=words[Math.floor(Math.random()*words.length)];
    theWord.innerHTML=word;
    let wordIndex=words.indexOf(word);
    words.splice(wordIndex,1);
}
function generateUpComingWords(){
    upcomingWords.innerHTML='';
    for(let i=0;i<words.length;i++){
        let div=document.createElement("div");
        let text=document.createTextNode(words[i]);
        div.appendChild(text);
        upcomingWords.appendChild(div);
    }
}
function startTimeCount(){
    if(firstTime){
        timeLeft.innerHTML=Number(timeLeft.innerHTML)+3;
        firstTime=false;
    }
    let timeCount=setInterval(() => {
        timeLeft.innerHTML--;
        if(timeLeft.innerHTML==0){
            clearInterval(timeCount);
            checkTheInput();
        }
    }, 1000);
}
function checkTheInput(){
    if(input.value.toLowerCase()==word.toLowerCase()){
        input.value='';
        userScore.innerHTML++;
        timeLeft.innerHTML = totalSeconds.innerHTML;
        if(words.length>0){
            startGame();
        }
        else{
            finish.innerHTML="Excellent"
            finish.classList.add("good");
        }
    }
    else{
        finish.innerHTML="Game Over"
        finish.classList.add("bad");
    }
}