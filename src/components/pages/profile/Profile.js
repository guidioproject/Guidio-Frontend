import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProfileHeader from "./header/ProfileHeader";
import Menu from "./main/Menu";
import Alert from "../../common/Alert";
import ChangePassword from "./main/ChangePassword";
import ProfileInformation from "./main/ProfileInformation";
import Guides from "../../common/guides/Guides";
import { useParams } from "react-router-dom";
import { getUserById } from "../../../store/controllers/userController";

const Profile = () => {
	const id = Number(useParams().id);

	const dispatch = useDispatch();

	const { errorMsg, successMsg } = useSelector((state) => state.ui);
	const user = useSelector(state => id ? state.user.previewedUser : state.user.activeUser);

	const [activeTab, setActiveTab] = useState(0);

	useEffect(() => {
		if (id) {
			dispatch(getUserById(id));
			setActiveTab(2);
		}
	}, [dispatch, id]);
	return (
		<main>
			{user && <ProfileHeader user={user} isEditable={id} />}
			<div className="px-[20%]">
				{!id ?
					<Menu setActiveTab={setActiveTab} activeTab={activeTab} /> : ''
				}
				<div className="flex justify-center">
					<Alert
						type={
							(errorMsg && "error") || (successMsg && "success")
						}
						msg={successMsg || errorMsg}
						size="half"
					/>
				</div>
				{(!id && activeTab === 0) && <ProfileInformation user={user} />}
				{(!id && activeTab === 1) && <ChangePassword user={user} />}
				{(user && activeTab === 2) && <Guides isSingleUser={true} user={user} />}
			</div>
		</main>
	);
};
export default Profile;
