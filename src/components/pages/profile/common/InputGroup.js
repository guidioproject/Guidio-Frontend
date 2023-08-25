const InputGroup = ({ color, text, type, defaultValue = "", fieldRef, onChange }) => {

	return (
		<div className="w-full mb-5">
			<label className="block font-semibold mb-2">
				{text}{" "}
			</label>
			{type === "textarea" ?
				<textarea
					className={`w-full border-2 border-${color}-main p-2 text-dark-main text-xl`}
					rows={4}
					defaultValue={defaultValue}
					ref={fieldRef} />

				:
				<input
					type={type}
					className={`w-full border-2 border-${color}-main p-2 text-dark-main text-xl`}
					defaultValue={defaultValue}
					onChange={onChange}
					ref={fieldRef}
				/>
			}
		</div>
	)
}
export default InputGroup