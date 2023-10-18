const messages = {
	types: {
		error: 'error',
		success: 'success'
	},
	general: {
		unexpected_error: {msg: "Error! Unexpected error occured.", pages: ['/login', '/register']},
		fields_error: {msg: "Error! Fields can't be empty!", pages: ['/login', '/register']},
		session_error: {msg: "Error! Your session has expired.", pages: ['/']}
	},
	auth: {
		passwords_error: {msg: "Error! Password don't match.", pages: ['/register', '/login', '/profile']},
		login_success: {msg: "Success! Successfully logged in.", pages: ['/']},
		register_success: {msg: "Success! Now you can login.", pages: ['/']},
		logout_success: {msg: "Success! Successfully logged out.", pages: ['/']},
		invalid_email_error: {msg: "Error! Invalid email format.", pages: ['/login', '/register']},
		login_error: {msg: "Error! Wrong email or password.", pages: ['/login']},
		register_errors: {
			'value_error.email': 'Error! Invalid email.',
			'value_error.any_str.min_length': "Error! Password needs to have at least 8 characters."
		}
	},
	profile: {
		delete_success: {msg: "Success! Account successfully deleted.", pages: ['/profile']},
		update_success: {msg: "Success! Data successfully updated.", pages: ['/profile']},
		pw_change_success: {msg: "Success! Password successfully changed.", pages: ['/profile']}
	},
	instructors: {
		no_instructors_error: {msg: "No instructors found.", pages: ['/instructors']}
	},
	guides: {
		no_guides_error: {msg: "No guides found.", pages: ['/']},
		create_error: {msg: "Error! Can't create a guide.", pages: ['/create']},
		update_error: {msg: "Error! Can't update a guide.", pages: ['/guides']},
		delete_error: {msg: "Error! Can't delete a guide.", pages: ['/create']},
		create_success: {msg: "Success! Guide successfully created.", pages: ['/create']},
		update_success: {msg: "Success! Guide successfully updated.", pages: ['/guides']},
		draft_success: {msg: "Success! Guide successfully saved as draft", pages: ['/guides']},
		delete_success: {msg: "Success! Guide successfully deleted.", pages: ['/guides']}
	}
}
export default messages;