import { FaGithub, FaGlobe, FaLinkedin, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const HeaderInfo = ({ user }) => {
	return (
		<div className="bg-light-main rounded-t-3xl z-10 h-fit absolute bottom-0 left-16 ml-10 w-1/3">
			<div className="absolute left-[2%] top-[4%] w-[95%] h-full border-2 -z-10 border-success-main rounded-t-3xl shadow-small shadow-success-main"></div>
			<div className="flex items-center ml-5 h-28 mt-2">
				{user?.userDetails?.avatar ?
					<img src={`/${user?.userDetails?.avatar}`} alt="Avatar" className="rounded-[50%] w-20 mr-5" /> :
					<FaUser className="inline-block bg-success-main p-5 text-[5rem] rounded-[50%] shadow-normal shadow-secondary-main mr-5" />}

				<h3 className="text-3xl font-semibold w-[80%] max-w-[80%] flex items-center flex-wrap">
					{user?.firstName} {user?.lastName}
					<span className="text-lg">
						{user?.userDetails?.profession?.name && `| ${user?.userDetails?.profession?.name} |`}
					</span>
				</h3>
			</div>
			<div className="flex p-5 items-center relative right-16 gap-14 w-[115%] bg-light-main rounded-t-3xl -z-20 bottom-0">
				<div className="absolute left-[1%] top-[3%] w-[98%] h-[97%] border-2 -z-30 border-primary-main rounded-t-3xl shadow-small shadow-primary-main"></div>
				<div className="flex flex-col text-3xl gap-5 z-10">
					<NavLink
						to={user?.userDetails?.website || "/"}
						target="_blank"
					>
						<FaGlobe />
					</NavLink>
					<NavLink
						to={user?.userDetails?.linkedin || "/"}
						target="_blank"
					>
						<FaLinkedin />
					</NavLink>
					<NavLink
						to={user?.userDetails?.github || "/"}
						target="_blank"
					>
						<FaGithub />
					</NavLink>
				</div>
				<p className="font-light text-xl w-[80%] break-words text-justify">
					{user?.userDetails?.bio}
				</p>
			</div>
		</div>
	);
};
export default HeaderInfo;
