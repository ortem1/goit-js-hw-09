const startBtn = document.querySelector('#data-start')
const stopBtn = document.querySelector('#data-stop')
const body = document.querySelector('body')
const html = document.querySelector('html')
let intervalId = null

startBtn.addEventListener('click', () => {
  intervalId = setInterval(() => {
    html.style.backgroundColor = getRandomHexColor()
    body.style.backgroundColor = html.style.backgroundColor
  }, 1000)
  forStartBtn()
})

stopBtn.addEventListener('click', () => {
  clearInterval(intervalId)
  forStopBtn()
})



function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function forStartBtn() {
  startBtn.setAttribute('disabled', '')
  startBtn.classList.add('disabled')
  stopBtn.removeAttribute('disabled', '')
  stopBtn.classList.remove('disabled')
}

function forStopBtn() {
  startBtn.removeAttribute('disabled', '')
  startBtn.classList.remove('disabled')
  stopBtn.setAttribute('disabled', '')
  stopBtn.classList.add('disabled')
}

