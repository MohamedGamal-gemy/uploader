// import { useContext, useEffect, useState } from "react";
// import useUpload from "../hooks/useUpload";
// import { MessageCircle, Play } from "lucide-react";
// import Head from "../components/Head/Head";
// import ButtonDelete from "../components/Head/Button/ButtonDelete";
// import useLogin from "../hooks/useLogin";
// import CommentModal from "../utils/CommentModal";
// import { AdminEmailContext } from "../utils/AdminEmailContext ";
//
// const Videos = () => {
//   const { session } = useLogin();
//   const { getFiles, videos, cdn, deleteFile } = useUpload();
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [loading, setLoading] = useState(true);
//   //
//   const [openModal, setOpenModal] = useState(false);
//   const [imgName, setImgName] = useState(null);
//   const [imgId, setImgId] = useState(null);
//
//   useEffect(() => {
//     getFiles().finally(() => setLoading(false));
//   }, []);
//
//   const handlePlay = () => {
//     setIsPlaying(true);
//   };
//
//   const handlePause = () => {
//     setIsPlaying(false);
//   };
//
//   const { adminEmail } = useContext(AdminEmailContext);
//   // console.log(adminEmail);
//
//   return (
//     <div className="p-8 bg-[#1d2129] h-screen">
//       {openModal && (
//         <CommentModal
//           typeFile={"vedio"}
//           file={imgName}
//           idFile={imgId}
//           openModal={setOpenModal}
//         />
//       )}
//       {loading ? (
//         <p className="text-2xl text-white">loading...</p>
//       ) : (
//         <div className="flex flex-wrap gap-8 ">
//           {videos?.length ? (
//             videos?.map((video, index) => (
//               <div
//                 key={index}
//                 className=" w-[400px] h-[350px] p-4 pb-8 bg-[#f8f5f5] rounded-lg shadow-lg
//                  overflow-hidden pt-10
//                 transform hover:scale-105 transition-all duration-300"
//               >
//                 <video
//                   src={cdn + video.name}
//                   controls
//                   className="w-full h-full object-cover rounded-lg"
//                   onPlay={handlePlay}
//                   onPause={handlePause}
//                 />
//                 {session?.user.email === adminEmail && (
//                   <ButtonDelete
//                     deleteFile={deleteFile}
//                     file={video}
//                     className={"top-0.5 right-2"}
//                   />
//                 )}
//                 <MessageCircle
//                   className=" w-5 h-5 cursor-pointer"
//                   onClick={() => {
//                     setOpenModal(true);
//                     setImgId(video.id);
//                     setImgName(cdn + video.name);
//                   }}
//                 />
//               </div>
//             ))
//           ) : (
//             <Head text={"لا توجد فيديوهات"} />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };
//
// export default Videos;

//

import { useContext, useEffect, useState } from "react";
import useUpload from "../hooks/useUpload";
import { MessageCircle, Download } from "lucide-react"; // استبدال أيقونة التحميل
import Head from "../components/Head/Head";
import ButtonDelete from "../components/Head/Button/ButtonDelete";
import useLogin from "../hooks/useLogin";
import CommentModal from "../utils/CommentModal";
import { AdminEmailContext } from "../utils/AdminEmailContext ";
import downloader from "../utils/downloader"; // استيراد دالة التحميل

const Videos = () => {
  const { session } = useLogin();
  const { getFiles, videos, cdn, deleteFile } = useUpload();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [imgName, setImgName] = useState(null);
  const [imgId, setImgId] = useState(null);

  useEffect(() => {
    getFiles().finally(() => setLoading(false));
  }, []);

  const { adminEmail } = useContext(AdminEmailContext);

  return (
    <div className="p-8 bg-[#1d2129] h-screen">
      {openModal && (
        <CommentModal
          typeFile={"vedio"}
          file={imgName}
          idFile={imgId}
          openModal={setOpenModal}
        />
      )}
      {loading ? (
        <p className="text-2xl text-white">جارٍ التحميل...</p>
      ) : (
        <div className="flex flex-wrap gap-8 ">
          {videos?.length ? (
            videos?.map((video, index) => (
              <div
                key={index}
                className="w-[400px] h-[350px] p-4 pb-8 bg-[#f8f5f5] rounded-lg shadow-lg overflow-hidden pt-10
                transform hover:scale-105 transition-all duration-300"
              >
                <video
                  src={cdn + video.name}
                  controls
                  className="w-full h-full object-cover rounded-lg"
                />

                {/* زر التحميل */}
                <button
                  onClick={(e) => downloader(cdn + video.name, video.name, e)}
                  className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" /> تحميل الفيديو
                </button>

                {/* زر الحذف (للمدير فقط) */}
                {session?.user.email === adminEmail && (
                  <ButtonDelete
                    deleteFile={deleteFile}
                    file={video}
                    className={"top-0.5 right-2"}
                  />
                )}

                {/* زر التعليقات */}
                <MessageCircle
                  className="mt-3 w-5 h-5 cursor-pointer"
                  onClick={() => {
                    setOpenModal(true);
                    setImgId(video.id);
                    setImgName(cdn + video.name);
                  }}
                />
              </div>
            ))
          ) : (
            <Head text={"لا توجد فيديوهات"} />
          )}
        </div>
      )}
    </div>
  );
};

export default Videos;
