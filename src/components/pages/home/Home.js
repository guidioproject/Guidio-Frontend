import Header from "./Header";
import Alert from '../../common/Alert';

import { useSelector } from "react-redux";
import { MESSAGE_TYPE_ERROR, MESSAGE_TYPE_SUCCESS } from "../../../store/constants";
import Guides from "../../common/guides/Guides";

const Home = () => {
	const activeUser = useSelector(state => state.user.activeUser);
	const { successMsg, errorMsg } = useSelector(state => state.ui);
	return (
		<div className="bg-bg-main">
			<div className='flex justify-center absolute top-44 w-full'>
				<Alert type={MESSAGE_TYPE_SUCCESS} size='fit' msg={successMsg} />
				<Alert type={MESSAGE_TYPE_ERROR} size='fit' msg={errorMsg} />
			</div>
			{!activeUser && <Header />}
			<div className="pt-48">
				<Guides user={activeUser} isSingleUser={false} />
			</div>
		</div>
	);
};
export default Home;
