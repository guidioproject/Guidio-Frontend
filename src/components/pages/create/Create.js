import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGuide } from "../../../store/controllers/guideController";
import { showMessage } from "../../../store/slices/uiSlice";

import Alert from '../../common/Alert';
import Editor from "../../common/editor/Editor";

import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import EditorButtons from "../../common/editor/EditorButtons";

const Create = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { errorMsg, successMsg } = useSelector(state => state.ui);
	const [content, setContent] = useState("");
	const [title, setTitle] = useState("");
	const [note, setNote] = useState("");


	function createGuideHandler(isPublic) {
		if (title === '' || content === '') {
			dispatch(showMessage('error', 'Fields cant be empty!'));
			return;
		}
		dispatch(createGuide(title, content, note, isPublic, () => navigate('/')));
	}
	return (
		<div className="bg-secondary-light p-10 pt-24">
			<div className="flex justify-center">
				<Alert type={(errorMsg && 'error') || (successMsg && 'success')} msg={errorMsg || successMsg} size="half" />
			</div>
			<EditorButtons onCreateHandler={createGuideHandler} mode="create" />
			<Editor
				title={title}
				setTitle={e => setTitle(e.target.value)}
				value={content}
				setContent={e => setContent(DOMPurify.sanitize(e.target.value))}
				note={note}
				setNote={e => { console.log(e.target.value); setNote(e.target.value) }}
			/>
		</div>
	);
};
export default Create;
