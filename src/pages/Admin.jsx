import { useContext, useEffect, useState } from "react";
import useAdmin from "../hooks/useAdmin";
import { useNavigate } from "react-router-dom";
import { AdminEmailContext } from "../utils/AdminEmailContext ";
import useLogin from "../hooks/useLogin";

const Admin = () => {
  const { deleteEmail, fetchEmails, userEmail } = useAdmin();
  const [loading, setLoading] = useState(false);
  const [loadingElement, setLoadingElement] = useState(null);
  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  const navigate = useNavigate();

  const handleDelete = async (item) => {
    setLoading(true);
    setLoadingElement(item);
    await deleteEmail(item);
    setLoading(false);
  };
  const { adminEmail } = useContext(AdminEmailContext);
  const { session } = useLogin();

  return (
    <div className="relative overflow-x-auto shadow-lg sm:rounded-lg p-6 ">
      {adminEmail.includes(session?.user?.email) && (
        <>
          <button
            onClick={() => navigate("/modal")}
            className="bg-blue-500 cursor-pointer hover:bg-blue-600 transition text-white px-4 py-2 rounded-md"
          >
            Add Email
          </button>

          <table className="w-[800px] mx-auto mt-3 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Control
                </th>
              </tr>
            </thead>
            <tbody>
              {userEmail?.map((admin, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {admin.email}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(admin.email)}
                      className={`font-medium font-sans bg-red-500 w-10 text-white cursor-pointer
                     p-2 rounded hover:bg-red-600 transition duration-300 ease-in-out 
                      
`}
                      disabled={loading}
                    >
                      {loading && loadingElement === admin.email ? (
                        <div
                          className="animate-spin border-t-2 border-white w-5 h-5
                   rounded-full mx-auto"
                        ></div>
                      ) : (
                        "X"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Admin;
