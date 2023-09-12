import { NavLink } from 'react-router-dom';
import logo from '../../../assets/logo.png';

const Logo = ({ inFooter = false }) => {

	return (
		<NavLink  to='/' className={`
		${!inFooter && "absolute left-1/2 -translate-y-10 -translate-x-1/2 bg-primary-main py-6 px-8 rounded-[50%] z-10"}
		${inFooter && "mb-5 border-b-2 pb-2 px-16"}
		`}>
			<img src={logo} alt="Guid.io Logo" className=' w-36'/>
		</NavLink>
	);
};
export default Logo;
