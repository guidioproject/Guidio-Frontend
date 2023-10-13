import { FaSearch } from "react-icons/fa"

const Search = ({ searchVal, setSearchVal }) => {

	return (
		<div className={`flex gap-5 items-center rounded-3xl text-2xl w-1/2 bg-light-main px-5 m-auto
						shadow-normal shadow-secondary-main
						focus-within:shadow-normal-focused focus-within:shadow-secondary-main`}>
			<FaSearch className="text-dark-main" />
			<input
				placeholder="Search..."
				type="text"
				className="bg-light-main outline-none w-full text-dark-main placeholder:font-light py-5"
				value={searchVal}
				onChange={e => setSearchVal(e.target.value)}

			/>
		</div>
	)
}
export default Search