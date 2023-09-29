import { useRef, useState } from 'react';

import EditorMenu from './EditorMenu';
import MarkdownContent from '../MarkdownContent';

const Editor = ({ setContent, setTitle, setNote, title, value, note }) => {
	const contentRef = useRef();
	const [isPreview, setIsPreview] = useState(false);
	return (
		<div className="w-full h-[60vh] flex gap-5">
			<div className="flex flex-col gap-5 h-full w-[70%] rounded bg-success-contrastText shadow-normal shadow-secondary-main overflow-auto">
				<EditorMenu contentRef={contentRef} setIsPreview={setIsPreview} isPreview={isPreview} />
				{isPreview ?
					<MarkdownContent content={`# ${title}\n${value}`} />
					:
					<div className='flex flex-col gap-5 h-full p-6'>
						<input
							type="text"
							className="rounded p-2 text-lg border-2 border-secondary-main"
							placeholder="Title"
							onChange={setTitle}
							value={title}
							autoFocus
						/>
						<textarea
							placeholder="Start creating..."
							className="resize-none h-[100%] rounded bg-light-main p-2 border-2 border-secondary-main"
							onChange={setContent}
							ref={contentRef}
							value={value}
						/>
					</div>
				}
			</div>
			<div className="h-full p-6 pb-20 rounded bg-secondary-dark2 border-2 border-secondary-main flex-grow">
				<h2 className='text-2xl text-light-main mb-5'>Notes</h2>
				<textarea
					placeholder='Enter a note...'
					value={note}
					onChange={setNote}
					className="resize-none w-full h-full rounded overflow-auto bg-light-main p-2 border-4 border-secondary-main" />
			</div>
		</div>
	);
};
export default Editor;
