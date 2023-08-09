const InputGroup = ({inpRef, isHalf, isPw, lbl}) => {
	return (
		<div className={`${isHalf ? "w-1/2" : "w-full"} py-5`}>
			<label className="block pb-1">{lbl}</label>
			<input
				className="border-b-2 border-b-gray-dark focus:border-b-secondary-main py-1 w-full"
				type={isPw ? "password" : "text"}
				placeholder={`${lbl}...`}
				ref={inpRef}
			/>
		</div>
	)
}
export default InputGroup