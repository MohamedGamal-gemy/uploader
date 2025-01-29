import React from "react";
import SidebarCategory from "./SidebarCategory";
import { FileIcon, FileText, ImageIcon, Video } from "lucide-react";

import useFiles from "../../hooks/useFiles";
import { TFileCategory } from "../../types/types";

const Sidebar = () => {
  const { activeCategory, setActiveCategory, getCategoryCount } = useFiles();

  const categories: {
    id: TFileCategory;
    label: string;
    icon: React.ReactNode;
  }[] = [
    { id: "images", label: "Images", icon: <ImageIcon className="w-5 h-5" /> },
    { id: "videos", label: "Videos", icon: <Video className="w-5 h-5" /> },
    { id: "pdfs", label: "PDFs", icon: <FileText className="w-5 h-5" /> },
    { id: "others", label: "Others", icon: <FileIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="bg-primary w-[20%] h-screen p-4">
      <h1 className="text-4xl font-bold text-third">Categories</h1>
      <ul className="mt-4">
        {categories.map((category) => (
          <SidebarCategory
            isActive={category.id === activeCategory}
            onClick={() => setActiveCategory(category.id)}
            key={category.id}
            title={category.label}
            icon={category.icon}
            itemsNumber={getCategoryCount(category.id)}
          ></SidebarCategory>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
