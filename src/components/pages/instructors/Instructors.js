import { useDispatch, useSelector } from "react-redux"
import { useCallback } from "react";

import { getInstructors } from "../../../store/controllers/instructorController";

import Instructor from "./Instructor";
import List from "../../common/list/List";

const Instructors = () => {
	const dispatch = useDispatch();

	const {activeUser} = useSelector(state => state.user);
	const { users, pages } = useSelector(state => state.instructor.instructorsData);

	const loadInstructors = useCallback(activePage => {
		dispatch(getInstructors(activePage));
	}, [dispatch]);

	return (
		<List
			className="p-28 bg-bg-main"
			user={activeUser}
			title="Instructors"
			onSearch={null}
			onLoad={loadInstructors}
			items={users}
			pages={pages}
		>
			<div className="grid grid-cols-4 w-full gap-5">
				{users &&
					users.map(instructor =>
						<Instructor instructor={instructor} key={instructor.userId} />
					)}
			</div>
		</List>
	)
}
export default Instructors