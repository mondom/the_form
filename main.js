const clearBtn = document.querySelector('.clear')
const sendBtn = document.querySelector('.send')
const closeBtn = document.querySelector('.close-popup')
const popup = document.querySelector('.popup')
const usernameInput = document.querySelector('#username')
const mailInput = document.querySelector('#mail')
const phoneInput = document.querySelector('#phone')
const passwordInput = document.querySelector('#password')
const passwordTwoInput = document.querySelector('#password-two')
const regulationsCheckbox = document.querySelector('#regulations')


const showBugs = (input, info, checkbox) => {

    const formBox = input.parentElement;
    const checkBox = checkbox.parentElement;
    const errorInfo = formBox.querySelector('.bug-text')
    formBox.classList.add('bug')
    checkBox.classList.add('bug')
    errorInfo.textContent = info;
}
const clearBug = (input, checkbox)=> {
    const formBox = input.parentElement;
    const checkBox = checkbox.parentElement;
    formBox.classList.remove('bug')
    checkBox.classList.remove('bug')
}

const checkDataInput = input => {
	input.forEach(el => {
		if (el.value === '') {
			showBugs(el, el.placeholder, regulationsCheckbox)
		} else {
			clearBug(el, regulationsCheckbox)
		}
	})

    if (regulationsCheckbox.checked === false) {
		console.log('error')
	}
}

let inputs = [usernameInput, mailInput, phoneInput, passwordInput, passwordTwoInput]

sendBtn.addEventListener('click', e => {
	e.preventDefault()
	checkDataInput(inputs)
})



clearBtn.addEventListener('click', e => {
	e.preventDefault()

	inputs.forEach(el => {
		el.value = ''
	})
    regulationsCheckbox.checked = false
	
})
