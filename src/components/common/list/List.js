import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

import Search from "./Search";
import Loading from "../../ui/Loading";
import Error from "../../ui/Error";

const List = ({ children, user, title, onSearch, onGet, items, pages }) => {

	const [searchVal, setSearchVal] = useState('');
	const [activePage, setActivePage] = useState(1);

	const { isLoading } = useSelector(state => state.ui);

	useEffect(() => {
		function handleScroll() {
			const scrolled = document.body.scrollHeight - window.innerHeight;
			if (scrolled === window.scrollY && pages > activePage)
				setActivePage(el => el + 1)
		}
		window.addEventListener('scroll', handleScroll);

		if (activePage === pages)
			window.removeEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, [activePage, pages]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (searchVal)
				onSearch(searchVal, activePage);
			else
				onGet(activePage);
		}, 500);

		return () => clearTimeout(timeout);
	}, [onGet, onSearch, activePage, searchVal]);

	useEffect(() => {
		setActivePage(1);
	}, [searchVal]);

	return (
		<div className={`px-20 min-h-[100vh] pt-48`}>
			{(user && onSearch) &&
				<Search
					searchVal={searchVal}
					setSearchVal={setSearchVal}
				/>}
			<h2 className="text-5xl py-10">{title}</h2>
			{(isLoading && !items) && <Loading />}
			{children}
			<Error />
			{(isLoading && items) && <Loading />}
		</div>
	)
}
export default List