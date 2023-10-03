import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../../../store/controllers/userController";

const ButtonGroup = ({ onUpdate }) => {
	const dispatch = useDispatch();
	const id = useSelector(state => state.user.activeUser.userId);
	const navigate = useNavigate();
	function deleteHandler() {
		dispatch(deleteUser(id, () => navigate('/')));
	}
	return (
		<div className="flex justify-between items-end w-full">
			<button className="block bg-danger-dark text-light-main py-2 px-4 rounded-md text-lg font-medium"
			onClick={deleteHandler}>
				Delete Account
			</button>
			<button className="block py-2 px-4 rounded-md bg-success-main text-lg font-medium" onClick={onUpdate}>
				Save Changes
			</button>
		</div>
	);
};
export default ButtonGroup;
