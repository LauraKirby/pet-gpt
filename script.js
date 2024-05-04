document.addEventListener("DOMContentLoaded", function() {
    const questionForm = document.getElementById("question-form");
    const questionInput = document.getElementById("question-input");
    const answerContainer = document.getElementById("answer-container");

    questionForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        const questionText = questionInput.value;
        displayQuestion(questionText);

        questionInput.value = ""; // Clear the input field after submitting the question
    });

    function displayQuestion(questionText) {
        const questionElement = document.createElement("p");
        questionElement.textContent = questionText;
        answerContainer.appendChild(questionElement);
    }
});
