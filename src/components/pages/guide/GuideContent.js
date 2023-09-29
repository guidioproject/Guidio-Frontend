import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteGuide, getGuideById } from "../../../store/controllers/guideController";

import MarkdownContent from "../../common/MarkdownContent"
import FeaturedGuides from "./FeaturedGuides";
import GuideInfo from "./GuideInfo";
import Alert from "../../common/Alert";

import { MESSAGE_TYPE_ERROR, MESSAGE_TYPE_SUCCESS } from "../../../store/constants";

const GuideContent = ({ id, activeGuide, activeUser, setIsUpdating }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const content = `${activeGuide?.title}\n${activeGuide?.content}`;
	const { successMsg, errorMsg } = useSelector(state => state.ui);

	function deleteGuideHandler() {
		dispatch(deleteGuide(id, () => navigate("/")));
	}

	useEffect(() => {
		dispatch(getGuideById(id));
	}, [id, dispatch]);
	return (
		<div className="p-20 bg-secondary-light">
			<div className="flex justify-center">
				<Alert type={(errorMsg && MESSAGE_TYPE_ERROR) || (successMsg && MESSAGE_TYPE_SUCCESS)} msg={errorMsg || successMsg} size={"half"} />
			</div>
			{activeUser.userId === activeGuide.user?.userId &&
			<div className="flex gap-5">
				<button className="inline-block py-2 px-4 my-5 rounded-md bg-secondary-main text-light-main text-lg font-medium"
					onClick={() => setIsUpdating(true)}>
					Edit Guide
				</button>
				<button className="inline-block py-2 px-4 my-5 rounded-md bg-danger-dark text-light-main text-lg font-medium self-end" onClick={deleteGuideHandler}>
					Delete a guide
				</button>
			</div>
			}
			<GuideInfo activeGuide={activeGuide} />
			<div className="flex gap-10">
				<MarkdownContent content={content} lastModified={activeGuide.lastModified} className="h-fit" />
				<FeaturedGuides userId={activeGuide?.user?.userId} guideId={id} />
			</div>
		</div>
	)
}
export default GuideContent