import { NavLink, useNavigate } from "react-router-dom";

import { useEffect, useRef } from "react";
import { showAlert } from "../../../store/slices/uiSlice";
import { useDispatch } from "react-redux";

import Form from "./common/Form";
import { registerUser } from "../../../store/controllers/authController";
import Alert from "../../common/Alert";
import { MESSAGE_ERROR_FIELDS, MESSAGE_ERROR_PASSWORDS, MESSAGE_TYPE_ERROR } from "../../../store/constants";
import InputGroup from "./common/InputGroup";

const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const registerRef = useRef({});

	useEffect(() => registerRef.current.firstName.focus(), []);

	function registerHandler(event) {
		event.preventDefault();

		const { firstName, lastName, email, password, passwordConfirm } =
			registerRef.current;

		if (!firstName.value || !lastName.value || !email.value || !password.value || !passwordConfirm.value) {
			dispatch(showAlert(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_FIELDS));
			return false;
		}

		if (password.value !== passwordConfirm.value) {
			dispatch(showAlert(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_PASSWORDS));
			return false;
		}

		dispatch(
			registerUser({
				first_name: firstName.value,
				last_name: lastName.value,
				email: email.value,
				password: password.value
			},
				() => navigate("/")));
	}

	return (
		<Form onSubmit={registerHandler}>
			<h1 className="text-5xl font-bold">Register</h1>
			<Alert />
			<div className="flex gap-10">
				<InputGroup inpRef={el => registerRef.current.firstName = el} lbl="First Name" isHalf />
				<InputGroup inpRef={el => registerRef.current.lastName = el} lbl="Last Name" isHalf />
			</div>
			<InputGroup inpRef={el => registerRef.current.email = el} lbl="Email" />
			<InputGroup inpRef={el => registerRef.current.password = el} lbl="Password" isPw />
			<InputGroup inpRef={el => registerRef.current.passwordConfirm = el} lbl="Confirm Password" isPw />
			<div className="inline-block mt-3 text-center">
				<input
					type="submit"
					className="
					bg-secondary-main text-light-main text-lg w-full
					my-5 px-10 py-1.5 rounded-2xl shadow-normal shadow-secondary-main
					transition-all ease duration-300
					hover:shadow-normal-hover hover:shadow-secondary-main hover:cursor-pointer
					focus:shadow-normal-focused focus:shadow-secondary-main"
					value="Sign Up"
				/>
				<p className="border-t-2 mt-3 pt-2 px-2">
					Already a user?{" "}
					<NavLink
						to="/auth/login"
						className="text-secondary-main border-b-2 border-secondary-main"
					>
						LOGIN
					</NavLink>
				</p>
			</div>
		</Form>
	);
};
export default Register;
