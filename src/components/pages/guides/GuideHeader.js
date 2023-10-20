import { useRef } from 'react';
import img from '../../../assets/user_profile.jpg';
import UploadButton from '../../common/UploadButton';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCoverImage, uploadCoverImage } from '../../../store/controllers/guideController';

const GuideHeader = () => {
  const dispatch = useDispatch();

	const activeUser = useSelector(state => state.user.activeUser);
	const activeGuide = useSelector(state => state.guide.activeGuide);
  const fileRef = useRef();
	function onUpload() {
		const formData = new FormData();
		formData.append('file', fileRef.current.files[0]);
		dispatch(uploadCoverImage(formData, activeGuide.guideId));
	}

	function onDelete() {
		dispatch(deleteCoverImage(activeGuide.guideId, () => fileRef.current.value = null));
	}
  return (
    <header className="h-[40vh] relative bg-fixed flex justify-center items-center">
      <img src={activeGuide.coverImage ? '/' + activeGuide.coverImage : img} alt="Cover" className="absolute w-full h-full object-cover z-1" />
      <div className="z-20 flex flex-col gap-5">
        {activeUser.userId === activeGuide.user?.userId && <UploadButton uploadRef={fileRef} text="Upload Cover Image" onUpload={onUpload} color="light" />}
        {(activeUser.userId === activeGuide.user?.userId && activeUser?.userDetails?.coverImage) && <button
					className="bg-danger-dark text-light-main p-4 font-semibold rounded-md shadow-normal
					hover:shadow-normal-hover text-xl z-30"
					onClick={onDelete}>Delete Cover Image</button>}
      </div>
    </header>
  )
}
export default GuideHeader