document.addEventListener("DOMContentLoaded", function () {
    console.log("we are in the answer js file");
    const questionForm = document.getElementById("question-form");
    const questionInput = document.getElementById("question-input");
    const answerContainer = document.getElementById("answer-container");
    console.log(questionInput.value);
  
    const breedTopic = document.getElementById("breed_details");
    const submitButton = document.getElementById("submit")
    const communityTopic = document.getElementById("community");
    const medicalTopic = document.getElementById("medical");
    const suppliesTopic = document.getElementById("supplies");
    const trainingTopic = document.getElementById("training");
    const showAllTopics = document.getElementById("view-all-topics");
    const topicsContainer = document.getElementById("topics");
    const suppliesDescription = document.getElementById("about-supplies");
    
    // Event listener for "View All Topics" button
    showAllTopics.addEventListener("click", function (event) {
      topicsContainer.style.display = "block";
    });
  
    // Event listener for "Medical" topic button
    medicalTopic.addEventListener("click", function (event) {
      topicsContainer.style.display = "none";
      showSupplyDetails();
    });

    suppliesTopic.addEventListener("click", function (event) {
        topicsContainer.style.display = "none";
        showSupplyDetails();
    });

    communityTopic.addEventListener("click", function (event) {
        topicsContainer.style.display = "none";
        showSupplyDetails();
    });
    
  
    // Event listener for form submission
    questionForm.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default form submission
  
      const questionText = questionInput.value;
      if (questionText.trim() !== "") {
        submitQuestion(questionText);
        questionInput.value = ""; // Clear the input field after submitting the question
      } else {
        console.warn("Please enter a question before submitting.");
      }
    });
  
    async function submitQuestion(questionText) {
        console.log("in the async function");
        console.log(questionText);
        try {
          const response = await fetch("http://localhost:4000/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ question: questionText }), // Stringify the JSON object
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
  
    function showSupplyDetails() {
      suppliesDescription.style.display = "block";
    }
  });
  