import { FaLinkedin, FaGoogle, FaTelegram } from 'react-icons/fa';
import { Link } from "react-router-dom"
import Logo from "./common/Logo"
const Footer = () => {
	return (
		<footer className="p-5 py-10 bg-primary-main flex flex-col items-center text-light-main">
			<Logo inFooter={true} />
			<div className="flex justify-center gap-5 text-light-main text-2xl mb-6">
				<Link className='text-4xl' to="https://linkedin.com" target="_blank"><FaLinkedin /></Link>
				<Link className='text-4xl' to="https://google.com" target="_blank"><FaGoogle /></Link>
				<Link className='text-4xl' to="https://telegram.org" target="_blank"><FaTelegram /></Link>
			</div>
			<p className='text-xl'>&copy; 2023 Guidio. All rights reserved.</p>
		</footer>
	)
}
export default Footer