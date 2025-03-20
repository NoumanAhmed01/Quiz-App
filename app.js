const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Trainer Marking Language", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyper Text Marketing Language", correct: false },
      { text: "Hyper Text Markup Leveler", correct: false },
    ],
  },
  {
    question:
      "Which CSS property is used to change the text color of an element?",
    answers: [
      { text: "font-style", correct: false },
      { text: "text-color", correct: false },
      { text: "color", correct: true },
      { text: "background-color", correct: false },
    ],
  },
  {
    question: "Which HTML tag is used to define an unordered list?",
    answers: [
      { text: "&lt;ul&gt;", correct: true },
      { text: "&lt;ol&gt;", correct: false },
      { text: "&lt;li&gt;", correct: false },
      { text: "&lt;list&gt;", correct: false },
    ],
  },
  {
    question:
      "Which JavaScript method is used to access an HTML element by its ID?",
    answers: [
      { text: "getElementById()", correct: true },
      { text: "getElementByClass()", correct: false },
      { text: "querySelector()", correct: false },
      { text: "getElement()", correct: false },
    ],
  },
  {
    question:
      "Which HTML attribute is used to provide alternative text for an image?",
    answers: [
      { text: "alt", correct: true },
      { text: "title", correct: false },
      { text: "src", correct: false },
      { text: "description", correct: false },
    ],
  },
  {
    question: "Which CSS property controls the space between elements?",
    answers: [
      { text: "padding", correct: false },
      { text: "spacing", correct: false },
      { text: "margin", correct: true },
      { text: "border", correct: false },
    ],
  },
  {
    question: "Which tag is used to define the header of a webpage in HTML?",
    answers: [
      { text: "&lt;header&gt;", correct: true },
      { text: "&lt;head&gt;", correct: false },
      { text: "&lt;h1&gt;", correct: false },
      { text: "&lt;heading&gt;", correct: false },
    ],
  },
  {
    question: "How do you write a comment in CSS?",
    answers: [
      { text: "// This is a comment", correct: false },
      { text: "/* This is a comment */", correct: true },
      { text: "&lt;!-- This is a comment --&gt;", correct: false },
      { text: "* This is a comment", correct: false },
    ],
  },
  {
    question: "What is the purpose of the &lt;title&gt; tag in HTML?",
    answers: [
      { text: "To define the title of the document", correct: true },
      { text: "To define the heading of the page", correct: false },
      { text: "To add a title to images", correct: false },
      { text: "To define the footer of the document", correct: false },
    ],
  },
  {
    question: "Which of the following is a JavaScript framework?",
    answers: [
      { text: "Django", correct: false },
      { text: "Laravel", correct: false },
      { text: "React", correct: true },
      { text: "Flask", correct: false },
    ],
  },
];

// Select HTML elements used to display the question, answers, and next button
const questionElement = document.querySelector(".question");
const answerBtn = document.querySelector(".answer-btn");
const nextBtn = document.querySelector(".next");

// Create and append the timer element to the quiz
const timerElement = document.createElement("div"); // Element for displaying the timer
timerElement.classList.add("timer");
document.querySelector(".quiz").appendChild(timerElement); // Append the timer element to your quiz

// Variables to keep track of the current question, score, timer, and time remaining
let currentQuesIndex = 0;
let score = 0;
let timer = null;
let timeRemaining = 10;

// Function to start the quiz by resetting currentQuesIndex and score, then displaying the first question
function startQuiz() {
  currentQuesIndex = 0; // Reset the current question index to 0
  score = 0; // Reset the score to 0
  nextBtn.innerHTML = "Next"; // Set the "Next" button text
  showQuestion(); // Call the function to show the first question
}

// Function to display the current question and its answers
function showQuestion() {
  resetState(); // Clear the previous question's answers and reset the timer
  let currentQuestion = questions[currentQuesIndex]; // Get the current question from the questions array
  let questionNo = currentQuesIndex + 1; // Calculate the question number to display
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // Display the question text

  // Loop through the answers for the current question and create buttons for each one
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button"); // Create a button for each answer
    button.innerHTML = answer.text; // Set the button's inner text to the answer
    button.classList.add("btn"); // Add a class to style the button
    answerBtn.appendChild(button); // Add the button to the HTML
    if (answer.correct) {
      button.dataset.correct = answer.correct; // Mark the correct answer using the dataset attribute
    }
    button.addEventListener("click", selectAns); // Attach an event listener to handle answer selection
  });
  startTimer(); // Start the timer for the current question
}

// Function to reset the state by hiding the "Next" button, clearing old answers, and resetting the timer
function resetState() {
  nextBtn.style.display = "none"; // Hide the "Next" button until an answer is selected
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild); // Remove any previous answer buttons from the HTML
  }
  clearInterval(timer); // Stop any existing timer
  timeRemaining = 10; // Reset the time remaining for the next question
}

// Function to handle when an answer is selected by the user
function selectAns(e) {
  clearInterval(timer); // Stop the timer as soon as an answer is selected
  const selectedBtn = e.target; // Get the button that was clicked
  const isCorrect = selectedBtn.dataset.correct === "true"; // Check if the answer is correct
  if (isCorrect) {
    selectedBtn.classList.add("correct"); // Add a class to highlight the correct answer in green
    score++; // Increment the score if the answer is correct
  } else {
    selectedBtn.classList.add("incorrect"); // Add a class to highlight the incorrect answer in red
  }
  // Loop through all the answer buttons to highlight the correct answer and disable them
  Array.from(answerBtn.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct"); // Highlight the correct answer in green
    }
    button.disabled = true; // Disable all answer buttons to prevent further selection
  });
  nextBtn.style.display = "block"; // Show the "Next" button after an answer is selected
}

// Function to display the final score when all questions are answered
function showScore() {
  resetState(); // Clear the last question and reset the state
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`; // Display the user's score
  nextBtn.innerHTML = "Restart"; // Change the "Next" button to "Restart"
  nextBtn.style.display = "block"; // Show the "Restart" button
  timerElement.style.display = "none"; // Hide the timer after the quiz ends
}

// Function to handle clicking the "Next" button
function handleNextBtn() {
  currentQuesIndex++; // Move to the next question by increasing the index
  if (currentQuesIndex < questions.length) {
    showQuestion(); // Show the next question if there are still questions left
  } else {
    showScore(); // If no more questions, show the final score
  }
}

// Add an event listener to the "Next" button to move to the next question or restart the quiz
nextBtn.addEventListener("click", () => {
  if (currentQuesIndex < questions.length) {
    handleNextBtn(); // If the quiz isn't over, move to the next question
  } else {
    startQuiz(); // If all questions are answered, restart the quiz
  }
});

// Function to start the timer and handle the countdown
function startTimer() {
  timerElement.innerHTML = `Time Left: ${timeRemaining}s`; // Display the remaining time
  timer = setInterval(() => {
    timeRemaining--; // Decrease the time by 1 second
    timerElement.innerHTML = `Time Left: ${timeRemaining}s`; // Update the displayed time
    if (timeRemaining === 0) {
      clearInterval(timer); // Stop the timer when time runs out
      handleNextBtn(); // Automatically move to the next question when time is up
    }
  }, 1000); // Set the interval to 1 second (1000 ms)
}

// Call the startQuiz function to begin the quiz when the page loads
startQuiz();
