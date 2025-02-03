import { useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import { useNavigate } from "react-router-dom";

const Modal = () => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { addEmail } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    if (inputValue) {
      await addEmail(inputValue);
    }
    setLoading(false);
    navigate("/admin");
  };
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center 
    items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 w-[400px]"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Add Email</h2>
        <input
          required
          type="email"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Enter email"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="flex justify-between">
          <button
            className="bg-gray-300 hover:bg-red-500 hover:text-white cursor-pointer transition text-gray-800 py-2 px-4 rounded-md"
            onClick={() => navigate("/admin")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`bg-blue-500 cursor-pointer hover:bg-blue-600 transition
               text-white py-2 px-4 rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin border-t-2 border-white w-5 h-5 rounded-full
               mx-auto"></div> 
            ) : (
              "Add"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
