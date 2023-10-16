import { FaExclamationCircle, FaInfo } from "react-icons/fa";
import { useSelector } from "react-redux";

const Alert = ({ size = "full" }) => {
	const {type, msg} = useSelector(state => state.ui.alert);
	return (
		<div
			className={`flex items-center justify-center border font-bold capitalize px-2 py-4 mb-5 rounded text-xl min-h-[4rem]
			${size === "full" && "w-full"}
			${size === "half" && "w-1/2"}
			${size === "fit" && "w-fit"}
			${type === "error" && "text-danger-dark border-danger-dark bg-danger-light"}
			 ${type === "success" && "text-success-darker border-success-main bg-success-main"}
			${!msg && "invisible"}`}
		>
			{type === "error" && <FaExclamationCircle className="inline text-xl mr-1" />}
			{type === "success" && <FaInfo className="inline text-xl mr-1" />}
			{msg}
		</div>
	);
};
export default Alert;
