import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { FaExclamationCircle, FaInfo } from "react-icons/fa";
import { uiActions } from "../../store/slices/uiSlice";

const Alert = ({size = "full"}) => {
	return <div className={`h-16 ${size === "full" && "w-full"} ${size === "half" && "w-1/2"} ${size === "fit" && "w-fit"}`}>
		<AlertContent />
	</div>
}

const AlertContent = () => {
	const { pathname } = useLocation();
	const dispatch = useDispatch();
	const [shouldShow, setShouldShow] = useState(false);

	const { type, msgConf } = useSelector(state => state.ui.alert);
	const { msg, pages } = msgConf;

	const timeout = useRef(null);

	const checkPage = useCallback(() => {
		for (const page of pages) {
			if (page === '*' || page === pathname)
				return true;

			if ((page[0] === '^' && pathname.startsWith(page.slice(1))) ||
				(page[page.length - 1] === '^' && pathname.endsWith(page.slice(0, page.length - 1))))
				return true;
		}
	}, [pathname, pages]);

	useEffect(() => {
		if (msg && checkPage()) {
				setShouldShow(true);
				timeout.current = setTimeout(() => {
					dispatch(uiActions.clearAlert());
					timeout.current = null;
					setShouldShow(false);
				}, 3000);
		}
		return () => clearTimeout(timeout.current);
	}, [checkPage, dispatch, msg]);

	return shouldShow ?
		(<div
			className={`flex items-center justify-center font-bold capitalize px-2 py-4 mb-5 rounded text-xl min-h-[4rem]
			${type === "error" && "text-danger-dark border-danger-dark bg-danger-light"}
			${type === "success" && "text-success-darker border-success-main bg-success-main"}`}
		>
			{type === "error" && <FaExclamationCircle className="inline text-xl mr-1" />}
			{type === "success" && <FaInfo className="inline text-xl mr-1" />}
			{msg}
		</div>) : null
}

export default Alert;