import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGuidesByUserId } from "../../../store/controllers/guideController";

import cardImg from '../../../assets/card_item.png';
import { NavLink } from "react-router-dom";
import { guideActions } from "../../../store/slices/guideSlice";
import Loading from "../../ui/Loading";

const FeaturedGuides = ({ userId }) => {
	const dispatch = useDispatch();
	const guides = useSelector(state => state.guide.guidesData.guides);
	const { isLoading } = useSelector(state => state.ui);
	useEffect(() => {
		if (userId) {
			dispatch(getGuidesByUserId(userId, 1, () => dispatch(guideActions.filterActiveGuide())));
		}
	}, [userId, dispatch]);

	return (
		<div className="w-[40%] bg-light-main p-5 rounded">
			<h2 className=" text-2xl my-5">More from the author</h2>
			{isLoading && <Loading />}
			{guides?.map(guide =>
				<NavLink to={`/guides/${guide.guideId}`} key={guide.guideId} className="flex mb-5 h-fit">
					<img src={cardImg} alt="Preview" className="w-[30%] mr-5 rounded" />
					<div>
						<h1 className="text-secondary-main font-bold underline">{guide.title}</h1>
						<p className=" font-light text-dark-main">
							Creation date:{" "}
							{new Date(guide.lastModified).getDate()}
							-
							{new Date(guide.lastModified).getMonth() + 1}
							-
							{new Date(guide.lastModified).getFullYear()}

						</p>
					</div>
				</NavLink>
			)}
		</div>
	)
}
export default FeaturedGuides