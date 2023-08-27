import { useSelector } from "react-redux";
import GuideContent from "./GuideContent"
import GuideHeader from "./GuideHeader"
import UpdateGuide from "./UpdateGuide";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Guide = () => {
	const { id } = useParams();
	const [isUpdating, setIsUpdating] = useState(false);

	const activeGuide = useSelector(state => state.guide.activeGuide);
	const activeUser = useSelector(state => state.user.activeUser);
	return (
		<div>
			<GuideHeader />
			{isUpdating ?
				<UpdateGuide
					id={id}
					guideContent={activeGuide.content}
					guideTitle={activeGuide.title}
					setIsUpdating={setIsUpdating}
					guideNote={activeGuide.note}
					published={activeGuide.published} />
				:
				<GuideContent 
				id={id} 
				activeGuide={activeGuide} 
				activeUser={activeUser}
				setIsUpdating={setIsUpdating} />
			}
		</div>
	)
}
export default Guide