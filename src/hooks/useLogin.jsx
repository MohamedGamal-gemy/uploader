import { useEffect, useState } from "react";
import supabase from "../supabase/db";

const useLogin = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // جلب الجلسة الحالية عند التحميل
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    // الاشتراك في التغيرات على الجلسة
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    setLoading(true);

    // التحقق من الجلسة قبل تسجيل الخروج
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setErrorMessage("No active session found.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
      setErrorMessage("Error signing out: " + error.message);
    } else {
      setSession(null); // إعادة تعيين الجلسة يدويًا
    }

    setLoading(false);
  };

  return { handleLogout, session, loading, errorMessage };
};

export default useLogin;
