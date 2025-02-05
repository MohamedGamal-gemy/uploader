import supabase from "../supabase/db";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useLogin from "../hooks/useLogin";
import useAdmin from "../hooks/useAdmin";
import { useEffect } from "react";
import AppRoute from "./AppRoute";

const Login = () => {
  const { session, handleLogout, loading } = useLogin();
  const { userEmail, fetchEmails } = useAdmin();

  const us = userEmail.find((e) => e.email.includes(session?.user?.email));

  useEffect(() => {
    fetchEmails();
  }, []);

  if (us?.email) {
    return (
      <div>
        <div className="bg-[#969da1] text-white flex h-14 justify-evenly items-center px-20">
          <h2 className="text-blue-900 text-xl">
            Welcome, {us?.email}
            {us?.email === "mohamedelnagg@gmail.com" ? " (Admin)" : " (user)"}
          </h2>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="cursor-pointer bg-amber-400 p-2 rounded-full hover:bg-amber-500 transition"
          >
            {loading ? "Logging out..." : "Log out"}
          </button>
        </div>
        <AppRoute />
      </div>
    );
  } else {
    return (
      <div className="w-[400px] mx-auto shadow-2xl p-4 mt-14">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google"]}
        />
      </div>
    );
  }
};

export default Login;
