import { useContext, useEffect, useState } from "react";
import useUpload from "../hooks/useUpload";
import { File, MessageCircle, Download } from "lucide-react"; // إضافة أيقونة التحميل
import ButtonDelete from "../components/Head/Button/ButtonDelete";
import Head from "../components/Head/Head";
import useLogin from "../hooks/useLogin";
import CommentModal from "../utils/CommentModal";
import { AdminEmailContext } from "../utils/AdminEmailContext ";
import downloader from "../utils/downloader"; // استيراد دالة التحميل

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

  const handleOpenFile = (fileUrl, fileType) => {
    const encodedUrl = encodeURIComponent(fileUrl);

    if (["pdf", "doc", "docx", "ppt", "pptx"].includes(fileType)) {
      // Google Docs Viewer (يدعم PDF, Word, PowerPoint)
      const googleDocsViewer = `https://docs.google.com/gview?url=${encodedUrl}&embedded=true`;
      window.open(googleDocsViewer, "_blank");
    } else if (["xls", "xlsx", "ppt", "pptx"].includes(fileType)) {
      // OneDrive Viewer (يدعم Excel, PowerPoint)
      const oneDriveViewer = `https://view.officeapps.live.com/op/view.aspx?src=${encodedUrl}`;
      window.open(oneDriveViewer, "_blank");
    } else {
      // فتح الملف مباشرة إذا لم يكن من الأنواع المدعومة
      window.open(fileUrl, "_blank");
    }
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
                {adminEmail.includes(session?.user?.email) && (
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

                {/* زر فتح الملف */}
                <button
                  onClick={() =>
                    handleOpenFile(
                      cdn + pdf.name,
                      pdf.name.split(".").pop().toLowerCase()
                    )
                  }
                  className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg mt-2 hover:bg-blue-700"
                >
                  فتح
                </button>

                {/* زر تحميل الملف */}
                <button
                  onClick={(e) => downloader(cdn + pdf.name, pdf.name, e)}
                  className="mt-2 w-full bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700"
                >
                  <Download className="w-5 h-5" /> تحميل الملف
                </button>

                {/* زر التعليقات */}
                <MessageCircle
                  className="mt-3 w-5 h-5 cursor-pointer"
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
