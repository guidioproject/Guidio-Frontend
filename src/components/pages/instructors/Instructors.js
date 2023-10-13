import { useDispatch, useSelector } from "react-redux"
import { useCallback } from "react";

import { getInstructors } from "../../../store/controllers/userController";

import { MESSAGE_ERROR_NO_INSTRUCTORS } from "../../../store/constants";
import Instructor from "./Instructor";
import List from "../../common/list/List";

const Instructors = () => {
	const dispatch = useDispatch();

	const {instructors, activeUser} = useSelector(state => state.user);

	const loadInstructors = useCallback(activePage => {
		dispatch(getInstructors(activePage));
	}, [dispatch]);

	console.log(instructors);

	return (
	<List
		className="p-28 bg-bg-main"
		user={activeUser}
		title="Instructors"
		onSearch={null}
		onLoad={loadInstructors}
		items={instructors}
		pages={instructors.pages}
		errorMsg={MESSAGE_ERROR_NO_INSTRUCTORS}
		>
		<div className="grid grid-cols-4 w-full gap-5">
		{instructors.users &&
			instructors.users.map(instructor =>
				<Instructor instructor={instructor} key={instructor.userId} />
			)}
		</div>
		</List>
	)
}
export default Instructors