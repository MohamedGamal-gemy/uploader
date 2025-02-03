import { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const ComplaintForm = () => {
  const [complaintText, setComplaintText] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const adminEmail = "admin@gmail.com";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const emailParams = {
        to_name: "admin",
        from_name: email || "مجهول",
        message: complaintText,
        from_email: adminEmail,
      };

      const response = await emailjs.send(
        "service_2wze4r6",
        "template_30143j8",
        emailParams,
        "JuUzNyqdu7eQn3hpN"
      );

      console.log("Email sent successfully:", response);
      toast.success("تم تقديم الشكوى بنجاح", {
        autoClose: 3000,
        hideProgressBar: true,
      });
      setComplaintText("");
      setEmail("");
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast.error(`حدث خطأ أثناء تقديم الشكوى: ${error.message}`);
    }

    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto mt-8"
    >
      <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
        تقديم الشكوى
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          نص الشكوى:
        </label>
        <textarea
          value={complaintText}
          onChange={(e) => setComplaintText(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={4}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          البريد الإلكتروني (اختياري):
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full p-3 mt-4 text-white rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? "جارٍ الإرسال..." : "تقديم الشكوى"}
      </button>
    </form>
  );
};

export default ComplaintForm;
