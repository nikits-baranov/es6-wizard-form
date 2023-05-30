const validationRules = {
	first_name: {
		rules: [
			value => !!value || 'First name field is required',
			value => !!value.trim() || 'First name field can`t have only space',
			value =>
				!/[ ]{2,}/.test(value) || 'First name can`t have more then one space',
			value =>
				/^[a-zA-Z ]+$/.test(value) || 'First name field can have only letters',
		],
	},
	last_name: {
		rules: [
			value => !!value || 'Last name field is required',
			value => !!value.trim() || 'Last name field can`t have only space',
			value =>
				!/[ ]{2,}/.test(value) || 'Last name can`t have more then one space',
			value =>
				/^[a-zA-Z ]+$/.test(value) || 'Last name field can have only letters',
		],
	},
	country_selection: {
		rules: [value => !!value || 'Select country field is required'],
	},
	has_children: {
		rules: [value => !!value || 'Children field is required'],
	},
	hobbies: {
		rules: [value => !!value.length || 'Hobbies field is required'],
	},
	driving_experiance: {
		rules: [
			value => !!value || 'Driving experience field is required',
			value =>
				!(value === '0') || 'Driving experience field should have at least 1',
			value =>
				!(parseFloat(value) > 100) ||
				`Driving experience field should't be more then 100 years experiance`,
			value =>
				/^[0-9]+$/.test(value) ||
				'Driving experience field should have only numeric symbols',
		],
	},
}

export default validationRules
