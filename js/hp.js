const hpQuestions = [
    { question: "What house is Harry Potter in?", answers: ["Slytherin", "Gryffindor", "Ravenclaw", "Hufflepuff"], correct: 1 },
    { question: "What spell is used to disarm opponents?", answers: ["Expelliarmus", "Lumos", "Alohomora", "Wingardium Leviosa"], correct: 0 },
    { question: "What is the name of Harry's pet owl?", answers: ["Scabbers", "Fang", "Hedwig", "Crookshanks"], correct: 2 },
    { question: "Who is the Half-Blood Prince?", answers: ["Harry Potter", "Albus Dumbledore", "Severus Snape", "Tom Riddle"], correct: 2 },
    { question: "Who was Harry's Godfather?", answers: ["Snape","Mad Eye Moody","Sirius","Voldemort"], correct: 2 },
];

let currentQuestionIndex = 0;
let score = 0;

// Element references
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const remark=document.getElementById("remarks");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");

// Function to load the question
function loadQuestion() {
    resetState();
    const currentQuestion = hpQuestions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach((answer, index) => {
        // create button and change text
        const button = document.createElement("button");
        button.innerText = answer;
        //  add a CSS class called "btn" to the button element.
        button.classList.add("btn");
        // assigns an onclick event handler to the button
        // When the button is clicked, it triggers the selectAnswer function and passes the index as an argument.
        button.onclick = () => selectAnswer(button,index);
        answerButtons.appendChild(button);
    });
}

// Function to reset answer buttons
function resetState() {
    nextButton.classList.add("hidden");
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Function to handle answer selection
function selectAnswer(selectedButton,selectedIndex) {
    // colorChange(selectedButton);
    clearSelection();
    selectedButton.classList.add("selected");

    const isCorrect = selectedIndex === hpQuestions[currentQuestionIndex].correct;
    if (isCorrect){
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < hpQuestions.length) {
        nextButton.classList.remove("hidden");
    } else {
        showResult();
    }
}

// function colorChange(selectedButton){
//     console.log(selectedButton.classList);
//     // Clear previous selection
//     // clearSelection();
//     // Add 'selected' class to the chosen button
//     selectedButton.classList.add("selected");
// }
nextButton.onclick = () => {
    if (currentQuestionIndex < hpQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function clearSelection() {
    const buttons = document.querySelectorAll("#answer-buttons .btn");
    buttons.forEach(button => button.classList.remove("selected"));
}

// Function to show the result
function showResult() {
    questionElement.classList.add("hidden");
    answerButtons.classList.add("hidden");
    nextButton.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreElement.innerText = `${score} / ${hpQuestions.length}`;
    remark.classList.remove("hidden");
    if(score===5)
    {
        remark.innerText=`You are a true PotterHead!`;
    }
    else if(score>2)
    {
        remark.innerText=`You need to study Won-Won`;
    }
    else if(score<=2)
    {
        remark.innerText=`Are you a muggle?`;
    }
}

// nextButton.onclick = () => {
//     loadQuestion();
// }

// Start the quiz
loadQuestion();
