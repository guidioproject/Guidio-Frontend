import { FaSearch } from "react-icons/fa"

let timeout;
const Search = ({ inputRef, setIsSearch, setActivePage }) => {

	function handleSearch(event) {
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			setActivePage(1);

			if (event.target.value)
				setIsSearch(true);
			else
				setIsSearch(false);

			timeout = null;
		}, 500);
	}

	return (
		<div className={`flex gap-5 items-center rounded-3xl text-2xl w-1/2 bg-light-main px-5 m-auto
						shadow-normal shadow-secondary-main
						focus-within:shadow-normal-focused focus-within:shadow-secondary-main`}>
			<FaSearch className="text-dark-main" />
			<input
				placeholder="Search..."
				type="text"
				className="bg-light-main outline-none w-full text-dark-main placeholder:font-light py-5"
				onChange={handleSearch}
				ref={inputRef}
			/>
		</div>
	)
}
export default Search