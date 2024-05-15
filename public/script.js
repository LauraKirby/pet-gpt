document.addEventListener("DOMContentLoaded", function () {
  console.log("we are in the js file");
  const questionForm = document.getElementById("question-form");
  const dogForm = document.getElementById("dog-form");
  const questionInput = document.getElementById("question-input");
  const answerContainer = document.getElementById("answer-container");
  const breedInput = document.getElementById("breed-select");
  const adoptionDate = document.getElementById("adoption-date");
  const cityInput = document.getElementById("city-select");
  console.log(cityInput);

  var elems = document.querySelectorAll("select");
  const options = [1, 2, 3];
  var instances = M.FormSelect.init(elems, options);

  const submitButton = document.getElementById("submit_info");
  console.log(submitButton);
  submitButton.addEventListener("click", async function (event) {
    console.log("we are in the listener for the form submission");
    event.preventDefault(); // Prevent the default button click behavior

    const breed = breedInput.value;
    const city = cityInput.value;
    const adoptionDateValue = adoptionDate.value;

    if (
      breed.trim() !== "" &&
      city.trim() !== "" &&
      adoptionDateValue.trim() !== ""
    ) {
      await submitDogInfo(breed, city, adoptionDateValue); // Wait for the submission of the data
      // Clear the input fields after submitting
      breedInput.value = "";
      cityInput.value = "";
      adoptionDate.value = "";
    } else {
      console.warn("Please enter all information before submitting.");
    }
  });

  async function submitDogInfo(breed, city, adoptionDate) {
    try {
      const currentUrl = window.location.href
      const currentUrlWithParams = `${currentUrl}dogs?breed=${breed}&location=${city}&adoptionDate=${adoptionDate}`
      window.location.href = currentUrlWithParams
    } catch (error) {
      console.error("Error sending dog info to server:", error);
    }
  }

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
