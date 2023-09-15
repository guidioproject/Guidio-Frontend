import Courses from "../../common/guides/Guides";
import Header from "./Header";
import Alert from '../../common/Alert';

import { useSelector } from "react-redux";
import { MESSAGE_TYPE_ERROR, MESSAGE_TYPE_SUCCESS } from "../../../store/constants";

const Home = () => {
	const activeUser = useSelector(state => state.user.activeUser);
	const {successMsg, errorMsg} = useSelector(state => state.ui);
	return (
		<div>
			<div className='flex justify-center absolute top-44 w-full'>
				<Alert type={MESSAGE_TYPE_SUCCESS} size='fit' msg={successMsg} />
				<Alert type={MESSAGE_TYPE_ERROR} size='fit' msg={errorMsg} />
			</div>
			{!activeUser && <Header />}
			<Courses user={activeUser} />
		</div>
	);
};
export default Home;
