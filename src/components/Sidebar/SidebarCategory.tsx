
import { TSIdebarCategoryProps } from "../../types/types";

const SidebarCategory = ({
  title,
  icon,
  itemsNumber,
  onClick,
  isActive,
}: TSIdebarCategoryProps) => {
  return (
    <li
      onClick={onClick}
      key={title}
      className={`flex items-center justify-between my-4 py-4 px-4 text-fourth cursor-pointer transition-all duration-500 rounded hover:bg-secondary hover:text-third ${isActive ? "bg-secondary text-third" : ""}`}  
    >
      <div className="flex items-center gap-1.5">
        <span>{icon}</span>
        <span>{title}</span>
      </div>
      <div>
        <span>{itemsNumber}</span>
      </div>
    </li>
  );
};

export default SidebarCategory;
