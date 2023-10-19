import { useDispatch, useSelector } from "react-redux"
import { useCallback, useEffect } from "react";

import { getInstructors, searchInstructors } from "../../../store/controllers/instructorController";

import Instructor from "./Instructor";
import List from "../../common/list/List";
import { resetInstructors } from "../../../store/slices/instructorSlice";

const Instructors = () => {
	const dispatch = useDispatch();

	const {activeUser} = useSelector(state => state.user);
	const { instructors, pages } = useSelector(state => state.instructor.instructorsData);

	const getInstructorsHandler = useCallback(activePage => {
		dispatch(getInstructors(activePage));
	}, [dispatch]);

	const searchInstructorsHandler = useCallback((search, activePage) => {
		dispatch(searchInstructors(search, activePage));
	}, [dispatch]);

	useEffect(() => {
		dispatch(resetInstructors());
	}, [dispatch]);

	return (
		<div className="bg-bg-main py-5">
			<List
				user={activeUser}
				title="Instructors"
				onSearch={searchInstructorsHandler}
				onGet={getInstructorsHandler}
				items={instructors}
				pages={pages}
			>
				<div className="grid grid-cols-4 w-full gap-5">
					{instructors &&
						instructors.map(instructor =>
							<Instructor instructor={instructor} key={instructor.userId} />
						)}
				</div>
			</List>
		</div>
	)
}
export default Instructors