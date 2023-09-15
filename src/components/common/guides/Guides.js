import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGuides, getGuidesByUserId } from "../../../store/controllers/guideController";

import Search from "../Search";
import Loading from "../Loading";
import Guide from "./Guide";
import Error from "../Error";

const Guides = ({ user, isSingleUser = false }) => {
	const dispatch = useDispatch();
	const searchRef = useRef();

	const [activePage, setActivePage] = useState(1);


	const { guides, pages } = useSelector(state => state.guide.guidesData);
	const {guideError} = useSelector(state => state.guide);
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
		if (activePage)
			isSingleUser ? dispatch(getGuidesByUserId(user.userId, activePage)) : dispatch(getGuides(activePage))
	}, [dispatch, isSingleUser, activePage, user]);

	useEffect(() => setActivePage(1), [user]);

	return (
		<div className={` ${isSingleUser ? "pt-10" : "px-20 pt-48 bg-bg-main"}`}>
			{user && <Search inputRef={searchRef} setActivePage={setActivePage} isSingleUser={isSingleUser} />}
			<h2 className="text-5xl py-10">Recent Guides</h2>
			{(isLoading && !guides) && <Loading />}
			<div className={`grid ${!isSingleUser ? 'grid-cols-4' : 'grid-cols-3'} w-full gap-5`}>
				{guides && guides.map(guide => <Guide guide={guide} key={guide.guideId} />)}
				{guideError && <Error msg={guideError} />}
			</div>
			{(isLoading && guides) && <Loading />}
		</div>
	);
};
export default Guides;
