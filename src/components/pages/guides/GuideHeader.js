// import { useRef } from 'react';
import img from '../../../assets/user_profile.jpg';
// import UploadButton from '../../common/UploadButton';
// import { useSelector } from 'react-redux';

const GuideHeader = () => {
// 	const activeUser = useSelector(state => state.user.activeUser);
// 	const activeGuide = useSelector(state => state.guide.activeGuide);
//   const fileRef = useRef();
//   function onUpload() {

//   }
  return (
    <header className="h-[40vh] relative bg-fixed flex justify-center items-center">
      <img src={img} alt="Cover" className="absolute w-full h-full object-cover z-1" />
      <div className="z-20 flex flex-col gap-5">
        {/* {activeUser.userId === activeGuide.userId && <UploadButton uploadRef={fileRef} text="Upload Cover Image" onUpload={onUpload} color="light" />} */}
      </div>
    </header>
  )
}
export default GuideHeader