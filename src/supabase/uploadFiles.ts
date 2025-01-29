import supabase from "./db";

interface UploadedFile {
  name: string;
  url: string;
  preview: string;
}

const uploadFile = async (file: File): Promise<UploadedFile | null> => {
  try {
    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(`files/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Error uploading file:", error);
      return null;
    }

    
    const { data: publicUrlData } = supabase.storage
      .from("uploads")
      .getPublicUrl(data.path);

    return {
      name: file.name,
      url: publicUrlData.publicUrl,
      preview: URL.createObjectURL(file),
    };
  } catch (error) {
    console.error("Upload failed:", error);
    return null;
  }
};

export default uploadFile;