import { NavLink } from "react-router-dom";

import logo from '../../../../assets/logo.png';

const Form = (props) => {
	return (
		<div className=" w-screen h-screen bg-form-blurred bg-full flex justify-center items-center">
			<div className="w-[80%] h-[85%] bg-form bg-full flex shadow-normal-focused shadow-secondary-main">
				<div className="w-1/2 relative">
					<NavLink to='/' className="bg-primary-main p-10 rounded-[50%] absolute left-1/3 top-28">
						<img src={logo} alt="Guidio logo" className='w-32'/>
					</NavLink>
				</div>
				<form className="py-12 pr-20 w-1/2" onSubmit={props.onSubmit}>
					{props.children}
				</form>
			</div>
	</div>
	);
};
export default Form;
