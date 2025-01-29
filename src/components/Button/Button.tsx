
import React from "react";
type TButtonProps = {
  icon: React.ReactNode;
  isRemove?: boolean;
  onClickFn: () => void;
};
const Button = ({ icon, isRemove = false, onClickFn }: TButtonProps) => {
  return (
    <button
      onClick={onClickFn}
      className={` text-white p-4 cursor-pointer absolute -right-5 -bottom-2 rounded-full w-[20px] h-[20px] flex items-center justify-center ${
        isRemove ? "bg-red-800 right-4" : "bg-third"
      } `}
    >
      <div>
        {icon}
      </div>
    </button>
  );
};

export default Button;
