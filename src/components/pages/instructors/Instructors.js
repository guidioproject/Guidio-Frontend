import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";

import { getInstructors } from "../../../store/controllers/userController";

import { MESSAGE_ERROR_NO_INSTRUCTORS } from "../../../store/constants";
import Loading from "../../common/Loading";
import Instructor from "./Instructor";
import ErrorMessage from "../../common/ErrorMessage";

const Instructors = () => {
	const dispatch = useDispatch();

	const instructors = useSelector(state => state.user.instructors);
	const { isLoading } = useSelector(state => state.ui);

	useEffect(() => {
		dispatch(getInstructors());
	}, [dispatch]);
	return (
		<div className="p-28 bg-bg-main min-h-[60vh]">
			<h2 className="text-3xl">Instructors</h2>
			{isLoading ? <Loading /> :
				<div className="grid grid-cols-4 w-full gap-5 mt-10">
					{instructors?.length ? instructors.map(instructor => <Instructor key={instructor.userId} instructor={instructor} />)
						:
						<ErrorMessage msg={MESSAGE_ERROR_NO_INSTRUCTORS} />
					}
				</div>
			}
		</div>
	)
}
export default Instructors