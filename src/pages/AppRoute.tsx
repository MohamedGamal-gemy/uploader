import {
  Link,
  Navigate,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import SideLeft from "../components/Sidebar/SideLeft";
import Videos from "./Videos";
import ComplaintForm from "./ComplaintForm";
import Sounds from "./Sounds";
import Images from "./Images";
import Pdfs from "./Pdfs";
import Home from "./Home";
import { ToastContainer } from "react-toastify";
import AdminPage from "./Admin";
import Modal from "../components/Modal/Modal";
import useLogin from "../hooks/useLogin";
// import AdminPage from "./Admin";

const AppRoute = () => {
  const navigate = useNavigate();
  const { session } = useLogin();
  console.log(session?.user.email);
  return (
    <div className="flex  ">
      <SideLeft />
      <div className=" flex-1 bg-slate-950 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Videos" element={<Videos />} />
          <Route path="/complaint" element={<ComplaintForm />} />
          <Route path="/sound" element={<Sounds />} />
          <Route path="/images" element={<Images />} />
          <Route path="/pdfs" element={<Pdfs />} />
         
          {/* mohamedelnagg@gmail.com */}

          {session?.user.email === "mohamedelnagg@gmail.com" && (
            <Route path="/admin" element={<AdminPage />} />
          )}

          <Route path="/modal" element={<Modal />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AppRoute;
