import Header from "./Header";
import Alert from '../../common/Alert';

import { useSelector } from "react-redux";

import Guides from "../../common/guides/Guides";

const Home = () => {
	const activeUser = useSelector(state => state.user.activeUser);
	return (
		<div className="bg-bg-main">
			<div className='flex justify-center absolute top-44 w-full'>
				<Alert size='fit' />
			</div>
			{!activeUser && <Header />}
			<Guides user={activeUser} isSingleUser={false} />
		</div>
	);
};
export default Home;
