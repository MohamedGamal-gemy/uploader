// const handleSubmit = async (event) => {
//   event.preventDefault();
//   setIsSubmitting(true);
//
//   try {
//     const emailParams = {
//       to_name: "admin", // يمكن تعديل الاسم المستلم
//       from_name: email || "مجهول", // اسم المرسل (من البريد الإلكتروني المدخل أو "مجهول")
//       message: complaintText, // نص الشكوى
//       from_email: email || adminEmail, // البريد الإلكتروني المرسل منه (اختياري: من المستخدم أو adminEmail)
//       // to_email: "gemy04609@gmail.com", // البريد الإلكتروني الجديد الذي سيتم إرسال الشكوى إليه
//     };
//
//     const response = await emailjs.send(
//       // "service_2wze4r6", // معرف الخدمة
//       "service_w78582n", // معرف الخدمة
//       // "template_30143j8", // معرف القالب
//       "template_wpblgun", // معرف القالب
//       emailParams, // المتغيرات التي سيتم إرسالها
//       // "JuUzNyqdu7eQn3hpN" // معرف المستخدم (الخاص بك)
//       "D1dou86PRuZtZL9Ur" // معرف المستخدم (الخاص بك)
//     );
//
//     toast.success("تم تقديم الشكوى بنجاح", {
//       autoClose: 3000,
//       hideProgressBar: true,
//     });
//
//     setComplaintText("");
//     setEmail("");
//   } catch (error) {
//     console.error("Error submitting complaint:", error);
//     toast.error(`حدث خطأ أثناء تقديم الشكوى: ${error.message}`);
//   }
//
//   setIsSubmitting(false);
// };

//

const handleSubmit = async (event) => {
  event.preventDefault();
  setIsSubmitting(true);

  try {
    const emailParams = {
      to_name: "Admin", // اسم المستلم (على سبيل المثال، "Admin")
      from_name: email || "مجهول", // اسم المرسل (إذا لم يكن هناك بريد إلكتروني يتم استخدام "مجهول")
      message: complaintText, // نص الشكوى
      from_email: email || adminEmail, // البريد الإلكتروني للمرسل (إما البريد الذي أدخله المستخدم أو بريد مسؤول)
    };

    const response = await emailjs.send(
      "service_w78582n", // معرف الخدمة في EmailJS
      "template_wpblgun", // معرف القالب في EmailJS
      emailParams, // المتغيرات التي سيتم إرسالها إلى القالب
      "D1dou86PRuZtZL9Ur" // معرف المستخدم الخاص بك في EmailJS
    );

    toast.success("تم تقديم الشكوى بنجاح", {
      autoClose: 3000,
      hideProgressBar: true,
    });

    // إعادة تعيين النصوص المدخلة بعد الإرسال
    setComplaintText("");
    setEmail("");
  } catch (error) {
    console.error("Error submitting complaint:", error);
    toast.error(`حدث خطأ أثناء تقديم الشكوى: ${error.message}`);
  }

  setIsSubmitting(false);
};
