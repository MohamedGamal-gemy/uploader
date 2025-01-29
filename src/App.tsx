import { useContext } from "react";
import FileUploader from "./components/FileUploader/FileUploader";
import Sidebar from "./components/Sidebar/Sidebar";
import filesContext from "./context/filesContext";
import Modal from "./components/Modal/Modal";

function App() {
  const { setSelectedFile, selectedFile } = useContext(filesContext) ?? {
    selectedFile: null,
    setSelectedFile: () => {},
  };
  return (
    <>
      {selectedFile && (
        <Modal file={selectedFile} onClose={() => setSelectedFile(null)} />
      )}
      <div className="flex">
        <Sidebar></Sidebar>
        <FileUploader></FileUploader>
      </div>
    </>
  );
}

export default App;
