import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../store/controllers/userController";
import InputGroup from "./common/InputGroup"

const ChangePassword = () => {
	const dispatch = useDispatch();
	const pwRef = useRef({});
	const user = useSelector((state) => state.user.activeUser);

	function changePwHandler() {
		const {currentPassword, password} = pwRef.current;
		dispatch(
			changePassword(user.userId, {
				current_password: currentPassword.value,
				password: password.value,
			})
		);
	}
  return (
	<div className="pb-5 pt-2 min-h-[70vh]">
		<div className="px-[25%] flex flex-col">
			<InputGroup type="password" text="Password" color="secondary" defaultValue="" fieldRef={el => pwRef.current.currentPassword = el} />
			<InputGroup type="password" text="New Password" color="secondary" defaultValue="" fieldRef={el => pwRef.current.password = el} />
			<button className="bg-secondary-main text-light-main py-2 px-4 rounded-md text-lg font-medium w-1/3 self-end" onClick={changePwHandler}>Change Password</button>
		</div>
	</div>
  )
}
export default ChangePassword