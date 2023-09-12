import { FaGithub, FaGlobe, FaLinkedin, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Instructor = ({instructor}) => {
  return (
    <div className="flex flex-col items-center justify-between gap-5 py-5 bg-light-main hover:shadow-normal hover:shadow-success-main rounded">
    <NavLink to={`/instructors/${instructor.userId}`} className="group flex flex-col items-center gap-5 hover:cursor-pointer">
      {instructor?.userDetails?.avatar ?
        <img src={instructor?.userDetails.avatar} alt="Avatar" className="rounded-[50%] w-20" />
        :
        <FaUser className="inline-block bg-success-main p-5 text-[5rem] rounded-[50%] shadow-normal shadow-secondary-main" />
      }
      <h2 className="text-xl group-hover:underline">{instructor.firstName} {instructor.lastName}</h2>
    </NavLink>
    <p className=" text-gray-dark">{instructor?.userDetails?.profession.name || "Profession not set"}</p>
    <p className="w-2/3 text-center">{instructor?.userDetails?.bio}</p>
    <div className="flex text-3xl w-1/3 justify-between">
      <NavLink
        to={instructor.userDetails?.website || "/"}
        target="_blank"
      >
        <FaGlobe />
      </NavLink>
      <NavLink
        to={instructor.userDetails?.linkedin || "/"}
        target="_blank"
      >
        <FaLinkedin />
      </NavLink>
      <NavLink
        to={instructor.userDetails?.github || "/"}
        target="_blank"
      >
        <FaGithub />
      </NavLink>
    </div>
  </div>
  )
}
export default Instructor