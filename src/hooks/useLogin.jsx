import { useEffect, useState } from "react";
import supabase from "../supabase/db";

const useLogin = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false); // لإدارة حالة تحميل عملية الدخول
  const [errorMessage, setErrorMessage] = useState(""); // لإظهار رسائل الخطأ

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // دالة لتسجيل الخروج
  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setErrorMessage("Error signing out: " + error.message);
    }
    setLoading(false);
  };

  return { handleLogout, session, loading };
};

export default useLogin;
