import { FaGithub, FaGlobe, FaLinkedin, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const InstructorsItem = ({ instructor }) => {

	const { userId, userDetails, firstName, lastName } = instructor;

	const handleBio = bio =>
		bio ?
			bio.length > 150 ? bio.substring(0, 150) + '...' : bio
			:
			'Bio not set.';

	const handleProfession = profession => profession ? profession : 'Profession not set.';

	return (
		<div className="flex flex-col items-center justify-between gap-5 py-5 bg-light-main hover:shadow-normal hover:shadow-success-main rounded min-h-[25rem]">
			<NavLink to={`/instructors/${userId}`} className="group flex flex-col items-center gap-5 hover:cursor-pointer">
				{userDetails.avatar ?
					<img src={userDetails.avatar} alt="Avatar" className="rounded-[50%] w-20" />
					:
					<FaUser className="inline-block bg-success-main p-5 text-[5rem] rounded-[50%] shadow-normal shadow-secondary-main" />
				}
				<h2 className="text-xl group-hover:underline">{firstName} {lastName}</h2>
			</NavLink>
			<p className=" text-gray-dark">{handleProfession(userDetails.profession?.name)}</p>
			<p className="w-2/3 break-words text-left">{handleBio(userDetails.bio)}</p>
			<div className="flex text-3xl w-1/3 justify-between">
				<NavLink to={userDetails.website || "/"} target="_blank">
					<FaGlobe />
				</NavLink>
				<NavLink to={userDetails.linkedin || "/"} target="_blank">
					<FaLinkedin />
				</NavLink>
				<NavLink to={userDetails.github || "/"} target="_blank">
					<FaGithub />
				</NavLink>
			</div>
		</div>
	)
}
export default InstructorsItem