import { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";

import { updateUser } from "../../../../store/controllers/userController";
import { showAndHideMsg } from "../../../../store/slices/uiSlice";

import Avatar from "./Avatar";
import Profession from "./Profession";
import Toggle from "../../../common/Toggle";
import InputGroup from "../common/InputGroup";
import ButtonGroup from "./ButtonGroup";

const ProfileInformation = () => {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user.activeUser);
	const formRef = useRef({});

	const [profId, setprofId] = useState(user.userDetails?.profession?.professionId);
	const [isInstructor, setIsInstructor] = useState(user.userDetails?.isInstructor);

	function updateHandler() {
		const fields = formRef.current;
		if (!profId) {
			dispatch(showAndHideMsg('error', "Select a valid profession!"));
			return;
		}

		if (fields.firstName.value === "" || fields.lastName.value === "" || fields.email.value === "") {
			dispatch(showAndHideMsg('error', "Fields can't be empty!"));
			return;
		}

		dispatch(updateUser(
			user.userId,
			{
				first_name: fields.firstName.value,
				last_name: fields.lastName.value,
				email: fields.email.value,
				userDetails: {
					bio: fields.bio.value,
					linkedin: fields.linkedin.value,
					github: fields.github.value,
					website: fields.website.value,
					is_instructor: isInstructor,
					profession_id: profId,
				},
			}, () => dispatch(showAndHideMsg('success', 'User successfully updated!')))
		);
	}
	return (
		<div className="flex justify-center my-10 gap-32">
			<div className="flex-auto w-[20%]">
				<Avatar />
				<Profession
					profRef={(val) => (formRef.current.profession = val)}
					setProfId={setprofId}
					defaultValue={user.userDetails?.profession?.name}
				/>
				<Toggle isChecked={isInstructor} setChecked={() => setIsInstructor(prev => !prev)} />
				<InputGroup
					text="Bio"
					color="secondary"
					type="textarea"
					defaultValue={user.userDetails?.bio}
					fieldRef={(val) => (formRef.current.bio = val)}
				/>
			</div>
			<div className="flex-auto relative">

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
				<ButtonGroup
					onUpdate={updateHandler}
				/>
			</div>
		</div>
	)
}
export default ProfileInformation