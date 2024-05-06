document.addEventListener("DOMContentLoaded", function() {
    console.log("we are in the answer js file");
    const questionForm = document.getElementById("question-form");
    const questionInput = document.getElementById("question-input");
    const answerContainer = document.getElementById("answer-container");
    console.log(questionInput);

    questionForm.addEventListener("submit", function(event) {
        console.log("we are in the listener for question submit");
        event.preventDefault(); // Prevent the default form submission

        const questionText = questionInput.value;
        if (questionText.trim() !== "") {
            console.log("right before submit question");
            submitQuestion(questionText);
            questionInput.value = ""; // Clear the input field after submitting the question
        } else {
            console.warn("Please enter a question before submitting.");
        }
    });

    async function submitQuestion(questionText) {
        console.log("in the async function");
        console.log(questionText)
        try {
            const response = await fetch("http://localhost:4000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ question: questionText }) // Stringify the JSON object
            });
            if (response.ok) {
                const data = await response.json();
                displayQuestion(data.question); 
                displayAnswer(data.answer);
            } else {
                console.error("Server responded with error:", response.statusText);
            }
        } catch (error) {
            console.error("Error sending question to server:", error);
        }
    }

    function displayQuestion(questionText) {
        const questionElement = document.createElement("li");
        questionElement.textContent = questionText;
        const questionList = document.getElementById("question-list");
        questionList.appendChild(questionElement);
    }

    function displayAnswer(answerText) {
        const answerElement = document.createElement("p");
        answerElement.textContent = answerText;
        answerContainer.appendChild(answerElement);
    }
});
