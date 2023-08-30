import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGuides, getGuidesByUserId } from "../../../store/controllers/guideController";

import Search from "../Search";
import { MESSAGE_ERROR_NO_GUIDES } from "../../../store/constants";
import Loading from "../Loading";
import Guide from "./Guide";

const Guides = ({ user, isSingleUser = false }) => {
	const dispatch = useDispatch();
	const searchRef = useRef();

	const [activePage, setActivePage] = useState(1);


	const { guides, pages } = useSelector(state => state.guide.guidesData);
	const { isLoading } = useSelector(state => state.ui);

	useEffect(() => {
		function handleScroll() {
			if (searchRef.current.value)
				return;

			const scrolled = document.body.scrollHeight - window.innerHeight;
			if (scrolled === window.scrollY && pages > activePage) {
				setActivePage(activePage + 1);
			}

			if (window.scrollY < 100)
				setActivePage(1);

		}
		if (user && activePage < pages) {
			window.addEventListener('scroll', handleScroll);

			if (activePage === pages) {
				window.removeEventListener('scroll', handleScroll);
			}
			return () => window.removeEventListener('scroll', handleScroll);
		}
	}, [activePage, pages, user]);

	useEffect(() => {
		isSingleUser ? dispatch(getGuidesByUserId(user.userId, activePage)) : dispatch(getGuides(activePage))
	}, [dispatch, isSingleUser, activePage, user?.userId]);

	return (
		<div className={`px-20 ${isSingleUser ? "pt-10" : "pt-48"} bg-bg-main`}>
			{user && <Search inputRef={searchRef} activePage={activePage} setActivePage={setActivePage} />}
			<h2 className="text-5xl py-10">Recent Guides</h2>
			<div className={`grid ${!isSingleUser ? 'grid-cols-4' : 'grid-cols-3'} w-full gap-5`}>
				{guides?.length ? guides.map(guide => <Guide guide={guide} />) :
					!isLoading && <h1 className="text-danger-dark text-3xl py-5">{MESSAGE_ERROR_NO_GUIDES}</h1>}
			</div>
			{isLoading && <Loading />}
		</div>
	);
};
export default Guides;
