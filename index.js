const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Which of these will check whether the ball is touching the target?',
    answers: [
      { text: 'if(target(ball)){}', correct: false },
      { text: 'if(ball.isTouching(target)){}', correct: true },
      { text: 'if(ball.istouch()){}', correct: false },
      { text: 'none of these', correct: false }

    ]
  },
  {
    question: 'Which is the correct way to capture the space key pressed event of your keyboard?',
    answers: [
      { text: 'if(keyDown(space)){}', correct: false },
      { text: 'if(keyWentUp(space)){}', correct: false },
      { text: 'if(keyDown(space)){}', correct: false },
      { text: 'none of these', correct: true }
    ]
  },
  {
    question: 'What is the way of declaring a sprite?',
    answers: [
      { text: 'var', correct: true },
      { text: 'variable', correct: false },
      { text: 'draw', correct: false },
      { text: 'keydown', correct: false }
    ]
  },
  {
    question: 'How do we assign the y position to sprite object called lucile according to mouse movement?',
    answers: [
      { text: 'lucile.ys=World.mouseY;', correct: false },
      { text: 'none ofthe above;', correct: true }
    ]
  }
]