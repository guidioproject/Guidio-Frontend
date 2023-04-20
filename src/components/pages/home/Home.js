import Courses from "./Courses";
import Header from "./Header";
import Alert from '../../common/Alert';

import { useSelector } from "react-redux";
import { MESSAGE_TYPE_SUCCESS } from "../../../store/constants";

const Home = () => {
	const activeUser = useSelector(state => state.user.activeUser);
	const successMsg = useSelector(state => state.ui.successMsg);
	return (
		<div>
			<div className='flex justify-center absolute top-44 w-full'>
				<Alert type={MESSAGE_TYPE_SUCCESS} size='fit' msg={successMsg} />
			</div>
			{!activeUser && <Header />}
			<Courses user={activeUser} isSingleuser={false} />
		</div>
	);
};
export default Home;
