import appQuiz from "./app.js";

const start = document.querySelector(".startBtn button")
const info = document.querySelector(".aboutQuiz")
const main = document.querySelector("main")
let app = new appQuiz(start, info, main);


const body = document.body;
let i = 0;
while(i < 100){
    const box = document.createElement("div")
    box.classList = "box";
    body.append(box)
    i++   
}
const boxElement = document.querySelectorAll(".box")
for(let x = 5; x < 10; x++){
    boxElement[x].style.backgroundImage = "linear-gradient(to right,blue 50%, red 50%)"
}
for(let x = 15; x < 20; x++){
    boxElement[x].style.backgroundImage = "linear-gradient(to right,blue 50%, red 50%)"
}
for(let x = 25; x < 30; x++){
    boxElement[x].style.backgroundImage = "linear-gradient(to right,blue 50%, red 50%)"
}
for(let x = 35; x < 40; x++){
    boxElement[x].style.backgroundImage = "linear-gradient(to right,blue 50%, red 50%)"
}
for(let x = 45; x < 50; x++){
    boxElement[x].style.backgroundImage = "linear-gradient(to right,blue 50%, red 50%)"
}
for(let x = 55; x < 60; x++){
    boxElement[x].style.backgroundImage = "linear-gradient(to right,blue 50%, red 50%)"
}
for(let x = 65; x < 70; x++){
    boxElement[x].style.backgroundImage = "linear-gradient(to right,blue 50%, red 50%)"
}
for(let x = 75; x < 80; x++){
    boxElement[x].style.backgroundImage = "linear-gradient(to right,blue 50%, red 50%)"
}
for(let x = 85; x < 90; x++){
    boxElement[x].style.backgroundImage = "linear-gradient(to right,blue 50%, red 50%)"
}
for(let x = 95; x < 100; x++){
    boxElement[x].style.backgroundImage = "linear-gradient(to right,blue 50%, red 50%)"
}


