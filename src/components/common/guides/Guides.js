import { useDispatch, useSelector } from "react-redux"
import { getGuides, searchGuides, getGuidesByUserId } from "../../../store/controllers/guideController";

import { useCallback } from "react";

import List from "../List"
import Guide from "./Guide";

const Guides = ({ user, isSingleUser }) => {
	const dispatch = useDispatch();

	const { guides, pages } = useSelector(state => state.guide.guidesData);
	const { guideError } = useSelector(state => state.guide);

	const onLoad = useCallback(activePage => {
		isSingleUser ? dispatch(getGuidesByUserId(user.userId, activePage)) : dispatch(getGuides(activePage));
	}, [dispatch, isSingleUser, user]);

	const onSearch = useCallback((title, activePage) => {
		dispatch(searchGuides(title, activePage));
	}, [dispatch]);
	return (
		<List
			user={user}
			title="Guides"
			onSearch={isSingleUser ? null : onSearch}
			onLoad={onLoad}
			items={guides}
			pages={pages}
			errorMsg={guideError}
		>
			<div className={`grid ${isSingleUser ? "grid-cols-3" : "grid-cols-4"} w-full gap-5`}>
				{guides &&
					guides.map(guide =>
						<Guide guide={guide} key={guide.guideId} />
					)}
			</div>
		</List>
	)
}
export default Guides