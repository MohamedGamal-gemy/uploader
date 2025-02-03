import { useState } from "react";
import { toast } from "react-toastify";
import supabase from "../supabase/db";
import AnimatedShapes from "../components/AnimatedShapes";

const AuthForm = () => {
  const [files, setFiles] = useState([]); // تعديل لتخزين عدة ملفات
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      toast.error("من فضلك اختر ملفات");
      return;
    }

    setUploading(true);

    const uploadPromises = files.map((file) => {
      const fileName = `${Date.now()}-${file.name}`;
      return supabase.storage.from("files").upload(fileName, file);
    });

    try {
      const results = await Promise.all(uploadPromises);

      const error = results.find((result) => result.error);
      if (error) {
        setError(error.message);
        toast.error("حدث خطأ أثناء رفع الملفات");
      } else {
        toast.success("تم رفع الملفات بنجاح", {
          autoClose: 2000,
          closeButton: true,
          hideProgressBar: true,
        });
      }
    } catch (err) {
      setError(err.message);
      toast.error("حدث خطأ غير متوقع");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files)); // تغيير الملفات إلى مصفوفة
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-[#171825bc]">
      <div className="absolute right-4 top-4 w-[180px] h-[380px] bg-[#1db2dd]  opacity-55 blur-[150px] "></div>
      <div className="absolute left-4 bottom-4 w-[180px] h-[380px] bg-[#1db2dd]  blur-[150px] opacity-55"></div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto bg-white p-6 rounded-lg shadow-md w-[260px] sm:w-[350px]"
      >
        <div className="mb-5">
          <label
            htmlFor="file"
            className="block mb-2 font-semibold text-gray-900 text-xl"
          >
            رفع الملفات
          </label>
          <input
            type="file"
            id="file"
            multiple
            onChange={handleFileChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          disabled={uploading}
          className={`w-full py-2 px-4 text-white font-semibold rounded-lg focus:outline-none focus:ring-4 ${
            uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300"
          }`}
        >
          {uploading ? "جاري الرفع..." : "رفع الملفات"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
