import { useState, useEffect, useContext } from "react";
import useUpload from "../hooks/useUpload";
import ButtonDelete from "../components/Head/Button/ButtonDelete";
import useLogin from "../hooks/useLogin";
import CommentModal from "../utils/CommentModal";
import { MessageCircle } from "lucide-react";
import { AdminEmailContext } from "../utils/AdminEmailContext ";

const Images = () => {
  const { session } = useLogin();
  const { getFiles, images, cdn, deleteFile } = useUpload();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showImage, setShowImage] = useState("");

  useEffect(() => {
    getFiles().finally(() => setLoading(false));
  }, []);
  const [imgName, setImgName] = useState(null);
  const [imgId, setImgId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  //
  const { adminEmail } = useContext(AdminEmailContext);

  return (
    <>
      {openModal && (
        <CommentModal
          file={cdn + imgName}
          typeFile={"image"}
          idFile={imgId}
          openModal={setOpenModal}
        />
      )}
      {modal && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-30"
          onClick={() => setModal(false)}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <div className="relative z-50 p-4">
              <img
                className="max-w-[90wh] max-h-[90vh] object-cover"
                src={showImage}
                alt="Modal View"
              />
              <span
                className="absolute top-4 right-4 text-3xl text-white font-bold cursor-pointer
                 bg-[#c0bebe] rounded-full w-10 h-10 flex items-center justify-center
                  transition-all duration-300 hover:bg-red-500"
                onClick={() => setModal(false)}
              >
                &times;
              </span>
            </div>
          </div>
        </div>
      )}
      {loading ? (
        <p className="text-2xl  text-white">Loading...</p>
      ) : (
        <div className="p-8 relative z-20 bg-[#1d2129] min-h-screen">
          <div className="flex flex-wrap gap-6 justify-center">
            {images.length > 0 ? (
              images.map((image, index) => (
                <>
                  <div
                    key={index}
                    className="w-[300px] h-[480px] bg-[#d7d2d2]   rounded-lg
                   shadow-lg overflow-hidden 
                  transform hover:scale-105 transition-all duration-300"
                  >
                    <img
                      onClick={() => {
                        setShowImage(cdn + image.name);
                        setModal(true);
                      }}
                      src={cdn + image.name}
                      alt={image.name}
                      className="w-full h-[450px] object-cover rounded-lg cursor-pointer"
                    />
                    {session?.user.email === adminEmail && (
                      <ButtonDelete
                        deleteFile={deleteFile}
                        file={image}
                        className={"top-2 right-2"}
                      />
                    )}
                    <div>
                      <MessageCircle
                        className="w-5 h-5 cursor-pointer"
                        onClick={() => {
                          setOpenModal(true);
                          setImgId(image.id);
                          setImgName(image.name);
                        }}
                      />
                    </div>
                  </div>
                </>
              ))
            ) : (
              <p className="text-white">لا توجد صور</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Images;
