import { useEffect, useState } from "react";
import useUpload from "../hooks/useUpload";
import ButtonDelete from "../components/Button/ButtonDelete";
import Head from "../components/Head/Head";

const Sounds = () => {
  const [loading, setLoading] = useState(true);
  const { getFiles, audios, cdn, deleteFile } = useUpload();

  useEffect(() => {
    getFiles().finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative p-8 justify-center h-screen bg-[#1d2129]">
      {loading ? (
        <div className="text-white">جاري تحميل الملفات...</div>
      ) : (
        <div className="flex gap-4">
          {audios.length === 0 ? (
            <Head text={"لا توجد ملفات صوتية"} />
          ) : (
            audios.map((audio, index) => (
              <div
                key={index}
                className=" w-80 px-6 pt-4 pb-6  bg-white rounded-lg shadow-md mt-6 relative"
              >
                <div className="mb-4">
                  <audio controls className="w-full">
                    <source src={cdn + audio.name} />
                    المتصفح الخاص بك لا يدعم الصوت.
                  </audio>
                </div>
                <ButtonDelete
                  deleteFile={deleteFile}
                  file={audio}
                  className={"bottom-0.5 px-2 "}
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Sounds;
