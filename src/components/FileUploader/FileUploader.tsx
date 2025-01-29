import React from "react";
import Dropzone from "../Dropzone/Dropzone";
import FilesPreview from "../FilesPreview/FilesPreview";

const FileUploader = () => {
  return (
    <div className="w-[80%] bg-secondary relative flex flex-col">
    
      <FilesPreview></FilesPreview>
      <Dropzone></Dropzone>
      
    </div>
  );
};

export default FileUploader;
