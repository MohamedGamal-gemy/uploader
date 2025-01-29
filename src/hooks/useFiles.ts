import { useContext } from "react";
import filesContext from "../context/filesContext";
type FileCategory = "images" | "videos" | "pdfs" | "others";
const useFiles = () => {
  const {
    files,
    setFiles,
    setSelectedFile,
    activeCategory,
    setActiveCategory,
    getFiles
  } = useContext(filesContext) ?? {
    files: [],
    setFiles: () => {},
    setSelectedFile: () => {},
    activeCategory: "images",
    setActiveCategory: () => {},
    getFiles: () => {},
  };
  
  
  const filteredFiles = files.filter((file) => {
    const type = file.file.metadata?.mimetype.toLowerCase();
    switch (activeCategory) {
      case "images":
        return type.startsWith("image/");
      case "videos":
        return type.startsWith("video/");
      case "pdfs":
        return type === "application/pdf";
      case "others":
        return (
          !type.startsWith("image/") &&
          !type.startsWith("video/") &&
          type !== "application/pdf"
        );
    }
  });

  const getCategoryCount = (categoryId: FileCategory) => {
    return files.filter((file) => {
      const type = file.file.metadata?.mimetype.toLowerCase();
      switch (categoryId) {
        case "images":
          return type.startsWith("image/");
        case "videos":
          return type.startsWith("video/");
        case "pdfs":
          return type === "application/pdf";
        case "others":
          return (
            !type.startsWith("image/") &&
            !type.startsWith("video/") &&
            type !== "application/pdf"
          );
      }
    }).length;
  };

  

  return {
    files,
    setFiles,
    setSelectedFile,
    activeCategory,
    setActiveCategory,
    filteredFiles,
    getCategoryCount,
    getFiles
  };
};

export default useFiles;
