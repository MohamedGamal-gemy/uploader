import { useState } from "react";

const ButtonDelete = ({ deleteFile, file, className }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await deleteFile(file.name);
    setLoading(false);
  };
  // top-2 right-2
  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className={`absolute ${className} p-1 rounded-full 
        cursor-pointer  bg-red-400 hover:bg-red-600 text-white `}
    >
      {loading ? <span className="loader">Loading...</span> : "حذف"}
    </button>
  );
};

export default ButtonDelete;
