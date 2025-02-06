import {
  AudioLines,
  CompassIcon,
  FileText,
  HomeIcon,
  ImageIcon,
  PersonStanding,
  Video,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const SideLeft = () => {
  const category = [
    {
      path: "/home",
      id: "home",
      label: "Home",
      icon: <HomeIcon className="w-5 h-5" />,
    },
    {
      path: "/sound",
      id: "sound",
      label: "Sounds",
      icon: <AudioLines className="w-5 h-5" />,
    },
    {
      path: "/images",
      id: "images",
      label: "Images",
      icon: <ImageIcon className="w-5 h-5" />,
    },
    {
      path: "/videos",
      id: "videos",
      label: "Videos",
      icon: <Video className="w-5 h-5" />,
    },
    {
      path: "/pdfs",
      id: "pdfs",
      label: "PDFs",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      path: "/complaint",
      id: "complaint",
      label: "Complaint",
      icon: <CompassIcon className="w-5 h-5" />,
    },
    {
      path: "/admin",
      id: "admin",
      label: "Admin",
      icon: <PersonStanding className="w-5 h-5" />,
    },
  ];

  return (
    <div className="h-screen w-20   sm:w-64 bg-secondary   text-white p-4 sticky top-0  z-20 overflow-hidden">
      <div className="absolute bg-[#1db2dd] opacity-50 left-2 top-4 w-[100px]  blur-[150px] h-[500px]"></div>
      <div className="relative">
        <div className=" sm:w-40 sm:h-40  mx-auto w-16  h-16 mb-6">
          <img
            className=" w-full h-full "
            src="./63e668ce-9fa5-457f-9736-aaa152fe5932.jfif"
            alt=""
          />
        </div>
        <ul className="flex flex-col gap-5 ">
          {category.map((e) => (
            <li key={e.id}>
              <NavLink
                to={e.path}
                className={"text-third block p-2 rounded transition"}
              >
                <div className="felx justify-between">
                  <div className="flex  items-center gap-3">
                    <span className="">{e.icon}</span>
                    <span className="text-xl  hidden sm:inline-block">
                      {e.label}
                    </span>
                  </div>
                </div>
                <div>
                  <span>{e.number}</span>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideLeft;
