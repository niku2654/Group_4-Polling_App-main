
document.getElementById('poll-form').addEventListener('submit', function (event) {
  event.preventDefault();

  
  const question = document.getElementById('question').value;
  const option1 = document.getElementById('option1').value;
  const option2 = document.getElementById('option2').value;
  const option3 = document.getElementById('option3').value;

  
  const poll = {
    question: question,
    options: [option1, option2, option3],
    votes: [0, 0, 0]
  };

  
  localStorage.setItem('poll', JSON.stringify(poll));

  
  document.getElementById('create-poll-section').style.display = 'none';
  document.getElementById('vote-section').style.display = 'block';

  
  document.getElementById('poll-question').innerText = poll.question;
  const pollOptionsDiv = document.getElementById('poll-options');
  pollOptionsDiv.innerHTML = ''; 

  poll.options.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.innerHTML = `<input type="radio" name="poll-option" value="${index}" id="option-${index}">
                               <label for="option-${index}">${option}</label>`;
    pollOptionsDiv.appendChild(optionElement);
  });

  
  displayResults();
});


document.getElementById('poll-options').addEventListener('change', function () {
  const selectedOptionIndex = document.querySelector('input[name="poll-option"]:checked')?.value;
  if (selectedOptionIndex !== undefined) {
    const poll = JSON.parse(localStorage.getItem('poll'));
    poll.votes[selectedOptionIndex] += 1;
    localStorage.setItem('poll', JSON.stringify(poll));
    displayResults();
  }
});

function displayResults() {
  const poll = JSON.parse(localStorage.getItem('poll'));
  const pollResultsDiv = document.getElementById('poll-results');
  pollResultsDiv.innerHTML = ''; 

  poll.options.forEach((option, index) => {
    const resultElement = document.createElement('div');
    resultElement.innerText = `${option}: ${poll.votes[index]} vote(s)`;
    pollResultsDiv.appendChild(resultElement);
  });
}
