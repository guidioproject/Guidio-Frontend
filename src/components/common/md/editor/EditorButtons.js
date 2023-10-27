const EditorButtons = ({ mode, published, onUpdateHandler, onCreateHandler }) => {

	return (
		<>
			{mode === 'update' &&
				<div className="flex gap-5 justify-end">
					<button className="inline-block py-2 px-4 my-5 rounded-md bg-primary-main text-light-main text-lg font-medium self-end" onClick={() => onUpdateHandler(!published)}>
						{published ? "Set as private" : "Set as public"}
					</button>
					<button className="inline-block py-2 px-4 my-5 rounded-md bg-secondary-main text-light-main text-lg font-medium self-end" onClick={() => onUpdateHandler(published)}>
						Update a guide
					</button>
				</div>
			}

			{mode === 'create' &&
				<div className="flex gap-5 justify-end">
					<button className="inline-block py-2 px-4 my-5 rounded-md bg-primary-main text-light-main text-lg font-medium self-end" onClick={() => onCreateHandler(false)}>
						Save as draft
					</button>
					<button className="inline-block py-2 px-4 my-5 rounded-md bg-secondary-main text-light-main text-lg font-medium self-end" onClick={() => onCreateHandler(true)}>
						Publish Guide
					</button>
				</div>}
		</>

	)
}
export default EditorButtons