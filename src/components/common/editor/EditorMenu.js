import { useRef } from 'react';

import { FaBold, FaCode, FaHeading, FaImage, FaItalic, FaLink, FaListOl, FaListUl, FaStrikethrough } from 'react-icons/fa';

const EditorMenu = ({ contentRef, setIsPreview, isPreview }) => {
	const elsRef = useRef({});

	function handleEl(el) {
		const val = elsRef.current[el].value;
		contentRef.current.focus();
		contentRef.current.value += val;

		if (val === "****") {
			contentRef.current.setSelectionRange(contentRef.current.selectionStart - 2, contentRef.current.selectionStart - 2);
		}

		if (val === "__" || val === "~~" || val === "``") {
			contentRef.current.setSelectionRange(contentRef.current.selectionStart - 1, contentRef.current.selectionStart - 1);
		}

		if (val === "[](url)" || val === "![](url)") {
			contentRef.current.setSelectionRange(contentRef.current.selectionStart - 6, contentRef.current.selectionStart - 6);
		}
	}

	return (
		<div className='flex justify-between bg-secondary-dark2 rounded-t text-success-contrastText'>
			<div>
				<button
					className={`${isPreview ? "bg-secondary-dark2" : "bg-secondary-main"}  h-full p-2 rounded-bl text-xl hover:bg-secondary-main`}
					onClick={() => setIsPreview(false)}>
					Markdown
				</button>
				<button
					className={`${isPreview ? "bg-secondary-main" : "bg-secondary-dark2"} h-full p-2 rounded-br text-xl hover:bg-secondary-main`}
					onClick={() => setIsPreview(true)}>
					Preview
				</button>
			</div>
			<div className='flex justify-start gap-5 p-5'>
				<span ref={el => elsRef.current.heading = { el, value: "## " }} onClick={handleEl.bind(this, "heading")}>
					<FaHeading className='text-2xl hover:bg-secondary-dark rounded p-1 hover:cursor-pointer' />
				</span>
				<span ref={el => elsRef.current.bold = { el, value: "****" }} onClick={handleEl.bind(this, "bold")}>
					<FaBold className='text-2xl hover:bg-secondary-dark rounded p-1 hover:cursor-pointer' />
				</span>
				<span ref={el => elsRef.current.italic = { el, value: "__" }} onClick={handleEl.bind(this, "italic")}>
					<FaItalic className='text-2xl hover:bg-secondary-dark rounded p-1 hover:cursor-pointer' />
				</span>
				<span ref={el => elsRef.current.strike = { el, value: "~~" }} onClick={handleEl.bind(this, "strike")}>
					<FaStrikethrough className='text-2xl hover:bg-secondary-dark rounded p-1 hover:cursor-pointer' />
				</span>
				<span ref={el => elsRef.current.code = { el, value: "``" }} onClick={handleEl.bind(this, "code")}>
					<FaCode className='text-2xl hover:bg-secondary-dark rounded p-1 hover:cursor-pointer' />
				</span>
				<span ref={el => elsRef.current.link = { el, value: "[](url)" }} onClick={handleEl.bind(this, "link")}>
					<FaLink className='text-2xl hover:bg-secondary-dark rounded p-1 hover:cursor-pointer' />
				</span>
				<span ref={el => elsRef.current.image = { el, value: "![](url)" }} onClick={handleEl.bind(this, "image")}>
					<FaImage className='text-2xl hover:bg-secondary-dark rounded p-1 hover:cursor-pointer' />
				</span>
				<span ref={el => elsRef.current.ul = { el, value: "- " }} onClick={handleEl.bind(this, "ul")}>
					<FaListUl className='text-2xl hover:bg-secondary-dark rounded p-1 hover:cursor-pointer' />
				</span>
				<span ref={el => elsRef.current.ol = { el, value: "1. " }} onClick={handleEl.bind(this, "ol")}>
					<FaListOl className='text-2xl hover:bg-secondary-dark rounded p-1 hover:cursor-pointer' />
				</span>
			</div>
		</div>
	)
}
export default EditorMenu