import { toast } from "react-toastify";
import supabase from "../supabase/db";
import { useState } from "react";

const useAdmin = () => {
  const [userEmail, setUserEmail] = useState([]);

  const fetchEmails = async () => {
    const { data, error } = await supabase.from("users").select("email");
    if (error) {
      toast.error(`Error fetching emails: ${error.message}`, {
        autoClose: 3000,
        hideProgressBar: true,
      });
    } else {
      setUserEmail(data);
      return data;
    }
  };

  const addEmail = async (email) => {
    const { error } = await supabase.from("users").insert([{ email }]);

    if (error) {
      toast.error(`Error adding email: ${error.message}`, {
        autoClose: 3000,
        hideProgressBar: true,
      });
    } else {
      toast.success(`Email added successfully`, {
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  const deleteEmail = async (email) => {
    const { error } = await supabase.from("users").delete().match({ email });

    if (error) {
      toast.error("Error deleting email", {
        autoClose: 3000,
        hideProgressBar: true,
      });
    } else {
      toast.success("Email deleted successfully", {
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  return { deleteEmail, addEmail, fetchEmails, userEmail };
};

export default useAdmin;
