// import { useContext, useEffect, useState } from "react";
// import useUpload from "../hooks/useUpload";
// import { File, MessageCircle } from "lucide-react";
// import ButtonDelete from "../components/Head/Button/ButtonDelete";
// import Head from "../components/Head/Head";
// import useLogin from "../hooks/useLogin";
// import CommentModal from "../utils/CommentModal";
// import { AdminEmailContext } from "../utils/AdminEmailContext ";
//
// const Pdfs = () => {
//   const { session } = useLogin();
//   const { getFiles, pdfs, cdn, deleteFile } = useUpload();
//   const [loading, setLoading] = useState(true);
//
//   useEffect(() => {
//     getFiles().finally(() => setLoading(false));
//   }, []);
//
//   const [openModal, setOpenModal] = useState(false);
//   const [imgName, setImgName] = useState(null);
//   const [imgId, setImgId] = useState(null);
//   const { adminEmail } = useContext(AdminEmailContext);
//
//   const handleOpenFile = (fileUrl) => {
//     const googleDocsViewer = `https://docs.google.com/gview?url=${fileUrl}&embedded=true`;
//     window.open(googleDocsViewer, "_blank");
//   };
//
//   return (
//     <div className="p-8 bg-[#1d2129] h-screen">
//       <div className="flex flex-wrap gap-6 justify-center">
//         {loading ? (
//           <div className="text-white">جاري تحميل الملفات...</div>
//         ) : pdfs.length > 0 ? (
//           <>
//             {pdfs.map((pdf, index) => (
//               <div
//                 key={index}
//                 className="w-[250px] relative bg-white rounded-lg shadow-lg overflow-hidden text-center flex flex-col justify-center p-4"
//               >
//                 {session?.user.email === adminEmail && (
//                   <ButtonDelete
//                     deleteFile={deleteFile}
//                     file={pdf}
//                     className={"right-2 top-1"}
//                   />
//                 )}
//
//                 <div className="mb-4 flex flex-col justify-center items-center">
//                   <File className="text-red-500" size={80} />
//                 </div>
//                 <a
//                   href={cdn + pdf.name}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 hover:text-blue-700 text-lg font-semibold"
//                 >
//                   {pdf.name}
//                 </a>
//                 <div className="mt-4">
//                   <button
//                     onClick={() => handleOpenFile(cdn + pdf.name)}
//                     className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg mt-2 hover:bg-blue-700"
//                   >
//                     فتح
//                   </button>
//                 </div>
//                 <MessageCircle
//                   className="w-5 h-5 cursor-pointer"
//                   onClick={() => {
//                     setOpenModal(true);
//                     setImgId(pdf.id);
//                     setImgName(pdf.name);
//                   }}
//                 />
//                 {openModal && (
//                   <CommentModal
//                     namefile={pdf.name}
//                     file={cdn + imgName}
//                     typeFile={"pdf"}
//                     idFile={imgId}
//                     openModal={setOpenModal}
//                   />
//                 )}
//               </div>
//             ))}
//           </>
//         ) : (
//           <Head text={"لا توجد ملفات PDF"} />
//         )}
//       </div>
//     </div>
//   );
// };
//
// export default Pdfs;
//

//

import { useContext, useEffect, useState } from "react";
import useUpload from "../hooks/useUpload";
import { File, MessageCircle } from "lucide-react";
import ButtonDelete from "../components/Head/Button/ButtonDelete";
import Head from "../components/Head/Head";
import useLogin from "../hooks/useLogin";
import CommentModal from "../utils/CommentModal";
import { AdminEmailContext } from "../utils/AdminEmailContext ";
// import { AdminEmailContext } from "../utils/AdminEmailContext";

const Pdfs = () => {
  const { session } = useLogin();
  const { getFiles, pdfs, cdn, deleteFile } = useUpload();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [imgName, setImgName] = useState(null);
  const [imgId, setImgId] = useState(null);
  const { adminEmail } = useContext(AdminEmailContext);

  useEffect(() => {
    getFiles().finally(() => setLoading(false));
  }, []);

  const handleOpenFile = (fileUrl) => {
    const encodedUrl = encodeURIComponent(fileUrl);
    const googleDocsViewer = `https://docs.google.com/gview?url=${encodedUrl}&embedded=true`;
    window.open(googleDocsViewer, "_blank");
  };

  return (
    <div className="p-8 bg-[#1d2129] h-screen">
      <div className="flex flex-wrap gap-6 justify-center">
        {loading ? (
          <div className="text-white">جاري تحميل الملفات...</div>
        ) : pdfs.length > 0 ? (
          <>
            {pdfs.map((pdf, index) => (
              <div
                key={index}
                className="w-[250px] relative bg-white rounded-lg shadow-lg overflow-hidden text-center flex flex-col justify-center p-4"
              >
                {session?.user.email === adminEmail && (
                  <ButtonDelete
                    deleteFile={deleteFile}
                    file={pdf}
                    className="right-2 top-1"
                  />
                )}

                <div className="mb-4 flex flex-col justify-center items-center">
                  <File className="text-red-500" size={80} />
                </div>
                <a
                  href={cdn + pdf.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 text-lg font-semibold"
                >
                  {pdf.name}
                </a>
                <div className="mt-4">
                  <button
                    onClick={() => handleOpenFile(cdn + pdf.name)}
                    className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg mt-2 hover:bg-blue-700"
                  >
                    فتح
                  </button>
                </div>
                <MessageCircle
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => {
                    setOpenModal(true);
                    setImgId(pdf.id);
                    setImgName(pdf.name);
                  }}
                />
                {openModal && imgId === pdf.id && (
                  <CommentModal
                    namefile={pdf.name}
                    file={cdn + imgName}
                    typeFile="pdf"
                    idFile={imgId}
                    openModal={setOpenModal}
                  />
                )}
              </div>
            ))}
          </>
        ) : (
          <div className="text-white text-center">
            <p>لا توجد ملفات PDF</p>
            <button
              onClick={getFiles}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              إعادة تحميل الملفات
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pdfs;
