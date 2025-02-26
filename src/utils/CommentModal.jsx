import { memo, useEffect, useState } from "react";
import useComments from "../hooks/useComments";
import useLogin from "../hooks/useLogin";
import useAdmin from "../hooks/useAdmin";
import { File } from "lucide-react";

const CommentModal = memo(({ namefile, file, typeFile, idFile, openModal }) => {
  const { session } = useLogin();
  const {
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
  } = useComments(idFile);

  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, [idFile]);

  const handleAdd = () => {
    if (comment.trim() !== "") {
      handleAddComment(comment, session);
      setComment("");
    }
  };

  const handleEdit = (commentId, currentText) => {
    setEditingCommentId(commentId);
    setEditText(currentText);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && comment.trim() !== "") {
      handleAdd();
    }
  };

  return (
    <div className="fixed w-[90%] md:w-[700px] h-[90%]  rounded-2xl left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-40 bg-white p-6 shadow-lg overflow-y-auto">
      <span
        className="absolute right-6 top-6 cursor-pointer text-2xl text-red-400 hover:text-red-600 transition-colors"
        onClick={() => openModal(false)}
      >
        ×
      </span>

      <div className="flex flex-col justify-center items-center">
        {typeFile === "image" && (
          <div className="h-[30vh] w-full">
            <img
              className="w-full h-full object-contain rounded-lg"
              src={file}
              alt="File"
            />
          </div>
        )}
        {typeFile === "pdf" && (
          <div className="mb-4 flex flex-col justify-center items-center">
            <File className="text-red-500" size={80} />
            <p>{namefile}</p>
          </div>
        )}
        {typeFile === "sound" && (
          <div className="w-80">
            <audio controls className="w-full my-4">
              <source src={file} />
              المتصفح الخاص بك لا يدعم الصوت.
            </audio>
          </div>
        )}
        {typeFile === "video" && (
          <div className="w-[300px] h-[200px]">
            <video
              src={file}
              controls
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      <div className="flex gap-2 items-center mt-6">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyPress={handleKeyPress}
          type="text"
          className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="أدخل تعليقك هنا"
        />
        <button
          disabled={loading || comment.trim() === ""}
          onClick={handleAdd}
          className="bg-blue-500 w-36 h-12 cursor-pointer text-white rounded-lg transition-all hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {loading ? "جاري الإرسال..." : "إرسال"}
        </button>
      </div>

      <div className="mt-6 h-[250px] overflow-y-auto">
        <h3 className="font-bold text-lg mb-4">التعليقات:</h3>
        <ul className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <li
                key={comment.id}
                className="border-b flex justify-between items-center p-2 bg-slate-100 rounded-lg"
              >
                {editingCommentId === comment.id ? (
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="border p-2 rounded-lg w-full"
                  />
                ) : (
                  <p className="text-sm">
                    <strong>{comment.email}:</strong> {comment.text_comment}
                  </p>
                )}
                {session?.user?.email === comment.email && (
                  <div className="flex gap-2">
                    {editingCommentId === comment.id ? (
                      <button
                        onClick={() =>
                          handleEditComment(comment.id, editText, session)
                        }
                        className="text-green-500 hover:bg-green-400 transition cursor-pointer bg-green-300 p-2 rounded-full"
                      >
                        حفظ
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleEdit(comment.id, comment.text_comment)
                        }
                        className="text-blue-500 hover:bg-blue-400 transition cursor-pointer bg-blue-300 p-2 rounded-full"
                      >
                        تعديل
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteComment(comment.id, session)}
                      className="text-red-500 hover:bg-red-400 transition cursor-pointer bg-red-300 p-2 rounded-full"
                    >
                      حذف
                    </button>
                  </div>
                )}
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500">لا توجد تعليقات بعد.</p>
          )}
        </ul>
      </div>
    </div>
  );
});

export default CommentModal;
