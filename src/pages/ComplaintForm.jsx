import React, { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const ComplaintForm = () => {
  const [email, setEmail] = useState("");
  const [complaintText, setComplaintText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const adminEmail = "admin@example.com"; // يمكن تعديل البريد الإلكتروني الإداري هنا

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const emailParams = {
        to_name: "admin", // يمكن تعديل الاسم المستلم
        from_name: email || "مجهول", // اسم المرسل (من البريد الإلكتروني المدخل أو "مجهول")
        message: complaintText, // نص الشكوى
        from_email: email || adminEmail, // البريد الإلكتروني المرسل منه (اختياري: من المستخدم أو adminEmail)
      };

      const response = await emailjs.send(
        // "service_2wze4r6", // معرف الخدمة
        "service_99i3zwb", // معرف الخدمة
        // "template_30143j8", // معرف القالب
        // "template_30143j8", // معرف القالب
        "template_ock2rqi", // معرف القالب
        emailParams, // المتغيرات التي سيتم إرسالها
        // "JuUzNyqdu7eQn3hpN" // معرف المستخدم (الخاص بك)
        "D1dou86PRuZtZL9Ur" // معرف المستخدم (الخاص بك)
      );

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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">البريد الإلكتروني:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="أدخل بريدك الإلكتروني"
          />
        </div>
        <div>
          <label htmlFor="complaintText">نص الشكوى:</label>
          <textarea
            id="complaintText"
            value={complaintText}
            onChange={(e) => setComplaintText(e.target.value)}
            placeholder="اكتب شكواك هنا"
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "جاري الإرسال..." : "إرسال الشكوى"}
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;
