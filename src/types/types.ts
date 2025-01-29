export type TFileCategory = "images" | "videos" | "pdfs" | "others";
export type TSIdebarCategoryProps = {
    title: string;
    icon: React.ReactNode;
    itemsNumber: number;
    onClick: () => void;
    isActive?: boolean;
  };

  export type TFileObject = {
    name: string;
    id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata: Record<string, any>;
    created_at: string;
  };

  export interface IContext {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    files: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFiles: React.Dispatch<React.SetStateAction<any[]>>;
    selectedFile: TFileObject | null;
    setSelectedFile: React.Dispatch<React.SetStateAction<TFileObject | null>>;
    activeCategory: TFileCategory;
    setActiveCategory: React.Dispatch<React.SetStateAction<TFileCategory>>;
    getFiles: () => Promise<{ file: TFileObject; publicUrl: string }[] | undefined>;
  }
  