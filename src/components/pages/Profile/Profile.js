import { useRef, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
	changePassword,
	updateUser,
} from "../../../store/controllers/userController";
import { showAndHideMsg } from "../../../store/slices/uiSlice";
import Avatar from "./Avatar";
import ButtonGroup from "./ButtonGroup";
import ChangePassword from "./ChangePassword";
import InputGroup from "./common/InputGroup";
import Profession from "./Profession";
import ProfileHeader from "./ProfileHeader";

const Profile = () => {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user.activeUser);
	const error = useSelector((state) => state.ui.errorMsg);

	const formRef = useRef({});

	const [showPw, setShowPw] = useState(false);
	const [profId, setprofId] = useState(
		user.userDetails?.profession?.professionId
	);

	function updateHandler() {
		const {
			firstName,
			lastName,
			email,
			currentPassword,
			password,
			bio,
			linkedin,
			github,
			website,
		} = formRef.current;

		if (!profId) {
			dispatch(showAndHideMsg('error', "Selected profession doesn't exist!"));
			return;
		}

		if (
			firstName.value === "" ||
			lastName.value === "" ||
			email.value === "" ||
			(showPw && (currentPassword.value === "" || password.value === ""))
		) {
			dispatch(showAndHideMsg('error', "Fields can't be empty!"));
			return;
		}

		dispatch(
			updateUser(
				user.userId,
				{
					first_name: firstName.value,
					last_name: lastName.value,
					email: email.value,
					details: {
						bio: bio.value,
						linkedin: linkedin.value,
						github: github.value,
						website: website.value,
						profession_id: profId,
					},
				},
				() => {
					if (showPw)
						dispatch(
							changePassword(user.userId, {
								current_password: currentPassword.value,
								password: password.value,
							})
						);
				}
			)
		);
	}
	return (
		<main>
			<ProfileHeader />
			<div className="flex justify-center mx-[20%] gap-32 my-36">
				<div className="flex-auto w-[20%]">
					<Avatar />
					<Profession
						profRef={(val) => (formRef.current.profession = val)}
						setProfId={setprofId}
						defaultValue={user.userDetails?.profession?.name}
					/>
					<InputGroup
						text="Bio"
						color="secondary"
						type="textarea"
						defaultValue={user.userDetails?.bio}
						fieldRef={(val) => (formRef.current.bio = val)}
					/>
				</div>
				<div className="flex-auto relative">
					<div
						className={`text-danger-dark border border-dan bg-danger-light font-bold capitalize p-2 mb-1 rounded text-lg w-[100%] ${
							!error && "invisible"
						}`}
					>
						<FaExclamationCircle className="inline text-xl" />{" "}
						{error}
					</div>

					<div className="flex gap-20">
						<InputGroup
							text="First Name"
							color="success"
							type="text"
							defaultValue={user.firstName}
							fieldRef={(val) =>
								(formRef.current.firstName = val)
							}
						/>
						<InputGroup
							text="Last Name"
							color="success"
							type="text"
							defaultValue={user.lastName}
							fieldRef={(val) => (formRef.current.lastName = val)}
						/>
					</div>
					<InputGroup
						text="Email"
						color="success"
						type="email"
						defaultValue={user.email}
						fieldRef={(val) => (formRef.current.email = val)}
					/>
					<InputGroup
						text="Website"
						color="success"
						type="text"
						defaultValue={user.userDetails?.website}
						fieldRef={(val) => (formRef.current.website = val)}
					/>
					<div className="flex gap-20">
						<InputGroup
							text="LinkedIn"
							color="success"
							type="text"
							defaultValue={user.userDetails?.linkedin}
							fieldRef={(val) => (formRef.current.linkedin = val)}
						/>
						<InputGroup
							text="Github"
							color="success"
							type="text"
							defaultValue={user.userDetails?.github}
							fieldRef={(val) => (formRef.current.github = val)}
						/>
					</div>
					{showPw && (
						<ChangePassword
							currentPwRef={(val) =>
								(formRef.current.currentPassword = val)
							}
							pwRef={(val) => (formRef.current.password = val)}
						/>
					)}
					<ButtonGroup
						onChangePw={() => setShowPw((prev) => !prev)}
						showPwBtn={showPw}
						onUpdate={updateHandler}
					/>
				</div>
			</div>
		</main>
	);
};
export default Profile;
