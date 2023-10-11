import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux";

import Search from "./Search";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

const List = ({ children, user, title, onSearch, onLoad, items, errorMsg, pages }) => {
	const searchRef = useRef();

	const [activePage, setActivePage] = useState(1);
	const [isSearch, setIsSearch] = useState(false);

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
		isSearch ? onSearch(searchRef.current.value, activePage) : onLoad(activePage)
	}, [onLoad, onSearch, activePage, isSearch]);

	return (
		<div className="px-20">
			{(user && onSearch) && <Search
				inputRef={searchRef}
				onSearch={onSearch}
				setIsSearch={setIsSearch}
				setActivePage={setActivePage}
			/>}
			<h2 className="text-5xl py-10">{title}</h2>
			{(isLoading && !items) && <Loading />}
			{children}
			{errorMsg && <ErrorMessage msg={errorMsg} />}
			{(isLoading && items) && <Loading />}
		</div>
	)
}
export default List