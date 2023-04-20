import { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { showAndHideMsg } from "../../../store/slices/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import Form from "./common/Form";
import { loginUser } from "../../../store/controllers/authController";
import Alert from "../../common/Alert";
import { MESSAGE_ERROR_FIELDS, MESSAGE_TYPE_ERROR, MESSAGE_TYPE_SUCCESS } from "../../../store/constants";
import InputGroup from "./common/InputGroup";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const loginRef = useRef({});
	const { errorMsg, successMsg } = useSelector((state) => state.ui);

	function loginHandler(event) {
		event.preventDefault();
		const { email, password } = loginRef.current;

		if (!email.value || !password.value) {
			dispatch(showAndHideMsg(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_FIELDS));
			return false;
		}
		dispatch(
			loginUser(
				{
					email: email.value,
					password: password.value,
				},
				() => navigate("/")));
	}
	useEffect(() => loginRef.current.email.focus(), []);

	return (
		<Form onSubmit={loginHandler}>
			<h1 className="text-5xl font-bold py-10 pb-5">Login</h1>
			<Alert type={(errorMsg && MESSAGE_TYPE_ERROR) || (successMsg && MESSAGE_TYPE_SUCCESS)} msg={errorMsg || successMsg} />
			<InputGroup inpRef={el => loginRef.current.email = el} lbl="Email" />
			<InputGroup inpRef={el => loginRef.current.password = el} lbl="Password" isPw={true} />
			<div className=" inline-block mt-10 text-center">
				<input
					type="submit"
					className="
					bg-secondary-main text-light-main text-lg w-3/4
					my-5 px-10 py-1.5 rounded-2xl shadow-normal shadow-secondary-main
					transition-all ease duration-300
					hover:shadow-normal-hover hover:shadow-secondary-main hover:cursor-pointer"
					value="Sign In"
				/>
				<p className=" border-t-2 mt-3 pt-2">
					Need an account?{" "}
					<NavLink
						to="/register"
						className="text-secondary-main border-b-2 border-secondary-main"
					>
						REGISTER
					</NavLink>
				</p>
			</div>
		</Form>
	);
};
export default Login;
