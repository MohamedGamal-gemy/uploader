import { useEffect, useState } from "react";
import useUpload from "../hooks/useUpload";
import { File } from "lucide-react";
import ButtonDelete from "../components/Head/Button/ButtonDelete";
import Head from "../components/Head/Head";

const Pdfs = () => {
  const { getFiles, pdfs, cdn, deleteFile } = useUpload();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFiles().finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 bg-[#1d2129] h-screen">
      <div className="flex flex-wrap gap-6 justify-">
        {loading ? (
          <div className="text-white">جاري تحميل الملفات...</div>
        ) : pdfs.length > 0 ? (
          pdfs.map((pdf, index) => (
            <div
              key={index}
              className="w-[250px] relative bg-white rounded-lg shadow-lg overflow-hidden 
              text-center flex flex-col
               justify-center p-4"
            >
              <ButtonDelete
                deleteFile={deleteFile}
                file={pdf}
                className={"right-2 top-1"}
              />
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
                <a
                  href={cdn + pdf.name}
                  download
                  className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg
                   mt-2 hover:bg-blue-700"
                >
                  فتح
                </a>
              </div>
            </div>
          ))
        ) : (
          <Head text={"PDF لا توجد ملفات "} />
        )}
      </div>
    </div>
  );
};

export default Pdfs;
