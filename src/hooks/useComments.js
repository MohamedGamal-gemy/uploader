import { useState, useEffect } from "react";
import supabase from "../supabase/db";
import { toast } from "react-toastify";

const useComments = (idFile) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editText, setEditText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("id, email, text_comment, id_file")
        .eq("id_file", idFile);

      if (error) throw error;
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("حدث خطأ أثناء جلب التعليقات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idFile) {
      fetchComments();
    }
  }, [idFile]);

  const handleAddComment = async (comment, session) => {
    if (comment.trim() === "") {
      toast.error("يرجى إدخال تعليق");
      return;
    }

    if (!session) {
      toast.error("لم يتم العثور على الجلسة، يرجى تسجيل الدخول");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("comments")
        .insert({
          email: session.user.email,
          text_comment: comment,
          id_file: idFile,
        })
        .select();

      if (error) throw error;

      toast.success("تم إضافة التعليق بنجاح", {
        hideProgressBar: true,
        autoClose: 2000,
      });
      setComments([data[0], ...comments]);
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("حدث خطأ أثناء إرسال التعليق");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId, session) => {
    if (!session) {
      toast.error("لم يتم العثور على الجلسة، يرجى تسجيل الدخول");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId);

      if (error) throw error;

      toast.success("تم حذف التعليق بنجاح", {
        hideProgressBar: true,
        autoClose: 2000,
      });

      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("حدث خطأ أثناء حذف التعليق");
    } finally {
      setLoading(false);
    }
  };

  const handleEditComment = async (commentId, editText, session) => {
    if (!session) {
      toast.error("لم يتم العثور على الجلسة، يرجى تسجيل الدخول");
      return;
    }

    if (editText.trim() === "") {
      toast.error("يرجى إدخال نص التعليق");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("comments")
        .update({ text_comment: editText })
        .eq("id", commentId);

      if (error) throw error;

      toast.success("تم تعديل التعليق بنجاح", {
        hideProgressBar: true,
        autoClose: 2000,
      });

      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, text_comment: editText }
            : comment
        )
      );
      setEditingCommentId(null);
      setEditText("");
    } catch (error) {
      console.error("Error editing comment:", error);
      toast.error("حدث خطأ أثناء تعديل التعليق");
    } finally {
      setLoading(false);
    }
  };

  return {
    comments,
    fetchComments,
    handleAddComment,
    handleDeleteComment,
    handleEditComment,
    editText,
    setEditText,
    editingCommentId,
    setEditingCommentId,
    loading,
  };
};

export default useComments;
