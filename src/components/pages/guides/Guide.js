import { useSelector } from "react-redux";
import GuideContent from "./GuideContent"
import GuideHeader from "./GuideHeader";
import { useParams } from "react-router-dom";

const Guide = () => {
	const { id } = useParams();

	const activeGuide = useSelector(state => state.guide.activeGuide);
	const activeUser = useSelector(state => state.user.activeUser);
	return (
		<div>
			<GuideHeader />
			<GuideContent
			id={id}
			activeGuide={activeGuide}
			activeUser={activeUser} />
		</div>
	)
}
export default Guide