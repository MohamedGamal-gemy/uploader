import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // استيراد التوجيه
import supabase from "../supabase/db";

const useLogin = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // استخدم التوجيه

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (!session) {
          navigate("/login"); // إعادة التوجيه عند تسجيل الخروج
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe?.();
    };
  }, [navigate]);

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setErrorMessage("Error signing out: " + error.message);
    } else {
      setSession(null); // إعادة تعيين الجلسة إلى null
    }
    setLoading(false);
  };

  return { handleLogout, session, loading, errorMessage };
};

export default useLogin;
