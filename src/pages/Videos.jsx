import { useEffect, useState } from "react";
import useUpload from "../hooks/useUpload";
import { Play } from "lucide-react"; // استيراد الأيقونة
import Head from "../components/Head/Head";
import ButtonDelete from "../components/Head/Button/ButtonDelete";

const Videos = () => {
  const { getFiles, videos, cdn, deleteFile } = useUpload();
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFiles().finally(() => setLoading(false));
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div className="p-8 bg-[#1d2129] h-screen">
      {loading ? (
        <p className="text-2xl text-white">loading...</p>
      ) : (
        // )}
        <div className="flex flex-wrap gap-8 ">
          {videos.length > 0 ? (
            videos.map((video, index) => (
              <div
                key={index}
                className="relative w-[400px] h-[300px] p-4 bg-[#f8f5f5] rounded-lg shadow-lg
                 overflow-hidden pt-10
                transform hover:scale-105 transition-all duration-300"
              >
                {/* الخلفية الضبابية */}
                {/* <div className="absolute inset-0 bg-black opacity-40"></div> */}

                {/* أيقونة المشغل */}
                {!isPlaying && (
                  <div
                    className="absolute inset-0 flex items-center justify-center text-white
                   opacity-70 hover:opacity-100 transition-all duration-300"
                  >
                    <Play className="w-16 h-16" />
                  </div>
                )}

                {/* الفيديو */}
                <video
                  src={cdn + video.name}
                  controls
                  className="w-full h-full object-cover rounded-lg"
                  onPlay={handlePlay}
                  onPause={handlePause}
                />
                <ButtonDelete
                  deleteFile={deleteFile}
                  file={video}
                  className={"top-0.5 right-2"}
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
