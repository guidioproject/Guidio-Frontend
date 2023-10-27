import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { FaExclamationCircle, FaInfo } from "react-icons/fa";

const Alert = ({ size = "full" }) => {
	const { pathname } = useLocation();
	const [shouldShow, setShouldShow] = useState(false);

	const { type, msgObj } = useSelector(state => state.ui.alert);
	const { msg, pages } = msgObj;

	useEffect(() => {
		function handlePages() {
			if (pages.length === 1) {
				if (pages[0] === '*' || pages[0] === pathname || (pages[0].startsWith('/guides') && pathname.startsWith('/guides')))
					setShouldShow(true);
				else
					setShouldShow(false);
			}
			else if (pages.length > 1) {
				for (const element of pages) {
					if (element === pathname || (element.startsWith('/guides') && pathname.startsWith('/guides'))) {
						setShouldShow(true);
						break;
					}
					else
						setShouldShow(false);
				}
			}
		}
		handlePages();
	}, [pathname, pages]);

	return (
		<div
			className={`flex items-center justify-center border font-bold capitalize px-2 py-4 mb-5 rounded text-xl min-h-[4rem]
			${size === "full" && "w-full"} ${size === "half" && "w-1/2"} ${size === "fit" && "w-fit"}
			${type === "error" && "text-danger-dark border-danger-dark bg-danger-light"}
			${type === "success" && "text-success-darker border-success-main bg-success-main"}
			${(!msg || (msg && !shouldShow)) && "invisible"}`}
		>
			{type === "error" && <FaExclamationCircle className="inline text-xl mr-1" />}
			{type === "success" && <FaInfo className="inline text-xl mr-1" />}
			{msg}
		</div>
	);
};
export default Alert;