import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Editor from "../../common/md/editor/Editor";
import EditorButtons from "../../common/md/editor/EditorButtons";

import DOMPurify from "dompurify";

import { updateGuide } from "../../../store/controllers/guideController";
import { showAlert } from "../../../store/slices/uiSlice";
import messages from "../../../store/messages";
import GuideHeader from "../guides/GuideHeader";
import { useNavigate } from "react-router-dom";



const Update = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const activeGuide = useSelector(state => state.guide.activeGuide);

	const {guideId, published} = activeGuide;
	const [content, setContent] = useState(activeGuide.content);
	const [title, setTitle] = useState(activeGuide.title.substring(2));
	const [note, setNote] = useState(activeGuide.note);

	function updateGuideHandler(isPublic) {
		if (title === '' || content === '') {
			dispatch(showAlert('success', messages.error['error_fields']));
			return;
		}
		dispatch(updateGuide(title, content, guideId, note, isPublic, () => {
			 navigate(`/guides/${guideId}`);
		}));
	}
	return (
		<>
			<GuideHeader />
			<div className="bg-secondary-light p-10">
				<EditorButtons onUpdateHandler={updateGuideHandler} published={published} mode="update" />
				<Editor
					title={title}
					setTitle={e => setTitle(e.target.value)}
					value={content}
					setContent={e => setContent(DOMPurify.sanitize(e.target.value))}
					note={note}
					setNote={e => setNote(e.target.value)}
				/>

			</div>
		</>
	)
}
export default Update