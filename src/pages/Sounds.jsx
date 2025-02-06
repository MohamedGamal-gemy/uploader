import { useContext, useEffect, useState } from "react";
import useUpload from "../hooks/useUpload";
import ButtonDelete from "../components/Head/Button/ButtonDelete";
import Head from "../components/Head/Head";
import useLogin from "../hooks/useLogin";
import { MessageCircle } from "lucide-react";
import CommentModal from "../utils/CommentModal";
import { AdminEmailContext } from "../utils/AdminEmailContext ";

const Sounds = () => {
  const { session } = useLogin();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [audioName, setAudioName] = useState(null);
  const [audioId, setAudioId] = useState(null);

  const { getFiles, audios, cdn, deleteFile } = useUpload();

  useEffect(() => {
    getFiles().finally(() => setLoading(false));
  }, []);
  const { adminEmail } = useContext(AdminEmailContext);

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
                className="w-80 px-6 pt-4 pb-6 bg-white rounded-lg shadow-md mt-6 relative"
              >
                <div className="mb-4">
                  <audio controls className="w-full">
                    <source src={cdn + audio.name} />
                    المتصفح الخاص بك لا يدعم الصوت.
                  </audio>
                </div>
                {session?.user.email === adminEmail && (
                  <ButtonDelete
                    deleteFile={deleteFile}
                    file={audio}
                    className={"bottom-0.5 right-1 px-2 "}
                  />
                )}
                {openModal && (
                  <CommentModal
                    file={cdn + audio.name}
                    typeFile={"sound"}
                    idFile={audio.id}
                    openModal={setOpenModal}
                  />
                )}
                <MessageCircle
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => {
                    setOpenModal(true);
                    setAudioId(audio.id);
                    setAudioName(audio.name);
                  }}
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
