import { useState } from "react";
import supabase from "../supabase/db";
import { toast } from "react-toastify";

const useUpload = () => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [audios, setAudios] = useState([]);

  const cdn =
    "https://mcmokmrnrabnshsjqpjs.supabase.co/storage/v1/object/public/files/";

  //
  const deleteFile = async (fileName) => {
    try {
      const { error } = await supabase.storage.from("files").remove([fileName]);
      if (error) {
        toast.error("حدث خطأ أثناء الحذف ");
        return;
      }
      toast.success("تم الحذف  بنجاح", {
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: true,
      });
      getFiles();
    } catch (error) {
      toast.error("حدث خطأ أثناء الحذف");
    }
  };

  //
  const getFiles = async () => {
    const { data, error } = await supabase.storage.from("files").list("");
    if (data) {
      const imageFiles = [];
      const videoFiles = [];
      const pdfFiles = [];
      const audioFiles = [];

      data.forEach((file) => {
        console.log("file", file.metadata.mimetype);
        if (file.metadata.mimetype.startsWith("image/")) {
          imageFiles.push(file);
        } else if (file.metadata.mimetype.startsWith("video/")) {
          videoFiles.push(file);
        } else if (file.metadata.mimetype.startsWith("application/pdf")) {
          pdfFiles.push(file);
        } else if (file.metadata.mimetype.startsWith("audio/")) {
          audioFiles.push(file);
        }
      });

      setImages(imageFiles);
      setVideos(videoFiles);
      setPdfs(pdfFiles);
      setAudios(audioFiles);
    } else {
      console.log(error);
    }
  };

  return {
    getFiles,
    images,
    videos,
    pdfs,
    audios,
    cdn,
    deleteFile,
  };
};

export default useUpload;
