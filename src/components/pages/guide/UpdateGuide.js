import { useState } from "react";
import { useDispatch } from "react-redux";

import Editor from "../../common/editor/Editor";
import EditorButtons from "../../common/editor/EditorButtons";

import DOMPurify from "dompurify";

import { updateGuide } from "../../../store/controllers/guideController";
import { showAlert } from "../../../store/slices/uiSlice";
import { MESSAGE_ERROR_FIELDS, MESSAGE_TYPE_ERROR } from "../../../store/messages";



const UpdateGuide = ({ id, guideContent, guideTitle, setIsUpdating, guideNote, published }) => {
	const dispatch = useDispatch();

	const [content, setContent] = useState(guideContent);
	const [title, setTitle] = useState(guideTitle.substring(2));
	const [note, setNote] = useState(guideNote);

	function updateGuideHandler(isPublic) {
		if (title === '' || content === '') {
			dispatch(showAlert(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_FIELDS));
			return;
		}
		dispatch(updateGuide(title, content, id, note, isPublic, () => {
			setIsUpdating(false);
		}));
	}
	return (
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
	)
}
export default UpdateGuide