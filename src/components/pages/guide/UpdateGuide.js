import { useState } from "react";

import Editor from "../../common/editor/Editor";
import Preview from "../../common/editor/Preview";

import DOMPurify from "dompurify";
import { useDispatch } from "react-redux";
import { deleteGuide, updateGuide } from "../../../store/controllers/guideController";
import { showMessage } from "../../../store/slices/uiSlice";
import { useNavigate } from "react-router-dom";
import { MESSAGE_ERROR_FIELDS, MESSAGE_TYPE_ERROR } from "../../../store/constants";


const UpdateGuide = ({ id, guideContent, guideTitle, setIsUpdating, guideNote, published }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [content, setContent] = useState(guideContent);
	const [title, setTitle] = useState(guideTitle.substring(2));
	const [note, setNote] = useState(guideNote);

	function updateGuideHandler(isPublic) {
		if (title === '' || content === '') {
			dispatch(showMessage(MESSAGE_TYPE_ERROR, MESSAGE_ERROR_FIELDS));
			return;
		}
		dispatch(updateGuide(title, content, id, note, isPublic, () => {
			setIsUpdating(false);
		}));
	}

	function deleteGuideHandler() {
		dispatch(deleteGuide(id, () => navigate("/")));
	}
	return (
		<div className="flex justify-between gap-10">
			<div className="w-1/2">
				<Editor
					title={title}
					setTitle={e => setTitle(e.target.value)}
					value={content}
					setContent={e => setContent(DOMPurify.sanitize(e.target.value))}
					note={note}
					setNote={e => setNote(e.target.value)}
				/>
				<div className="flex justify-between">
					<button className="inline-block py-2 px-4 my-5 rounded-md bg-danger-dark text-light-main text-lg font-medium self-end" onClick={deleteGuideHandler}>
						Delete a guide
					</button>
					{published ?
						<div className="flex gap-10">
							<button className="inline-block py-2 px-4 my-5 rounded-md bg-secondary-main text-light-main text-lg font-medium self-end" onClick={() => updateGuideHandler(true)}>
								Update a guide
							</button>
							<button className="inline-block py-2 px-4 my-5 rounded-md bg-primary-main text-light-main text-lg font-medium self-end" onClick={() => updateGuideHandler(false)}>
								Set as private
							</button>
						</div>
						:
						<div className="flex gap-10">
							<button className="inline-block py-2 px-4 my-5 rounded-md bg-secondary-main text-light-main text-lg font-medium self-end" onClick={() => updateGuideHandler(false)}>
								Update a guide
							</button>
							<button className="inline-block py-2 px-4 my-5 rounded-md bg-primary-main text-light-main text-lg font-medium self-end" onClick={() => updateGuideHandler(true)}>
								Set as public
							</button>
						</div>
					}
				</div>
			</div>
			<Preview title={title} content={content} />
		</div >
	)
}
export default UpdateGuide