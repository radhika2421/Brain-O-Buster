const mathQuestions = [
    { question: "what are the first 5 digits of 'pi'?", answers: ["3.1465", "3.1451", "3.1415", "3.1416"], correct: 2 },
    { question: "If p and q are distinct prime numbers, how many divisors does the product p X q have?", answers: ["3", "4", "2", "1"], correct: 1},
    { question: "If a and b are roots of the equation x^2-6x+8=0, what is a^2 +b^2 ?", answers: ["10", "20", "26", "36"], correct: 2 },
    { question: "If n is a positive integer, which of the following expressions is always divisible by 6?", answers: ["n(n-1)(n+1)", "2n+1", "n(n+1)", "n(n+1)(n+2)"], correct: 3 },
    { question: "Which of the following numbers is a perfect number?", answers: ["6","111","21","281"], correct:0 },
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
    const currentQuestion = mathQuestions[currentQuestionIndex];
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

    const isCorrect = selectedIndex === mathQuestions[currentQuestionIndex].correct;
    if (isCorrect){
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < mathQuestions.length) {
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
    if (currentQuestionIndex < mathQuestions.length) {
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
    scoreElement.innerText = `${score} / ${mathQuestions.length}`;
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
