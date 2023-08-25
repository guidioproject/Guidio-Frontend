import { useRef } from "react";
import { useDispatch } from "react-redux";
import UploadButton from "../../../common/UploadButton";
import HeaderInfo from "./HeaderInfo";

import img from '../../../../assets/user_profile.jpg';
import { deleteImage, uploadImage } from "../../../../store/controllers/userController";

const ProfileHeader = ({user, isEditable}) => {
	const dispatch = useDispatch();
	const fileRef = useRef();
	function onUpload() {
		const formData = new FormData();
		formData.append('file', fileRef.current.files[0]);
		dispatch(uploadImage(formData, 'cover_image'));
	}

	function onDelete() {
		dispatch(deleteImage('cover_image', () => fileRef.current.value = null));
	}
	return (
		<header className="h-[65vh] relative mb-10 bg-fixed flex justify-center items-center">
			<img src={user?.userDetails?.coverImage ? `/${user?.userDetails?.coverImage}` : img} alt="Cover" className="absolute w-full h-full object-cover z-1" />
			{!isEditable &&
			<div className="z-20 flex flex-col gap-5">
				<UploadButton uploadRef={fileRef} text="Upload Cover Image" onUpload={onUpload} color="light" />
				{user?.userDetails?.coverImage && <button
					className="bg-danger-dark text-light-main p-4 font-semibold rounded-md shadow-normal
					hover:shadow-normal-hover text-xl z-30"
					onClick={onDelete}>Delete Cover Image</button>}
			</div>
			}
			<HeaderInfo user={user} />
		</header>
	);
};
export default ProfileHeader;
