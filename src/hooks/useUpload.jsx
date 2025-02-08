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

  // دالة لتطهير اسم الملف
  const sanitizeFileName = (fileName) => {
    return fileName.replace(/[^a-zA-Z0-9._-]/g, "_"); // استبدال الرموز غير المسموح بها
  };

  // رفع الملف
  const uploadFile = async (file) => {
    const sanitizedFileName = sanitizeFileName(file.name); // تطهير اسم الملف

    // جلب قائمة الملفات الحالية للتحقق مما إذا كان الملف مرفوعًا مسبقًا
    const { data: existingFiles, error: fetchError } = await supabase.storage
      .from("files")
      .list("");

    if (fetchError) {
      toast.error("حدث خطأ أثناء التحقق من الملفات الموجودة");
      return;
    }

    // التحقق مما إذا كان الملف مرفوعًا مسبقًا
    const fileExists = existingFiles.some((f) => f.name === sanitizedFileName);

    if (fileExists) {
      toast.info("هذا الملف مضاف بالفعل!", {
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      });
      return;
    }

    // رفع الملف إذا لم يكن مرفوعًا مسبقًا
    const { error: uploadError } = await supabase.storage
      .from("files")
      .upload(sanitizedFileName, file);

    if (uploadError) {
      toast.error("حدث خطأ أثناء رفع الملف");
    } else {
      toast.success("تم رفع الملف بنجاح");
      getFiles(); // تحديث القائمة بعد الرفع
    }
  };

  // حذف الملف
  const deleteFile = async (fileName) => {
    try {
      const { error } = await supabase.storage.from("files").remove([fileName]);
      if (error) {
        toast.error("حدث خطأ أثناء الحذف ");
        return;
      }
      toast.success("تم الحذف بنجاح", {
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: true,
      });
      getFiles();
    } catch (error) {
      toast.error("حدث خطأ أثناء الحذف");
    }
  };

  // جلب الملفات
  const getFiles = async () => {
    const { data, error } = await supabase.storage.from("files").list("");
    if (data) {
      const imageFiles = [];
      const videoFiles = [];
      const pdfFiles = [];
      const audioFiles = [];

      data.forEach((file) => {
        if (file.metadata.mimetype.startsWith("image/")) {
          imageFiles.push(file);
        } else if (file.metadata.mimetype.startsWith("video/")) {
          videoFiles.push(file);
        } else if (file.metadata.mimetype.startsWith("audio/")) {
          audioFiles.push(file);
        } else if (file.metadata.mimetype.startsWith("application")) {
          pdfFiles.push(file);
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
    uploadFile, // إضافة دالة رفع الملف هنا
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
