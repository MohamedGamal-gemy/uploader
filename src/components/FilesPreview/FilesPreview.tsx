import { FileIcon, FileText, MoveDown, X } from "lucide-react";
import useFiles from "../../hooks/useFiles";
import { useEffect } from "react";
import Button from "../Button/Button";
import { downloader } from "../../utils/downloader";

const FilesPreview = () => {
  const { filteredFiles, setSelectedFile, getFiles } = useFiles();

  useEffect(() => {
    getFiles();
  }, []);
console.log(filteredFiles);

  return (
    <div className="mt-5 space-y-4 max-h-[80vh] overflow-y-auto p-8">
      {filteredFiles.map((file, index) => {
       

        const fileType = file.file.metadata?.mimetype || "";
        const isImage = fileType.startsWith("image/");
        const isVideo = fileType.startsWith("video/");
        const isPDF = fileType === "application/pdf";
        console.log(fileType);

        return (
          <div
            
            key={index}
            className="flex items-center flex-col w-[400px] h-[300px] pb-3 my-4 shadow rounded-lg border relative"
          >
              <Button icon={<MoveDown/>} onClickFn={(e) => downloader(file.publicUrl, file.file.name, e)}></Button>
              <Button icon={<X/>} isRemove={true}></Button>
            {isImage ? (
              <img
                referrerPolicy="no-referrer"
                src={file.publicUrl}
                alt="Uploaded Image"
                className="w-full h-[250px] max-h-[250px] max-w-full object-cover rounded-md cursor-pointer"
                onClick={() => setSelectedFile(file)}
              />
            ) : isVideo ? (
              <video onClick={() => setSelectedFile(file)} controls className="w-full h-[250px] rounded-md">
                <source src={file.publicUrl} type={fileType} />
                المتصفح لا يدعم تشغيل هذا الفيديو.
              </video>
            ) : isPDF ? (
              <div onClick={() => setSelectedFile(file)} className="w-full h-32 bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto" />
                  <span className="text-sm text-gray-500 mt-1">PDF</span>
                </div>
              </div>
            ) : (
              <div onClick={() => setSelectedFile(file)} className="w-full h-32 bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                <FileIcon className="w-8 h-8 text-gray-400" />
              </div>
            )}

      
            <div className="flex-1 text-center">
              <p className="font-medium text-white">{file.file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.file.metadata?.size / 1024).toFixed(2)} KB
              </p>
            </div>

         
            {isPDF && (
              <a
                href={file.publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-2"
              >
                فتح الملف
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FilesPreview;
