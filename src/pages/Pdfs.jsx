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
//                   <a
//                     href={cdn + pdf.name}
//                     download
//                     className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg mt-2 hover:bg-blue-700"
//                   >
//                     فتح
//                   </a>
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

const Pdfs = () => {
  const { session } = useLogin();
  const { getFiles, files, cdn, deleteFile } = useUpload();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFiles().finally(() => setLoading(false));
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [fileId, setFileId] = useState(null);
  const { adminEmail } = useContext(AdminEmailContext);

  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    switch (extension) {
      case "pdf":
        return <File className="text-red-500" size={80} />;
      case "doc":
      case "docx":
        return <File className="text-blue-500" size={80} />;
      case "xls":
      case "xlsx":
        return <File className="text-green-500" size={80} />;
      default:
        return <File className="text-gray-500" size={80} />;
    }
  };

  return (
    <div className="p-8 bg-[#1d2129] h-screen">
      <div className="flex flex-wrap gap-6 justify-center">
        {loading ? (
          <div className="text-white">جاري تحميل الملفات...</div>
        ) : files.length > 0 ? (
          <>
            {files.map((file, index) => (
              <div
                key={index}
                className="w-[250px] relative bg-white rounded-lg shadow-lg overflow-hidden text-center flex flex-col justify-center p-4"
              >
                {session?.user.email === adminEmail && (
                  <ButtonDelete
                    deleteFile={deleteFile}
                    file={file}
                    className={"right-2 top-1"}
                  />
                )}

                <div className="mb-4 flex flex-col justify-center items-center">
                  {getFileIcon(file.name)}
                </div>
                <a
                  href={cdn + file.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 text-lg font-semibold"
                >
                  {file.name}
                </a>
                <div className="mt-4">
                  <a
                    href={cdn + file.name}
                    download
                    className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg mt-2 hover:bg-blue-700"
                  >
                    فتح
                  </a>
                </div>
                <MessageCircle
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => {
                    setOpenModal(true);
                    setFileId(file.id);
                    setFileName(file.name);
                  }}
                />
                {openModal && (
                  <CommentModal
                    namefile={file.name}
                    file={cdn + fileName}
                    typeFile={file.name.split(".").pop().toLowerCase()}
                    idFile={fileId}
                    openModal={setOpenModal}
                  />
                )}
              </div>
            ))}
          </>
        ) : (
          <Head text={"لا توجد ملفات"} />
        )}
      </div>
    </div>
  );
};

export default Pdfs;

