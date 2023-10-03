import { useState } from "react"

const InstructorToggle = ({ isInstructor, setIsInstructor }) => {
	const [showConfirm, setShowConfirm] = useState(false);
	return (
		<div className="mb-10">
			<label className="flex items-center relative w-max cursor-pointer select-none mb-5">
				<span className="font-bold mr-3">Instructor?</span>
				<input
				className="peer appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full bg-light-main ring-[3px] ring-secondary-main"
				type="checkbox"
				checked={isInstructor} onChange={() => {isInstructor ? setShowConfirm(true) : setIsInstructor(true)}} />
				<span className="w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-danger-dark peer-checked:bg-success-main peer-checked:translate-x-7" />
			</label>
			<div className={`p-2 ${!showConfirm && "hidden"}`}>
				<h3 className="text-xl">Are you sure you want to continue?</h3>
				<p className="text-sm text-danger-dark font-bold text-center">All your public guides will be marked as private.</p>
				<div className="flex justify-between pt-2">
					<button className="bg-danger-dark text-light-main text-lg px-2 py-1 rounded hover:bg-danger-light"
					onClick={() => {setIsInstructor(false); setShowConfirm(false);}}>Confirm</button>
					<button className="bg-light-main border border-gray-dark text-gray-dark text-lg px-2 py-1 rounded hover:bg-gray-dark hover:text-light-main"
					onClick={() => setShowConfirm(false)}>Cancel</button>
				</div>
			</div>
		</div>
	)
}
export default InstructorToggle