export const MESSAGE_TYPE_ERROR = 'error';
export const MESSAGE_TYPE_SUCCESS = 'success';


// ALERTS

// ALERTS - GENERAL
export const MESSAGE_ERROR_UNEXPECTED = {msg: 'Error! Unexpected error occured.', pages: ['*']};
export const MESSAGE_ERROR_FIELDS = {msg: "Error! Fields can't be empty", pages:['/auth/login', '/auth/register', '/profile']};
export const MESSAGE_ERROR_SESSION_EXPIRED = {msg: 'Error! Your session has expired.', pages:['/']};

// ALERTS - AUTH
export const MESSAGE_ERROR_PASSWORDS = {msg: "Error! Password don't match.", pages: ['/auth/register', '/profile']};
export const MESSAGE_SUCCESS_LOGIN = {msg: 'Success! Successfully logged in.', pages: ['/']};
export const MESSAGE_SUCCESS_LOGOUT = {msg: 'Success! Successfully logged out.', pages: ['/']};
export const MESSAGE_SUCCESS_REGISTER = {msg: 'Success! Now you can login.', pages: ['/']};
export const MESSAGE_ERROR_WRONG_EMAIL = {msg: 'Error! Invalid email format.', pages: ['/auth/login']};
export const MESSAGE_ERROR_LOGIN = {msg: 'Error! Wrong email or password.', pages: ['/auth/login']};
export const REGISTER_ERRORS = {
	'value_error.email': {msg: 'Error! Invalid email.', pages: ['/auth/register']},
	'value_error.any_str.min_length': {msg: 'Error! Password needs to have at least 8 characters.', pages: ['/auth/register']}
}

// ALERTS - PROFILE
export const MESSAGE_SUCCESS_ACCOUNT_DELETE = {msg: 'Success! Account successfully deleted.', pages: ['/profile']};
export const MESSAGE_SUCCESS_USER_UPDATE = {msg: 'Success! Data successfully updated.', pages: ['/profile']};
export const MESSAGE_SUCCESS_PW_CHANGE = {msg: 'Success! Password successfully changed.', pages: ['/profile']};


// ALERTS - GUIDES
export const MESSAGE_ERROR_GUIDE_CREATE = {msg: "Error! Can't create a guide.", pages: ['/create']};
export const MESSAGE_ERROR_GUIDE_UPDATE = {msg: "Error! Can't update a guide.", pages: ['/create', '/guides']};
export const MESSAGE_ERROR_GUIDE_DELETE = {msg: "Error! Can't delete a guide.", pages: ['/create']};

export const MESSAGE_SUCCESS_GUIDE_CREATE = {msg: 'Success! Guide successfully created.', pages: ['/create']};
export const MESSAGE_SUCCESS_GUIDE_DRAFT = {msg: 'Success! Guide succesfully saved as a draft.', pages: ['/guides']};
export const MESSAGE_SUCCESS_GUIDE_DELETE = {msg: 'Success! Guide successfully deleted.', pages: ['/guides']};
export const MESSAGE_SUCCESS_GUIDE_UPDATE = {msg: 'Success! Guide successfully updated.', pages: ['/guides']};


// ERRORS
export const MESSAGE_ERROR_NO_INSTRUCTORS = 'No instructors found.';
export const MESSAGE_ERROR_NO_GUIDES = 'No guides found.';

