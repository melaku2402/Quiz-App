const questions = [
  {
    question:
      "Which method selects the first element with a CSS class of 'item'?",
    answers: [
      { text: "A) document.querySelectorAll('.item')", correct: false },
      { text: "B) document.getElementByClass('item')", correct: false },
      { text: "C) document.querySelector('.item')", correct: true },
      { text: "D) document.getElementById('item')", correct: false },
    ],
  },
  {
    question:
      " How do you attach a click event to a button with ID myBtn to trigger a function handleClick?",
    answers: [
      {text: "A) myBtn.addEventListener('click', handleClick())", correct: false,},
      {text: "B) document.getElementById('myBtn').onclick = handleClick", correct: false,},
      {text: "C) document.querySelector('#myBtn').addEventListener('click', handleClick)", correct: false,},
      { text: "D) Both B and C", correct: true },
    ],
  },
  {
    question: " How do you select the parent element of a node with ID child?",
    answers: [
      { text: "A) document.getElementById('child').parent()", correct: false },
      { text: "B) document.getElementById('child').parentNode", correct: true },
      {text: "C) document.getElementById('child').getParent()", correct: false},
      { text: "D) document.getElementById('child').parentElement",  correct: true},
    ],
  },
  {
    question: "Which method adds the class 'highlight' to an element with ID box?",
    answers: [
      { text: "A) document.getElementById('box').className = 'highlight';", correct: false },
      { text: "B) document.getElementById('box').classList.add('highlight');", correct: false},
      { text: "C) document.getElementById('box').addClass('highlight');", correct: false },
      { text: "D) Both A and B", correct: true},
    ],
  },
  {
    question: "How do you get the value of an input field with ID email?",
    answers: [
      {
        text: "A) document.getElementById('email').textContent;", correct: false, },
      { text: "B) document.getElementById('email').innerHTML;", correct: false },
      { text: "C) document.getElementById('email').value;", correct: true },
      { text: "D) document.getElementById('email').getValue();", correct: false },
    ],
  },
];

const questionElement = document.getElementById("questions");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + " ." + currentQuestion.question;
    
    currentQuestion.answers.forEach(function(answer) {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);

      if(answer.correct){
          button.dataset.correct=answer.correct;
        }

        button.addEventListener("click",selectAnswer)
      });
 }
    
  function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
      answerButtons.removeChild(answerButtons.firstChild)
    }
 }

  function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if (isCorrect) {
      selectedBtn.classList.add("correct")
      score++;
    }
    else{
      selectedBtn.classList.add("incorrect")

    }


    Array.from(answerButtons.children).forEach(button=>{
      if (button.dataset.correct ==="true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
     nextButton.style.display = "block";
  }
  
  function showScore() {
    resetState();
    questionElement.innerHTML = 'You scored'+' '+ score+' '+'out of  ' + '  '+ questions.length+' !';
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"
  }

  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion(); 
    }
    else{
      showScore();
    }
  }
  nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
      handleNextButton();
    }
  else{
    startQuiz()  
  }
  })

startQuiz();