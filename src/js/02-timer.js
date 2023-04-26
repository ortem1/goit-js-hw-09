import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('input')
const button = document.querySelector('button')
let daysCalc = document.querySelector('[data-days]')
let hoursCalc = document.querySelector('[data-hours]')
let minutesCalc = document.querySelector('[data-minutes]')
let secondsCalc = document.querySelector('[data-seconds]')

button.disabled = 'disabled'

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (this.selectedDates[0] > Date.now()) {
      button.disabled = null
    } else {
      return Notiflix.Notify.failure('Please choose date in the future')
    }
  },
};


function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;


  const days = addLeadingZero(Math.floor(ms / day));

  const hours = addLeadingZero(Math.floor((ms % day) / hour));

  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
    return String(value).padStart(2, '0')
}

const dateFlatpickr = flatpickr(input, options)


let timerId = null


  function timer() {
      let selectedTime = dateFlatpickr.selectedDates[0].getTime();
      let currentTime = Date.now()
      timerId = setInterval(() => {
        
      currentTime = Date.now()
      const delta = selectedTime - currentTime
      const { days, hours, minutes, seconds } = convertMs(delta)

      daysCalc.textContent = days
      hoursCalc.textContent = hours
      minutesCalc.textContent = minutes
      secondsCalc.textContent = seconds
      
        if (delta <= 1000) {
          clearInterval(timerId)
        }

      }, 1000) 
    
    button.disabled = 'disabled'
}


button.addEventListener('click', timer)