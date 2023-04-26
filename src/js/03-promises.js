import Notiflix from "notiflix";


const form = document.querySelector('.form')

// Альтернативное решение

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.5;
//   return new Promise((resolve, reject) => {
//       if (shouldResolve) {
//           return resolve({position, delay})
//         } else {
//           return reject ({position, delay})
//         }
//   })
// }


const createPromise = (position, delay) => {
  const shouldResolve = Math.random() > 0.5;
  if (shouldResolve) {
          return Promise.resolve({position, delay})
        } else {
          return Promise.reject ({position, delay})
        }
}


form.addEventListener('submit', (e) => {
  e.preventDefault()
  const form = e.currentTarget
  let delayForm = Number(form['delay'].value)
  let amountForm = Number(form['amount'].value)
  let stepForm = Number(form['step'].value)
  let position = 0

  for (let i = 1; i <= amountForm; i += 1) {
    position = i

    let firstDelay = delayForm
    let delay = delayForm += stepForm

    createPromise(position, firstDelay, delay)
      .then(({ position, delay }) => {
      
        setTimeout(() => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
        }, delay)
          })

          .catch(({ position, delay }) => {
          
            setTimeout(() => {
              Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`)
            }, delay)
        })
    
    } 
})