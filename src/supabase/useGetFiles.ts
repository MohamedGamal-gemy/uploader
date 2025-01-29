
import supabase from "./db";

const useGetFiles = async () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  try {
    const { data, error } = await supabase.storage
      .from("uploads")
      .list("files", { limit: 100, offset: 0 });

    if (error) {
      console.error("Error fetching files:", error);
      return;
    }

    console.log(data);

    const filesWithUrls = data.map((file) => {
      const { data: publicData } = supabase.storage
        .from("uploads")
        .getPublicUrl(`files/${file.name}`);

      return { file, publicUrl: publicData?.publicUrl };
    });

 
    return filesWithUrls;
  } catch (error) {
    console.error("Failed to fetch files:", error);
  }
};

export default useGetFiles;
