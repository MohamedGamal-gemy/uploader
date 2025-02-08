const downloader = (fileUrl, fileName, event) => {
  event.preventDefault();

  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export default downloader;
