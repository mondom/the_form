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

const showInputsBugs = (input, info) => {
	const formBox = input.parentElement

	const errorInfo = formBox.querySelector('.bug-text')
	formBox.classList.add('bug')

	errorInfo.textContent = info
}
const showCheckboxBug = checkbox => {
	const checkBox = checkbox.parentElement
	checkBox.classList.add('bug')
}
const clearBugs = input => {
	const formBox = input.parentElement
	formBox.classList.remove('bug')
}

const clearCheckboxBug = checkbox => {
	const checkBox = checkbox.parentElement
	checkBox.classList.remove('bug')
}

const checkDataInput = input => {
	input.forEach(el => {
		if (el.value === '') {
			showInputsBugs(el, el.placeholder)
		} else {
			clearBugs(el)
	
		}
	})

	if (regulationsCheckbox.checked === false) {
		showCheckboxBug(regulationsCheckbox)
	} else {
		clearCheckboxBug(regulationsCheckbox)
	}
}

const checkLength = (input, number) => {
	if (input.value.length < number) {
		showInputsBugs(
			input,
			`${input.previousElementSibling.innerText.slice(0, -1)} should consist of the ${number} characters.`
		)
	}
}

const checkPasswords = (pass1, pass2) => {
	if (pass1.value !== pass2.value) {
		showInputsBugs(pass2, `Passwords do not match`)
	}
}

let inputs = [usernameInput, mailInput, phoneInput, passwordInput, passwordTwoInput]

sendBtn.addEventListener('click', e => {
	e.preventDefault()
	checkDataInput(inputs)
	checkLength(usernameInput, 5)
	checkLength(passwordInput, 8)
	checkPasswords(passwordInput, passwordTwoInput)
})

clearBtn.addEventListener('click', e => {
	e.preventDefault()

	inputs.forEach(el => {
		el.value = ''
		clearBugs(el)
	})
	regulationsCheckbox.checked = false
	clearCheckboxBug(regulationsCheckbox)
})
