import validationRules from './dictionary'

export function useValidation() {
	function validateField(inputName, value) {
		return validationRules[inputName].rules
			.filter(rule => {
				const isValid = rule(value)
				if (isValid !== true) {
					return isValid
				}
			})
			.map(rule => rule(value))
	}

	return {
		validateField,
	}
}
