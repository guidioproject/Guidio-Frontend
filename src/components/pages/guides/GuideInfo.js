import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import Loading from "../../ui/Loading";
import { FaUser } from "react-icons/fa";

const GuideInfo = ({ activeGuide }) => {
	const { isLoading } = useSelector(state => state.ui);
	return (
		<div className="flex justify-between items-center bg-light-main rounded my-5 p-5">
			{isLoading ? <Loading />
				:
				<>
					<div>
						<span className="text-gray-dark text-xl italic">Author: </span>
						<NavLink className="ml-5" to={"/instructors/" + activeGuide?.user?.userId}>
							{activeGuide?.user?.userDetails?.avatar ?
								<img src={"/" + activeGuide.user.userDetails.avatar} alt="Avatar"
									className="w-[50px] inline rounded-[50%] mr-2" />
								:
								<FaUser className="rounded-[50%] inline bg-success-main text-5xl p-1 mr-5" />}
							<h3 className="inline text-xl">{activeGuide?.user?.firstName} {activeGuide?.user?.lastName}</h3>
						</NavLink>
					</div>
					<div className=" text-gray-dark text-xl italic font-bold">
						Creation date:{" "}
						{new Date(activeGuide.lastModified).getDate()}
						-
						{new Date(activeGuide.lastModified).getMonth() + 1}
						-
						{new Date(activeGuide.lastModified).getFullYear()}
					</div>
				</>}
		</div>
	)
}
export default GuideInfo