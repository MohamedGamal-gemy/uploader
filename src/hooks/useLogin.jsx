import { useEffect, useState } from "react";
import supabase from "../supabase/db";

const useLogin = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
        setSession(null);
      } else {
        setSession(user ? { user } : null);
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setErrorMessage("No active session found.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
      setErrorMessage("Error signing out: " + error.message);
    } else {
      setSession(null);
    }

    setLoading(false);
  };

  return { handleLogout, session, loading, errorMessage };
};

export default useLogin;
