const questions = [
    {
        question:"Which is the largest animal in the world?",
        answers:[
            {text:"Shark",correct:false},
            {text:"Blue whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Giraffe",correct:false}
        ]
    },
    {
        question:"What is the capital of India?",
        answers:[
            {text:"Delhi",correct:true},
            {text:"Mumbai",correct:false},
            {text:"Pune",correct:false},
            {text:"Raipur",correct:false}
        ]
    },
    {
        question:"Who is the PM of India?",
        answers:[
            {text:"Yogi",correct:false},
            {text:"Amit shah",correct:false},
            {text:"Narendra modi",correct:true},
            {text:"Atal bihari bajpey",correct:false}
        ]
    },
    {
        question:"Which programming language is used for front-end?",
        answers:[
            {text:"Node JS",correct:false},
            {text:"PHP",correct:false},
            {text:"Python",correct:false},
            {text:"Javascript",correct:true}
        ]
    },
]

// define variables

const questionElements = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo  = currentQuestionIndex +1;
    questionElements.innerHTML = questionNo +" . "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        // console.log(answerButton.firstChild);
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === 'true';
    console.log(isCorrect);
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("inCorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}
function showScore(){
    resetState();
    questionElements.innerHTML = `you scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Play again !"
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();