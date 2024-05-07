document.addEventListener("DOMContentLoaded", function () {
  console.log("we are in the answer js file");
  const questionForm = document.getElementById("question-form");
  const questionInput = document.getElementById("question-input");
  const answerContainer = document.getElementById("answer-container");
  console.log(questionInput);

  console.log("we are in the topic js file");
  const breed = document.getElementById("question-form");
  const breedTopic = document.getElementById("breed_details");
  const communityTopic = document.getElementById("community");
  const medicalTopic = document.getElementById("medical");
  const suppliesTopic = document.getElementById("supplies");
  const trainingTopic = document.getElementById("training");
  const showAllTopics = document.getElementById("view-all-topics");

  medicalTopic.addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent the default form submission
    console.log("medical clicked");
    // hide all topics
    console.log("breedTopic: ", breedTopic);
    breedTopic.style.display = "none";
    console.log("breedTopic: ", breedTopic);
    communityTopic.style.display = "none";
    medicalTopic.style.display = "none";
    suppliesTopic.style.display = "none";
    trainingTopic.style.display = "none";
    breedTopic.classList.add("hide");
    // back, show all topics
    const questionText = questionInput.value;
  });

  showAllTopics.addEventListener("click", function (event) {
    console.log("we are in the listener for question submit");
    event.preventDefault(); // Prevent the default form submission

    // we want to get the value of the button clicked
    console.log(event);

    // show all topics
    breedTopic.classList.remove("hidden");
    communityTopic.classList.remove("hidden");
    medicalTopic.classList.remove("hidden");
    suppliesTopic.classList.remove("hidden");
    trainingTopic.classList.remove("hidden");

    // back clicked, show all topics
  });

  questionForm.addEventListener("submit", function (event) {
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
});
