document.addEventListener("DOMContentLoaded", function () {
  console.log("we are in the answer js file");
  const questionForm = document.getElementById("question-form");
  const questionInput = document.getElementById("question-input");
  const answerContainer = document.getElementById("answer-container");
  console.log(questionInput.value);

  const breedTopic = document.getElementById("breed_details");
  const submitButton = document.getElementById("submit");
  const communityTopic = document.getElementById("community");
  const medicalTopic = document.getElementById("medical");
  const suppliesTopic = document.getElementById("supplies");
  const trainingTopic = document.getElementById("training");

  const breedDescription = document.getElementById("about-breed");
  const communityDescription = document.getElementById("about-community");
  const medicalDescription = document.getElementById("about-medical");
  const suppliesDescription = document.getElementById("about-supplies");
  const trainingDescription = document.getElementById("about-training");

  // Event listener for "Breed Details" topic button
  breedTopic.addEventListener("click", function (event) {
    event.preventDefault(); 
    hideAllTopicsDetails();
    showTopicDetails("breed");
  });

  // Event listener for "Community" topic button
  communityTopic.addEventListener("click", function (event) {
    event.preventDefault(); 
    hideAllTopicsDetails();
    showTopicDetails("community");
  });

  // Event listener for "Medical" topic button
  medicalTopic.addEventListener("click", function (event) {
    event.preventDefault(); 
    hideAllTopicsDetails();
    showTopicDetails("medical");
  });

  // Event listener for "Supplies" topic button
  suppliesTopic.addEventListener("click", function (event) {
    event.preventDefault(); 
    hideAllTopicsDetails();
    showTopicDetails("supplies");
  });

  // Event listener for "Training" topic button
  trainingTopic.addEventListener("click", function (event) {
    event.preventDefault(); 
    hideAllTopicsDetails();
    showTopicDetails("training");
  });

  // Event listener for form submission
  questionForm.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const questionText = questionInput.value;
    if (questionText.trim() !== "") {
      console.log("submit question")
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
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: questionText }), // Stringify the JSON object
      });
      console.log('response: ')
      console.log(response)
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
    const questionList = document.getElementById("question-list");
    questionList.innerHTML = `<li>${questionText}</li>`;
  }

  function displayAnswer(answerText) {
    const answerContainer = document.getElementById("answer-container");
    answerContainer.innerHTML = `<p>${answerText}</p>`;
  }

  function hideAllTopicsDetails() {
    breedDescription.classList.add("hide")
    communityDescription.classList.add("hide")
    medicalDescription.classList.add("hide")
    suppliesDescription.classList.add("hide")
    trainingDescription.classList.add("hide")
  }

  function showTopicDetails(id) {
    document.getElementById(`about-${id}`).classList.remove("hide");
  }
});
