import Questions from "./questions.js";

export default class appQuiz{
    constructor(btn, info, main){
        this.btn = btn;
        this.info = info;
        this.exitInfo = info.querySelector(".exit");
        this.nextInfo = info.querySelector(".next");
        this.main = main;
        this.resultHtml = document.querySelector(".result")
        
        this.count = 0;
        this.score = 0;
        this.counter;

        this.btn.addEventListener("click", () => {
            this.info.classList.add("active");
        });
        this.exitInfo.addEventListener("click", () => {
            this.info.classList.remove("active")
        });
        this.nextInfo.addEventListener("click", () => {
            this.info.classList.remove("active")
            this.main.classList.add("active")
            this.showHtmlQuestions(this.count)
            
        });
    }
    showHtmlQuestions(count){
        let questionArray = Questions.showQuestions()
        this.main.innerHTML = `
            <header>
                <h3>Puno sreće u odgovorima</h3>
                <div class="timer">
                    <small>Preostalo vrijeme:</small>
                    <p><b>20</b></p> 
                </div>
            </header>
            <section>
                <h3>${questionArray[count].question}</h3>
                <ul>
                    <li><p>${questionArray[count].option[0]}</p><div class="iconAnswer"></div></li>
                    <li><p>${questionArray[count].option[1]}</p><div class="iconAnswer"></div></li>
                    <li><p>${questionArray[count].option[2]}</p><div class="iconAnswer"></div></li>
                    <li><p>${questionArray[count].option[3]}</p><div class="iconAnswer"></div></li>
                </ul>
            </section>
            <footer>
                <p>Odgovorenih pitanja: <strong>${questionArray[count].id}</strong> od<strong> 10</p>
                <div class="buttons">
                    <button class="next">Sljedeće pitanje</button>
                </div>
            </footer>
        `
        const optionList = document.querySelectorAll("main section li")

        let footerBtn = this.main.querySelector("footer button")
        footerBtn.addEventListener("click", () => {
            this.count++
            clearInterval(this.counter)
            if(this.count > questionArray.length - 1){
                this.count = 0;
                this.main.classList.remove("active")
                this.resultHtml.classList.add("active")
                if(this.score == 0){
                    this.resultHtml.innerHTML = `
                        <i class="fa-solid fa-face-sad-tear"></i>
                        <h3>Imali ste <span>${this.score}</span> od <span>10</span> točnih odgovora</h3>
                        <small>Nažalost, slabi ste poznavatelj Nk Hajduka</small>
                        <div class="buttons">
                            <button id="repeat">Ponovi kviz</button>
                            <button id="exit">Izađi iz igre</button>
                        </div>
                    `
                    let repeat = this.resultHtml.querySelector(".buttons #repeat")
                    let exit = this.resultHtml.querySelector(".buttons #exit")

                    repeat.addEventListener("click", () => {
                        this.resultHtml.classList.remove("active")
                        this.main.classList.add("active")
                        this.showHtmlQuestions(this.count)
                    })
            
                    exit.addEventListener("click", () => {
                        window.location.reload()
                    })

                }
            }
            else{
                this.showHtmlQuestions(this.count)
            }
        })
        this.timer(20, optionList, this.count)
        this.showAnswer(optionList, this.count)

    };
    timer(time, option, index){
        this.option = option
        this.index = index
        let questionArray = Questions.showQuestions()
        let answer = questionArray[index].answer
        this.counter = setInterval(() => {
            time--
            let elementTime = this.main.querySelector("header .timer")
            elementTime.innerHTML = 
                `<small>Preostalo vrijeme:</small>
                <p><b>${time}</b></p>
            `
            if(time == 0){
                clearInterval(this.counter)
                for(let i = 0; i < option.length; i++){
                    let allIconElement = option[i].querySelectorAll(".iconAnswer")
                    for(let i = 0; i < allIconElement.length; i++){
                        allIconElement[i].innerHTML = `<i class="fa-solid fa-xmark"></i>`
                    }
                    if(option[i].children[0].textContent == answer){
                        let iconElement = option[i].children[1]
                        iconElement.innerHTML = `<i class="fa-solid fa-check"></i>`
                    }
                }

            }
        }, 1000)
    }
    showAnswer(option, index){
        let questionArray = Questions.showQuestions()
        option.forEach((opt) => {
            opt.addEventListener("click", (e) => {
                clearInterval(this.counter)
                const targetEl = e.target;
                const pElement = targetEl.children[0];
                const paraText = pElement.textContent;
                const iconElement = targetEl.children[1]
                const answer = questionArray[index].answer
                
                if(paraText == answer){
                    for(let i = 0; i < option.length; i++){
                        let allIconElement = option[i].querySelectorAll(".iconAnswer")
                        for(let i = 0; i < allIconElement.length; i++){
                            allIconElement[i].innerHTML = `<i class="fa-solid fa-xmark"></i>`
                        }
                    }
                    iconElement.innerHTML = `<i class="fa-solid fa-check"></i>`;
                    this.userScore()  
                }
                else{
                    for(let i = 0; i < option.length; i++){
                        let allIconElement = option[i].querySelectorAll(".iconAnswer")
                        for(let i = 0; i < allIconElement.length; i++){
                            allIconElement[i].innerHTML = `<i class="fa-solid fa-xmark"></i>`
                        }
                        if(option[i].children[0].textContent == answer){
                            let iconElement = option[i].children[1]
                            iconElement.innerHTML = `<i class="fa-solid fa-check"></i>`
                        }
                    }
                }
                for(let i = 0; i < option.length; i++){
                    option[i].classList.add("disabled")
                }   
            })
        })
    }
    userScore(){
        console.log(this.score)
        this.score++
        if(this.score <= 5 && this.score > 0){
            this.resultHtml.innerHTML = `
                <i class="fa-solid fa-face-sad-tear"></i>
                <h3>Imali ste <span>${this.score}</span> od <span>10</span> točnih odgovora</h3>
                <small>Nažalost, slabi ste poznavatelj Nk Hajduka</small>
                <div class="buttons">
                    <button id="repeat">Ponovi kviz</button>
                    <button id="exit">Izađi iz igre</button>
                </div>
            `
        }
        if(this.score > 5 && this.score < 8){
            this.resultHtml.innerHTML = `
                <i class="fa-solid fa-face-rolling-eyes"></i>
                <h3>Imali ste <span>${this.score}</span> od <span>10</span> točnih odgovora</h3>
                <small>Nije loše, ali može bolje. Vi ste neloš poznavatelj Nk Hajduka</small>
                <div class="buttons">
                    <button id="repeat">Ponovi kviz</button>
                    <button id="exit">Izađi iz igre</button>
                </div>
            `
        }
        if(this.score >= 8){
            this.resultHtml.innerHTML = `
                <i class="fa-solid fa-face-smile"></i>
                <h3>Imali ste <span>${this.score}</span> od <span>10</span> točnih odgovora</h3>
                <small>Vidi se da ste veliki navijač Hajduka</small>
                <div class="buttons">
                    <button id="repeat">Ponovi kviz</button>
                    <button id="exit">Izađi iz igre</button>
                </div>
            `
        }
        let repeat = this.resultHtml.querySelector(".buttons #repeat")
        let exit = this.resultHtml.querySelector(".buttons #exit")

        repeat.addEventListener("click", () => {
            this.resultHtml.classList.remove("active")
            this.main.classList.add("active")
            this.showHtmlQuestions(this.count)
            this.score = 0; 
        })
        exit.addEventListener("click", () => {
            window.location.reload()
        })
    }
}



