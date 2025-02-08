
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const ComplaintForm = () => {
  const [email, setEmail] = useState("");
  const [complaintText, setComplaintText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const adminEmail = "admin@example.com";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const emailParams = {
        to_name: "admin",
        from_name: email || "مجهول",
        message: complaintText,
        from_email: email || adminEmail,
      };

      await emailjs.send(
        "service_99i3zwb",
        "template_ock2rqi",
        emailParams,
        "D1dou86PRuZtZL9Ur"
      );

      toast.success("تم تقديم الشكوى بنجاح", { autoClose: 3000, hideProgressBar: true });
      setComplaintText("");
      setEmail("");
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast.error(`حدث خطأ أثناء تقديم الشكوى: ${error.message}`);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">نموذج الشكاوى</h2>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-1">البريد الإلكتروني:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="أدخل بريدك الإلكتروني"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="complaintText" className="block text-gray-700 mb-1">نص الشكوى:</label>
          <textarea
            id="complaintText"
            value={complaintText}
            onChange={(e) => setComplaintText(e.target.value)}
            placeholder="اكتب شكواك هنا"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubmitting ? "جاري الإرسال..." : "إرسال الشكوى"}
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;
