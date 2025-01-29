export const downloader = (
  fileUrl: string,
  fileName: string,
  event: React.MouseEvent
) => {
  event.preventDefault(); // منع تحميل الصفحة
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
