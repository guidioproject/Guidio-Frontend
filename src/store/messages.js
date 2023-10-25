const messages = {
	error: {
		"server_error": {msg: 'Error! Unexpected error occured.', pages: ['*']},
		"error_fields": {msg: "Error! Fields can't be empty", pages:['/auth/login', '/auth/register', '/profile']},
		"value_error.email": {msg: 'Error! Invalid email format.', pages: ['/auth/login']},
		"invalid_credentials": {msg: 'Error! Wrong email or password.', pages: ['/auth/login']},
		"unauthorized": {msg: 'Error! Your session has expired.', pages:['/']},
		"error_passwords": {msg: "Error! Password don't match.", pages: ['/auth/register', '/profile']},
		'value_error.any_str.min_length': {msg: 'Error! Password needs to have at least 8 characters.', pages: ['/auth/register']},
		"guides_not_found": 'No guides found.',
		"requested_a_non-existent_page": 'No instructors found.'
	}, 
	success: {
		'login_success': {msg: 'Success! Successfully logged in.', pages: ['/']},
		'logout_success': {msg: 'Success! Successfully logged out.', pages: ['/']},
		'register_success': {msg: 'Success! Now you can login.', pages: ['/']},
		'account_delete_success': {msg: 'Success! Account successfully deleted.', pages: ['/profile']},
		'account_update_success': {msg: 'Success! Data successfully updated.', pages: ['/profile']},
		'pw_change_success': {msg: 'Success! Password successfully changed.', pages: ['/profile']},
		'guide_create_success': {msg: 'Success! Guide successfully created.', pages: ['/create']},
		'guide_draft_success': {msg: 'Success! Guide succesfully saved as a draft.', pages: ['/guides']},
		'guide_update_success': {msg: 'Success! Guide successfully updated.', pages: ['/guides']},
		'guide_delete_success': {msg: 'Success! Guide successfully deleted.', pages: ['/guides']}
	}
}

export default messages;
