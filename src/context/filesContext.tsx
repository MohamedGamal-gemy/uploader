import { useState, createContext } from "react";
import supabase from "../supabase/db";
import { TFileObject, TFileCategory } from "../types/types";
import { Context } from "vm";




const filesContext = createContext<Context | null>(null);

const FilesContextProvider = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<TFileObject | null>(null);
  const [activeCategory, setActiveCategory] = useState<TFileCategory>('images');
  
  const getFiles = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
  
    try {
      const { data, error } = await supabase.storage
        .from("uploads")
        .list("files", { limit: 100, offset: 0 });
  
      if (error) {
        console.error("Error fetching files:", error);
        return;
      }
  
     
  
      const filesWithUrls = data.map((file) => {
        const { data: publicData } = supabase.storage
          .from("uploads")
          .getPublicUrl(`files/${file.name}`);
  
        return { file, publicUrl: publicData?.publicUrl };
      });
  
      setFiles(filesWithUrls);
      return filesWithUrls;
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  };
  return (
    <filesContext.Provider
      value={{ files, setFiles, selectedFile, setSelectedFile,activeCategory, setActiveCategory,getFiles }}
    >
      {children}
    </filesContext.Provider>
  );
};

export { FilesContextProvider };
// eslint-disable-next-line react-refresh/only-export-components
export default filesContext;
