import heroImg from '../../../assets/hero-img.png';
import { NavLink } from 'react-router-dom';

const Header = () => {

	return (
		<div>
			<div className="h-[95vh] bg-hero bg-no-repeat bg-cover">
				<div className='flex px-20 gap-40'>
					<div className='flex flex-col pt-10'>
						<h2 className=" font-medium my-[2rem] text-[5rem] text-light-main line" style={{lineHeight: "100px"}}>
							Learn Anytime, <br />
							Anywhere, and see<br />
							the Future
						</h2>
						<h3 className='text-light-main text-3xl font-light' style={{lineHeight: "50px"}}>
						Unlock Your Potential and Inspire Others to Learn.<br />
						Join our platform to educate and share your expertise.
						</h3>
						<NavLink to='/auth/register' className='bg-success-main text-primary-main text-center font-bold text-3xl
						py-6 px-10 rounded-3xl self-center mt-20
						hover:text-light-main hover:shadow-normal-hover hover:shadow-success-main'
						>
						Start Creating!
						</NavLink>
					</div>
					<div className='self-center'>
						<img className="block" src={heroImg} alt="Hero" />
					</div>
				</div>
			</div>
		</div>
	);
};
export default Header;
