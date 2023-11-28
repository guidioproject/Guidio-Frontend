import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

import Search from "./Search";
import Loading from "../../ui/Loading";
import ErrorMsg from "../../ui/ErrorMsg";
const List = ({ children, user, title, onSearch, onGet, items, pages, resource }) => {

	const [searchVal, setSearchVal] = useState('');
	const [activePage, setActivePage] = useState(1);

	const { loading, error } = useSelector(state => state.ui);

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
	console.log(items);
	return (
		<div className={`px-20 min-h-[100vh]`}>
			{(user && onSearch) &&
				<Search
					searchVal={searchVal}
					setSearchVal={setSearchVal}
				/>}
			<h2 className="text-5xl py-10">{title}</h2>
			{(!items && loading === resource) && <Loading />}
			{children}
			{(!loading && error) && <ErrorMsg />}
			{(items && loading === resource) && <Loading resource={resource} />}
		</div>
	)
}
export default List