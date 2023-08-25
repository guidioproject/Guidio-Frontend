import { FaBook, FaKey, FaUser } from "react-icons/fa"

const Menu = ({ setActiveTab, activeTab }) => {
	return (
		<ul className="flex border-b-2 border-secondary-main mb-5">
			<li
			className={` px-5 border-b-8 text-gray-dark font-bold
			hover:border-secondary-main hover:cursor-pointer
			${activeTab === 0 ? "border-secondary-main" : "border-[transparent]"}`}
				onClick={() => setActiveTab(0)}>
				<FaUser className="inline" />{" "}
				Basic Information
			</li>
			<li
			className={`mr-5 px-5 pb-10 border-b-8 font-bold text-gray-dark
			hover:border-secondary-main hover:cursor-pointer
			${activeTab === 1 ? "border-secondary-main": "border-[transparent]"}`}
				onClick={() => setActiveTab(1)}>
				<FaKey className="inline" />{" "}
				Password
			</li>
			<li
			className={`mr-5 px-5 pb-10 border-b-8 font-bold text-gray-dark
			hover:border-secondary-main hover:cursor-pointer
			${activeTab === 2 ? "border-secondary-main": "border-[transparent]"}`}
				onClick={() => setActiveTab(2)}>
				<FaBook className="inline" />{" "}
				Guides
			</li>
		</ul>
	)
}
export default Menu