const userInput = document.querySelector('#username')
const mailInput = document.querySelector('#mail')
const phoneInput = document.querySelector('#phone')
const passInput = document.querySelector('#password')
const pass2Input = document.querySelector('#password-two')
const checkbox = document.querySelector('#regulations')
const checkboxBox = checkbox.parentElement
const clearBtn = document.querySelector('.clear')
const sendBtn = document.querySelector('.send')
const bugInfo = document.querySelector('.bug-text')
const popup = document.querySelector('.popup')

let inputs = [userInput, mailInput, phoneInput, passInput, pass2Input]

const showInputBug = (input, info) => {
	const dataBox = input.parentElement
	const text = dataBox.querySelector('.bug-text')
	dataBox.classList.add('bug')
	text.textContent = info
}
const showCheckboxBug = () => {
	const checkboxBox = checkbox.parentElement
	checkboxBox.classList.add('bug')
}

const clearInputBug = input => {
	const dataBox = input.parentElement
	dataBox.classList.remove('bug')
}

const clearCheckboxBug = () => {
	checkboxBox.classList.remove('bug')
}

const checkNumOfChart = (input, number) => {
	if (input.value.length < number) {
		showInputBug(input, `${input.previousElementSibling.textContent} should have ${number} characters`)
	}
}

const checkPasswords = (firstPass, secondPass) => {
	if (firstPass.value !== secondPass.value) {
		showInputBug(secondPass, `Passwords do not match!`)
	}
}

const checkMail = () => {
	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if (regex.test(mailInput.value)) {
		clearInputBug(mailInput)
	} else {
		showInputBug(mailInput, `Email address is incorrect`)
	}
}
const checkPhone = () => {
	const regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/

	if (regex.test(phoneInput.value)) {
		clearInputBug(phoneInput)
	} else {
		showInputBug(phoneInput, `Phone number is incorrect`)
	}
}

const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			showInputBug(el, el.placeholder)
		} else {
			clearInputBug(el)
		}
	})

	if (checkbox.checked === false) {
		showCheckboxBug()
	} else {
		clearCheckboxBug()
	}
}

const sendForm = () => {
	const dataBoxes = document.querySelectorAll('.data-box')
	let bugs = 0

	dataBoxes.forEach(box => {
		if (box.classList.contains('bug') || checkbox.checked === false) {
			bugs++
		}
	})

	if (bugs++ === 0) {
		popup.classList.add('active-popup')
	}
}

sendBtn.addEventListener('click', e => {
	e.preventDefault()
	checkForm(inputs)
	checkNumOfChart(userInput, 4)
	checkNumOfChart(passInput, 8)
	checkPasswords(passInput, pass2Input)
	checkMail()
	checkPhone()
	sendForm()
})

clearBtn.addEventListener('click', e => {
	e.preventDefault()

	inputs.forEach(el => {
		el.value = ''
		clearInputBug(el)
	})

	clearCheckboxBug()
	checkbox.checked = false
})
