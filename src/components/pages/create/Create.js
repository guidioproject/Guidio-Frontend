import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { uiActions } from "../../../store/slices/uiSlice";
import { createGuide } from "../../../store/controllers/guideController";

import Editor from "../../common/md/editor/Editor";
import EditorButtons from "../../common/md/editor/EditorButtons";
import Alert from '../../ui/Alert';

import DOMPurify from "dompurify";

import messages from "../../../store/messages";

const Create = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [content, setContent] = useState("");
	const [title, setTitle] = useState("");
	const [note, setNote] = useState("");


	function createGuideHandler(isPublic) {
		if (title === '' || content === '') {
			dispatch(uiActions.showAlert({type: 'error', msgConf: messages.error['error_fields']}));
			return;
		}
		dispatch(createGuide(title, content, note, isPublic, () => navigate('/')));
	}
	return (
		<div className="bg-secondary-light p-10 pt-24">
			<div className="flex justify-center">
				<Alert size={"half"} />
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
