import { NavLink } from "react-router-dom"
import cardImg from "../../../assets/card_item.png";
import { FaUser } from "react-icons/fa";
const Guide = ({guide}) => {
  return (
	<NavLink to={`/guides/${guide.guideId}`} className="group w-full mb-10  hover:cursor-pointer" key={`${guide.guideId} - ${guide.title}`}>
	<div className="relative">
		<img src={cardImg} alt="Card Item" />
		<div className="absolute top-0 w-full h-full p-4 text-light-main flex items-end gap-2
						group-hover:bg-gradient-to-b from-gradient-white to-gradient-secondary">
			<h3 className="text-xl">
				{guide.title}{" "}
				{!guide.published && <span className="bg-secondary-main p-1 rounded-md">DRAFT</span>}
			</h3>
		</div>
	</div>
	<div className="flex items-center gap-2 px-2 py-4 shadow-secondary-main shadow-normal bg-light-main rounded-b-3xl">
		{guide.user.avatar ?
			<img src={`/${guide.user.avatar}`} className="w-16 rounded-[50%]" alt="Avatar" /> :
			<FaUser className="rounded-[50%] bg-success-main text-6xl p-1" />}
		<p className="text-lg font-semibold">{`${guide.user.firstName} ${guide.user.lastName}`} |</p>
		<span className="italic">{guide.user.profession}</span>
	</div>
</NavLink>
  )
}
export default Guide