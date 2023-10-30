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

const checkMail = mail => {
	const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if(regex.test(mail.value)){
		clearBugs(mailInput)
	} else {
		showInputsBugs(mailInput, `The email is incorrect`)
	}
}

const checkPhone = phone => {
	const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

	if(regex.test(phone.value)){
		clearBugs(phoneInput)
	} else {
		showInputsBugs(phoneInput, `The phone number is incorrect`)
	}
}

let inputs = [usernameInput, mailInput, phoneInput, passwordInput, passwordTwoInput]

sendBtn.addEventListener('click', e => {
	e.preventDefault()
	checkDataInput(inputs)
	checkLength(usernameInput, 5)
	checkLength(passwordInput, 8)
	checkPasswords(passwordInput, passwordTwoInput)
	checkMail(mailInput)
	checkPhone(phoneInput)
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
