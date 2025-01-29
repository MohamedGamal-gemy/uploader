import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import useFiles from "../../hooks/useFiles";
import uploadFile from "../../supabase/uploadFiles";

const Dropzone = () => {
  const { files, setFiles } = useFiles();

  const onDrop = async (acceptedFiles: File[]) => {
    const uploadedFiles = await Promise.all(
      acceptedFiles.map(async (file) => {
        const uploadedFile = await uploadFile(file);
        return uploadedFile;
      })
    );

    const successfulUploads = uploadedFiles.filter((file) => file !== null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFiles((prevFiles: any) => [...prevFiles, ...successfulUploads]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "application/pdf": [],
    },
  });

  useEffect(() => {
    return () => {
      files.forEach((file: { preview: string; }) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);
  return (
    <div className="p-5 max-w-full mx-auto top-0 border-t-fourth border-t-[2px] w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-6 rounded-lg text-center cursor-pointer ${
          isDragActive
            ? "bg-blue-50 border-blue-400"
            : "bg-gray-100 border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          {isDragActive
            ? "قم بإفلات الملفات هنا..."
            : "اسحب الملفات هنا أو اضغط لاختيار الملفات"}
        </p>
      </div>
    </div>
  );
};

export default Dropzone;
