import { useRef } from "react"
import { FaUser } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { deleteImage, uploadImage } from "../../../../store/controllers/userController";
import UploadButton from "../../../common/UploadButton";

const Avatar = () => {
	const dispatch = useDispatch();

	const user = useSelector(state => state.user.activeUser);
	const fileRef = useRef();

	function onUpload() {
		const formData = new FormData();
		formData.append('file', fileRef.current.files[0]);
		dispatch(uploadImage(formData, 'avatar'));
	}

	function onDelete() {
		dispatch(deleteImage('avatar', () => fileRef.current.value = null));
	}
	return (
		<div className="flex justify-between h-40 mb-10">
			{user.userDetails?.avatar ?
			 <img src={user.userDetails?.avatar} alt="Avatar" className="object-cover rounded-[50%]" /> :
			  <FaUser className="inline-block bg-success-main p-8 text-[8rem] rounded-[50%] shadow-normal shadow-secondary-main mr-5" />}

			<div>
				<UploadButton text="Upload Avatar" color="dark" uploadRef={fileRef} onUpload={onUpload} />
				<button
					className="block bg-gray-main text-light-main px-2 py-3 rounded-md text-lg mt-5"
					onClick={onDelete}>
					Delete picture
				</button>
			</div>
		</div>
	)
}
export default Avatar