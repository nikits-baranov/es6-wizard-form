import { useValidation } from './validation/validation.js'
import header from './template/header'
import base from './template/base'
import footer from './template/footer'
import './style.css'
const { validateField } = useValidation()

const wrapperHtml = document.getElementById('wrapper')
const headerHtml = document.getElementById('header')
const contentHtml = document.getElementById('app')
const footerHtml = document.getElementById('footer')

headerHtml.innerHTML = header
contentHtml.innerHTML = base
footerHtml.innerHTML = footer

wrapperHtml.className = 'min-h-screen flex flex-col justify-stretch'
headerHtml.className = 'flex-none z-50 w-full'
contentHtml.className = 'grow flex items-center'
footerHtml.className = 'flex-none pb-3 pt-5'

const wizardFormButton = document.getElementById('wizard_button')
wizardFormButton.addEventListener('click', event => {
	event.preventDefault()
	contentHtml.className = 'container mx-auto grow'
	new WizardForm('app')
})

class WizardForm {
	constructor(containerId, initialState = {}) {
		this.container = document.getElementById(containerId)
		this.state = {
			pages: 3,
			currentPage: initialState.currentPage || 1,
			hobbiesList: ['Hiking', 'Music', 'Programming'],
			countriesList: [],
			formData: {
				first_name: '',
				last_name: '',
				country_name: '',
				country: '',
				has_children: '',
				hobbies: [],
				driver: '',
				driving_experiance: '',
			},
			errors: {},
		}

		this.render()
	}

	render() {
		this.container.innerHTML = ''

		switch (this.state.currentPage) {
			case 1:
				this.renderStepper()
				this.renderFormWrapper()
				this.renderButtonsPanel()
				this.nextButtonChecking()
				this.renderPage1()
				break
			case 2:
				this.renderStepper()
				this.renderFormWrapper()
				this.renderButtonsPanel()
				this.nextButtonChecking()
				this.renderPage2()
				break
			case 3:
				this.renderStepper()
				this.renderFormWrapper()
				this.renderButtonsPanel()
				this.nextButtonChecking()
				this.renderPage3()
				break
			case 4:
				this.renderFormWrapper()
				this.renderPage4()
				break
			default:
				break
		}
	}

	renderStepper() {
		const stepperWrapper = document.createElement('div')
		const ul = document.createElement('ul')

		stepperWrapper.className = 'max-w-[360px] mx-auto mt-6'
		stepperWrapper.id = 'stepper'

		ul.className =
			'flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 text-base'

		stepperWrapper.appendChild(ul)

		for (let i = 1; i <= this.state.pages; i++) {
			const li = document.createElement('li')
			const span = document.createElement('span')

			if (i <= this.state.currentPage && i != this.state.pages) {
				li.className =
					'flex md:w-full items-center after:w-full after:h-0.5 after:border-b after:border-primary after:bg-primary after:hidden sm:after:inline-block'
			} else if (i != this.state.pages) {
				li.className =
					'flex md:w-full items-center after:w-full after:h-0.5 after:border-b after:border-gray after:bg-gray after:hidden sm:after:inline-block'
			} else {
				li.className = 'flex items-center'
			}

			if (i <= this.state.currentPage) {
				span.className =
					'flex flex-none w-[50px] h-[50px] text-xl rounded-full items-center justify-center border-2 border-primary bg-primary text-white'
			} else if (i === this.state.currentPage + 1) {
				span.className =
					'flex flex-none w-[50px] h-[50px] text-xl rounded-full items-center justify-center border-2 border-primary bg-light text-primary'
			} else if (i >= this.state.currentPage + 2) {
				span.className =
					'flex flex-none w-[50px] h-[50px] text-xl rounded-full items-center justify-center border-2 border-gray bg-light text-black'
			}

			span.textContent = i

			li.appendChild(span)
			ul.appendChild(li)
		}

		this.container.appendChild(stepperWrapper)
	}

	renderFormWrapper() {
		const formWrapper = document.createElement('div')
		formWrapper.className = 'max-w-[491px] mx-auto mt-12'
		formWrapper.id = 'form-wrapper'

		this.container.appendChild(formWrapper)
	}

	renderButtonsPanel() {
		const buttonsWrapper = document.createElement('div')
		buttonsWrapper.className = 'flex gap-4 justify-center mt-6'

		const buttonBack = document.createElement('button')
		const buttonNext = document.createElement('button')

		buttonBack.id = 'back_button'
		buttonNext.id = 'next_button'

		buttonNext.disabled = true

		buttonBack.className =
			'inline-flex items-center justify-center rounded-full border border-primary py-2.5 px-10 text-center transition hover:text-white bg-transparent hover:bg-primary hover:border-primary text-primary'

		buttonNext.className =
			'inline-flex items-center justify-center rounded-full border border-primary py-2.5 text-center transition hover:text-white px-10 bg-primary text-white opacity-50 cursor-default'

		buttonBack.textContent = 'Back'
		buttonNext.textContent = this.state.currentPage == 3 ? 'Submit' : 'Next'

		if (this.state.currentPage > 1) {
			buttonsWrapper.appendChild(buttonBack)

			buttonBack.addEventListener('click', e => {
				this.backPage(e)
			})
		}

		buttonsWrapper.appendChild(buttonNext)

		this.container.appendChild(buttonsWrapper)

		buttonNext.addEventListener('click', e => {
			this.nextPage(e)
		})
	}

	nextPage(e) {
		e.preventDefault()

		switch (this.state.currentPage) {
			case 1: {
				this.state.currentPage++
				break
			}
			case 2: {
				this.state.currentPage++
				break
			}
			case 3: {
				this.state.currentPage++
				break
			}
			default: {
				break
			}
		}

		this.render()
	}

	backPage(e) {
		e.preventDefault()

		if (this.state.currentPage === 1) return
		else this.state.currentPage--

		this.render()
	}

	nextButtonChecking() {
		const button = document.getElementById('next_button')
		let requiredFields = true
		let checkErrors = false

		if (this.state.currentPage === 1) {
			requiredFields =
				!!this.state.formData.first_name &&
				!!this.state.formData.last_name &&
				this.state.countriesList.length > 0 &&
				!!this.state.formData.country

			checkErrors =
				!!this.state.errors['first_name'] ||
				!!this.state.errors['last_name'] ||
				!!this.state.errors['country_selection']
		} else if (this.state.currentPage === 2) {
			requiredFields =
				typeof this.state.formData.has_children === 'boolean' &&
				this.state.formData.hobbies.length > 0

			checkErrors =
				!!this.state.errors['hobbies'] || !!this.state.errors['has_children']
		} else if (this.state.currentPage === 3) {
			if (this.state.formData.driver === 'Yes') {
				requiredFields =
					!this.state.errors['driving_experiance'] &&
					!!this.state.formData.driving_experiance
			}

			checkErrors = false
		}

		if (requiredFields && !checkErrors) {
			button.disabled = false
			button.classList.remove('opacity-50', 'cursor-default')
			button.classList.add('cursor-pointer')
		} else {
			button.disabled = true
			button.classList.remove('cursor-pointer')
			button.classList.add('opacity-50', 'cursor-default')
		}
	}

	errorHandler(inputName, value) {
		const inputErrors = validateField(inputName, value)

		if (inputErrors && inputErrors.length)
			this.state.errors[inputName] = inputErrors
		else this.state.errors[inputName] = null

		const element = document.getElementById(inputName)
		const elementError = document.getElementById(inputName + '_error')

		if (!!this.state.errors[inputName]) {
			element.classList.remove('border-form-stroke')
			element.classList.add('border-danger')
		} else {
			element.classList.remove('border-danger')
			element.classList.add('border-form-stroke')
		}

		elementError.textContent = !!this.state.errors[inputName]
			? this.state.errors[inputName][0]
			: ''
	}

	renderPage1() {
		const layout = `
		    <div class="container flex flex-col gap-10">
          <div>
            <label class="mb-3 text-base font-medium text-black inline-block" for="first_name">
              First name
            </label>
            <div class="relative">
              <input
                type="text"
                id="first_name"
                value="${this.state.formData.first_name}"
                placeholder="John"
                class="w-full rounded-md border p-3 text-black placeholder-[#929DA7] outline-none transition active:border-primary focus:border-primary border-form-stroke pl-12"
                required
              />
              <span class="absolute top-1/2 left-4 -translate-y-1/2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.72039 12.8864C4.50179 12.105 5.5616 11.666 6.66667 11.666H13.3333C14.4384 11.666 15.4982 12.105 16.2796 12.8864C17.061 13.6678 17.5 14.7276 17.5 15.8327V17.4993C17.5 17.9596 17.1269 18.3327 16.6667 18.3327C16.2064 18.3327 15.8333 17.9596 15.8333 17.4993V15.8327C15.8333 15.1696 15.5699 14.5338 15.1011 14.0649C14.6323 13.5961 13.9964 13.3327 13.3333 13.3327H6.66667C6.00363 13.3327 5.36774 13.5961 4.8989 14.0649C4.43006 14.5338 4.16667 15.1696 4.16667 15.8327V17.4993C4.16667 17.9596 3.79357 18.3327 3.33333 18.3327C2.8731 18.3327 2.5 17.9596 2.5 17.4993V15.8327C2.5 14.7276 2.93899 13.6678 3.72039 12.8864Z"
                      fill="#637381"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.0007 3.33268C8.61994 3.33268 7.50065 4.45197 7.50065 5.83268C7.50065 7.21339 8.61994 8.33268 10.0007 8.33268C11.3814 8.33268 12.5006 7.21339 12.5006 5.83268C12.5006 4.45197 11.3814 3.33268 10.0007 3.33268ZM5.83398 5.83268C5.83398 3.5315 7.69946 1.66602 10.0007 1.66602C12.3018 1.66602 14.1673 3.5315 14.1673 5.83268C14.1673 8.13387 12.3018 9.99935 10.0007 9.99935C7.69946 9.99935 5.83398 8.13387 5.83398 5.83268Z"
                      fill="#637381"
                    ></path>
                  </g>
                </svg>
              </span>
            </div>
            <p class="mt-[10px] text-sm text-danger" id="first_name_error"></p>
          </div>
          <div>
            <label class="mb-3 text-base font-medium text-black inline-block" for="last_name">
              Last name
            </label>
            <div class="relative">
              <input
                type="text"
                id="last_name"
                value="${this.state.formData.last_name}"
                placeholder="Milosz"
                class="w-full rounded-md border p-3 text-black placeholder-[#929DA7] outline-none transition active:border-primary focus:border-primary border-form-stroke pl-12"
                required
              />
              <span class="absolute top-1/2 left-4 -translate-y-1/2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.72039 12.8864C4.50179 12.105 5.5616 11.666 6.66667 11.666H13.3333C14.4384 11.666 15.4982 12.105 16.2796 12.8864C17.061 13.6678 17.5 14.7276 17.5 15.8327V17.4993C17.5 17.9596 17.1269 18.3327 16.6667 18.3327C16.2064 18.3327 15.8333 17.9596 15.8333 17.4993V15.8327C15.8333 15.1696 15.5699 14.5338 15.1011 14.0649C14.6323 13.5961 13.9964 13.3327 13.3333 13.3327H6.66667C6.00363 13.3327 5.36774 13.5961 4.8989 14.0649C4.43006 14.5338 4.16667 15.1696 4.16667 15.8327V17.4993C4.16667 17.9596 3.79357 18.3327 3.33333 18.3327C2.8731 18.3327 2.5 17.9596 2.5 17.4993V15.8327C2.5 14.7276 2.93899 13.6678 3.72039 12.8864Z"
                      fill="#637381"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.0007 3.33268C8.61994 3.33268 7.50065 4.45197 7.50065 5.83268C7.50065 7.21339 8.61994 8.33268 10.0007 8.33268C11.3814 8.33268 12.5006 7.21339 12.5006 5.83268C12.5006 4.45197 11.3814 3.33268 10.0007 3.33268ZM5.83398 5.83268C5.83398 3.5315 7.69946 1.66602 10.0007 1.66602C12.3018 1.66602 14.1673 3.5315 14.1673 5.83268C14.1673 8.13387 12.3018 9.99935 10.0007 9.99935C7.69946 9.99935 5.83398 8.13387 5.83398 5.83268Z"
                      fill="#637381"
                    ></path>
                  </g>
                </svg>
              </span>
            </div>
            <p class="mt-[10px] text-sm text-danger" id="last_name_error"></p>
          </div>
          <div>
            <label class="mb-3 text-base font-medium text-black inline-block" for="country_selection">
              Select Country
            </label>
            <div class="relative">
              <div class="relative z-10 bg-white">
                <span class="absolute top-1/2 z-30 left-4 -translate-y-1/2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g opacity="0.8">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z" fill="#637381"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z" fill="#637381"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z" fill="#637381"></path>
                      </g>
                  </svg>
                </span>
                <input
                  type="text"
                  id="country_selection"
                  value="${this.state.formData.country_name}"
                  class="relative w-full appearance-none rounded-md border border-form-stroke bg-transparent py-3 px-12 text-black outline-none transition focus:border-primary
                 active:border-primary disabled:cursor-default disabled:bg-[#F5F7FD]"
                  placeholder="Type to search"
                />
                 <span class="transition absolute top-1/2 right-4 z-10 -translate-y-1/2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g opacity="0.8">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                      </g>
                  </svg>
                </span>

                <ul id="country_selection-list" class="absolute max-h-[200px] overflow-auto z-10 w-full bg-white border border-form-stroke rounded-md shadow-md hidden"></ul>
              </div>
               <p class="mt-[10px] text-sm text-danger" id="country_selection_error"></p>
            </div>
          </div>
        </div>
		`

		const formWrapper = document.getElementById('form-wrapper')
		formWrapper.innerHTML = layout

		const firstNameInput = document.getElementById('first_name')
		const lastNameInput = document.getElementById('last_name')
		const countrySelect = document.getElementById('country_selection')
		const countrySelectList = document.getElementById('country_selection-list')
		const context = this

		firstNameInput.addEventListener('input', event => {
			this.state.formData.first_name = event.target.value
			this.errorHandler('first_name', event.target.value)

			this.nextButtonChecking()
		})

		lastNameInput.addEventListener('input', event => {
			this.state.formData.last_name = event.target.value
			this.errorHandler('last_name', event.target.value)

			this.nextButtonChecking()
		})

		countrySelect.addEventListener('input', event => {
			const searchText = event.target.value

			if (context.state.countriesList.length == 0) {
				fetchCountries(searchText)
			} else {
				filterCountries(searchText)
			}
		})

		countrySelect.addEventListener('focus', event => {
			event.target.nextElementSibling.classList.add('rotate-180')
		})

		countrySelect.addEventListener('focusout', event => {
			event.target.nextElementSibling.classList.remove('rotate-180')
		})

		countrySelect.addEventListener('input', event => {
			const searchText = event.target.value

			if (context.state.countriesList.length == 0) {
				fetchCountries(searchText)
			} else {
				filterCountries(searchText)
			}
		})

		async function fetchCountries(searchText) {
			const countriesApi =
				'https://countriesnow.space/api/v0.1/countries/states'

			try {
				const response = await fetch(countriesApi)
				const data = await response.json()

				const transformedData = data.data.map(item => ({
					iso3: item.iso3,
					name: item.name,
				}))

				context.state.countriesList = transformedData
				filterCountries(searchText)
			} catch (error) {
				console.error('Error fetching countries:', error)
			}
		}

		function filterCountries(searchText) {
			const filteredCountries = context.state.countriesList.filter(country =>
				country.name.toLowerCase().includes(searchText.toLowerCase())
			)

			populateCountryList(filteredCountries)
		}

		function populateCountryList(filteredCountries) {
			countrySelectList.innerHTML = ''

			filteredCountries.forEach(country => {
				const listItem = document.createElement('li')
				listItem.textContent = country.name
				listItem.classList.add(
					'py-2',
					'px-3',
					'text-gray-800',
					'cursor-pointer',
					'hover:bg-primary',
					'hover:text-white',
					'transition-colors',
					'duration-200'
				)

				listItem.addEventListener('click', () => {
					countrySelect.value = country.name
					context.state.formData.country_name = country.name
					context.state.formData.country = country.iso3

					countrySelectList.classList.add('hidden')

					context.errorHandler('country_selection', countrySelect.value)
					context.nextButtonChecking()
				})

				countrySelectList.appendChild(listItem)
			})

			function clickHandler(event) {
				if (event.target.id != 'country_selection-list') {
					if (countrySelect.value.length == 0) {
						countrySelect.value = ''
						context.state.formData.country_name = ''
						context.state.formData.country = ''

						context.errorHandler('country_selection', countrySelect.value)
						context.nextButtonChecking()
					} else {
						countrySelect.value = context.state.formData.country_name
					}

					countrySelectList.classList.add('hidden')
					document.removeEventListener('click', clickHandler)
				}
			}

			document.addEventListener('click', clickHandler)

			if (filteredCountries.length > 0) {
				countrySelectList.classList.remove('hidden')
			} else {
				countrySelectList.classList.add('hidden')
			}
		}
	}

	renderPage2() {
		const layout = `
	    <div class="container flex flex-col gap-10">
        <div>
          <label class="mb-3 text-base font-medium text-black inline-block" for="has_children">
           Has children
          </label>
          <div class="relative">
              <select
                id="has_children"
                class="border-form-stroke  focus:border-primary active:border-primary w-full appearance-none rounded-md border py-3 pl-5 pr-12 font-normal outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD] text-[#929DA7] cursor-pointer"
              >
                <option value="" disabled selected hidden>Choose option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <span
                class="border-[#637381] opacity-8 absolute right-5 top-1/2 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2"
                >
              </span>
          </div>
          <p class="mt-[10px] text-sm text-danger" id="has_children_error"></p>
        </div>
        <div>
          <label class="mb-3 text-base font-medium text-black inline-block" for="hobbies_search">
           Hobbies
          </label>
          <div id="hobbies" class="relative z-20 flex w-full rounded-md border py-1 min-h-[50px] border-form-stroke p-[5px] pr-12 pl-3 font-medium  text-body-color placeholder-body-color outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD] cursor-pointer">
            <div class="flex items-center gap-2 bg-transparent">
              <input
              type="text"
              id="hobbies_search"
              class="relative flex flex-auto w-full appearance-none rounded-md border-0 bg-transparent px-2 text-black outline-none transition font-normal
              disabled:cursor-default disabled:bg-[#F5F7FD]"
              placeholder="Choose options"
            />
            </div>
            <span class="transition absolute top-1/2 right-3 z-10 -translate-y-1/2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="1">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="#637381"></path>
                  </g>
              </svg>
            </span>
            <ul id="hobbies_list" class="hidden absolute max-h-[200px] overflow-auto top-full left-0 z-10 w-full bg-white border border-form-stroke shadow-md rounded-md mt-1">
            </ul>
          </div>
           <p class="mt-[10px] text-sm text-danger" id="hobbies_error"></p>
        </div>
      </div>
	`

		const formWrapper = document.getElementById('form-wrapper')
		formWrapper.innerHTML = layout

		const selectElement = document.getElementById('has_children')
		const selectedHobbies = document.getElementById('hobbies')
		const selectSearch = document.getElementById('hobbies_search')
		const selectOptionsList = document.getElementById('hobbies_list')
		const context = this

		if (context.state.formData.hobbies.length > 0) {
			context.state.formData.hobbies.forEach(item => {
				createHobbyElement(item)
				selectSearch.removeAttribute('placeholder')
			})
		}

		if (typeof context.state.formData.has_children === 'boolean') {
			selectElement.value = context.state.formData.has_children ? 'Yes' : 'No'

			selectElement.classList.remove('text-[#929DA7]')
			selectElement.classList.add('text-black')
		}

		selectElement.addEventListener('change', event => {
			selectElement.classList.remove('text-[#929DA7]')
			selectElement.classList.add('text-black')

			context.state.formData.has_children =
				event.target.value === 'Yes' ? true : false

			context.errorHandler('has_children', event.target.value)
			context.nextButtonChecking()
		})

		selectedHobbies.addEventListener('click', event => {
			selectSearch.focus()
		})

		selectSearch.addEventListener('focus', event => {
			event.target.offsetParent.classList.add('border-primary')
			event.target.offsetParent.classList.remove('border-form-stroke')
			selectOptionsList.classList.remove('hidden')

			filterHobbies(event.target.value)

			if (
				context.state.formData.hobbies.length ===
				context.state.hobbiesList.length
			) {
				selectOptionsList.classList.add('hidden')
			}
		})

		selectSearch.addEventListener('input', event => {
			filterHobbies(event.target.value)
		})

		selectSearch.addEventListener('focusout', event => {
			event.target.offsetParent.classList.remove('border-primary')

			if (!context.state.errors['hobbies']) {
				event.target.offsetParent.classList.add('border-form-stroke')
			}
		})

		function filterHobbies(searchText) {
			const filteredHobbies = context.state.hobbiesList.filter(hobby =>
				hobby.toLowerCase().includes(searchText.toLowerCase())
			)

			populateHobbiesList(filteredHobbies)
		}

		function createHobbyElement(hobby) {
			const hobbyElement = document.createElement('span')

			const closeIconHtml = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.35355 3.35355C9.54882 3.15829 9.54882 2.84171 9.35355 2.64645C9.15829 2.45118 8.84171 2.45118 8.64645 2.64645L6 5.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L5.29289 6L2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L6 6.70711L8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L6.70711 6L9.35355 3.35355Z" fill="currentColor"></path></svg>`

			hobbyElement.textContent = hobby
			hobbyElement.classList.add(
				'flex',
				'items-center',
				'justify-center',
				'rounded',
				'border-[.5px]',
				'border-form-stroke',
				'bg-[#EEEEEE]',
				'py-[6px]',
				'px-[10px]',
				'text-sm',
				'font-medium',
				'text-[#637381]'
			)

			const removeHobbyElement = document.createElement('span')
			removeHobbyElement.classList.add(
				'cursor-pointer',
				'pl-2',
				'text-body',
				'hover:text-primary'
			)

			removeHobbyElement.innerHTML = closeIconHtml

			hobbyElement.appendChild(removeHobbyElement)

			selectSearch.before(hobbyElement)

			removeHobbyElement.addEventListener('click', _ => {
				const index = context.state.formData.hobbies.indexOf(hobby)
				context.state.formData.hobbies.splice(index, 1)
				hobbyElement.remove()

				if (context.state.formData.hobbies.length == 0) {
					selectSearch.setAttribute('placeholder', 'Choose options')
				}

				context.errorHandler('hobbies', context.state.formData.hobbies)
				context.nextButtonChecking()
			})

			context.errorHandler('hobbies', context.state.formData.hobbies)
			context.nextButtonChecking()
		}

		function populateHobbiesList(filteredHobbies) {
			selectOptionsList.innerHTML = ''

			filteredHobbies.forEach(hobby => {
				if (
					context.state.formData.hobbies.length == 0 ||
					!context.state.formData.hobbies.includes(hobby)
				) {
					const listItem = document.createElement('li')
					listItem.textContent = hobby
					listItem.classList.add(
						'py-3',
						'px-3',
						'border-gray',
						'text-black',
						'cursor-pointer',
						'hover:bg-primary',
						'hover:text-white',
						'transition-colors',
						'hobbies-list-element',
						'duration-200'
					)

					listItem.addEventListener('click', e => {
						e.preventDefault()
						context.state.formData.hobbies.push(hobby)
						createHobbyElement(hobby)

						selectSearch.value = ''
						selectOptionsList.classList.add('hidden')

						if (selectSearch.hasAttribute('placeholder')) {
							selectSearch.removeAttribute('placeholder')
						}
					})

					selectOptionsList.appendChild(listItem)
				}
			})

			function clickHandlerOutHobbies(event) {
				if (!selectOptionsList.contains(event.target)) {
					selectSearch.value = ''
					selectOptionsList.classList.add('hidden')
					document.removeEventListener('click', clickHandlerOutHobbies)
				}
			}

			document.addEventListener('mousedown', clickHandlerOutHobbies)
		}
	}

	renderPage3() {
		const layout = `
		    <div class="container flex flex-col gap-10">
          <div>
            <p class="mb-3 block text-base font-medium text-black text-center">Drives a car</p>
            <div class="flex gap-4 justify-center">
              <div class="flex items-center">
                <input
                  id="radio-1"
                  type="radio"
                  name="car_driver"
                  class="w-4 h-4"
                  value="Yes"
                />
                <label for="radio-1" class="ml-2 text-sm font-medium text-gray-900">
                  Yes
                </label>
              </div>
              <div class="flex items-center">
                <input
                  id="radio-2"
                  type="radio"
                  name="car_driver"
                  class="w-4 h-4"
                  value="No"
                />
                <label for="radio-2" class="ml-2 text-sm font-medium text-gray-900">
                  No
                </label>
              </div>
            </div>
          </div>
          <div id="driving_experiance_field">
            <label class="mb-3 text-base font-medium text-black inline-block" for="driving_experiance">
             Driving experience(years)
            </label>
            <div class="relative">
              <input
                type="text"
                id="driving_experiance"
                value="${this.state.formData.driving_experiance}"
                placeholder="0"
                class="w-full rounded-md border p-3 text-black placeholder-[#929DA7] outline-none transition active:border-primary focus:border-primary border-form-stroke pl-5"
                required
              />
            </div>
            <p class="mt-[10px] text-sm text-danger" id="driving_experiance_error"></p>
          </div>
        </div> `

		const formWrapper = document.getElementById('form-wrapper')
		formWrapper.innerHTML = layout

		const radioButtons = document.querySelectorAll('input[name="car_driver"]')
		const drivingExperianceField = document.getElementById(
			'driving_experiance_field'
		)
		const drivingExperiance = document.getElementById('driving_experiance')
		const drivingExperianceError = document.getElementById(
			'driving_experiance_error'
		)
		const context = this

		for (const radioButton of radioButtons) {
			if (
				context.state.formData.driver.length > 0 &&
				radioButton.value == context.state.formData.driver
			) {
				radioButton.setAttribute('checked', true)
			}

			if (context.state.formData.driver === 'Yes') {
				drivingExperianceField.classList.remove('hidden')
			} else {
				drivingExperianceField.classList.add('hidden')
			}

			radioButton.addEventListener('change', function (event) {
				context.state.formData.driver = event.target.value

				if (event.target.value === 'Yes') {
					drivingExperianceField.classList.remove('hidden')
				} else {
					drivingExperianceField.classList.add('hidden')
					drivingExperiance.value = ''
					context.state.formData.driving_experiance = ''
					drivingExperiance.classList.remove('border-danger')
					drivingExperiance.classList.add('border-form-stroke')
					context.state.errors['driving_experiance'] = null
					drivingExperianceError.textContent = ''
				}

				context.nextButtonChecking()
			})
		}

		drivingExperiance.addEventListener('input', event => {
			context.state.formData.driving_experiance = event.target.value

			context.errorHandler('driving_experiance', event.target.value)
			context.nextButtonChecking()
		})
	}

	renderPage4() {
		const formWrapper = document.getElementById('form-wrapper')
		formWrapper.innerHTML = ''

		const container = document.createElement('div')
		container.className =
			'bg-light w-full min-h-[100px] mt-6 rounded-md shadow-sm p-5'

		const title = document.createElement('h3')
		title.className = 'text-lg text-black font-medium'
		title.textContent = 'Prepared JSON based on answers:'

		const codeContainer = document.createElement('pre')
		codeContainer.className = 'p-2.5'

		const code = document.createElement('code')
		code.className = 'json'
		code.id = 'json-show'
		code.textContent = this.renderJsonData()

		codeContainer.appendChild(code)
		container.appendChild(title)
		container.appendChild(codeContainer)

		const resetButton = document.createElement('button')
		resetButton.className =
			'text-primary mt-6 block mx-auto border-primary hover:bg-primary hover:border-primary flex-none items-center justify-center rounded-md border py-3 px-10 text-center text-base transition hover:text-white lg:px-8 xl:px-10'
		resetButton.textContent = 'Home page'

		resetButton.addEventListener('click', event => {
			event.preventDefault()
			location.reload()
		})

		formWrapper.appendChild(container)
		formWrapper.appendChild(resetButton)
	}

	renderJsonData() {
		const data = {
			first_name: this.state.formData.first_name,
			last_name: this.state.formData.last_name,
			country: this.state.formData.country,
			has_children: this.state.formData.has_children,
			hobbies: this.state.formData.hobbies,
			page: this.state.currentPage,
			car_driver: this.state.formData.driver,
			driving_experiance:
				parseFloat(this.state.formData.driving_experiance) || 0,
		}

		const jsonString = JSON.stringify(data, null, 2)
		const formattedJson = jsonString.replace(/\[\s+\]/g, '[]') // Remove extra space inside empty arrays

		return formattedJson
	}
}
