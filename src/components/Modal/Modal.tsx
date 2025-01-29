import { FileIcon, X } from "lucide-react";

interface FileItem {
  file: {
    name: string;
    id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata: Record<string, any>;
    created_at: string;
  };
  publicUrl: string;
}

interface ModalProps {
  file: FileItem;
  onClose: () => void;
}

function Modal({ file, onClose }: ModalProps) {
  console.log(file);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="relative w-[90vw] h-[90vh] bg-white rounded-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {file.file.metadata?.mimetype.startsWith("image/") ? (
          <img
            src={file.publicUrl}
            alt={file.file.name}
            className="w-full h-full object-contain rounded-lg"
          />
        ) : file.file.metadata?.mimetype === "application/pdf" ? (
          <iframe
            src={`https://docs.google.com/gview?url=${encodeURIComponent(
              file.publicUrl
            )}&embedded=true`}
            className="w-full h-full rounded-lg"
            title="PDF Viewer"
          />
        ) : file.file.metadata?.mimetype.startsWith("video/") ? (
          <video
            src={file.publicUrl}
            controls
            className="w-full h-full object-contain rounded-lg"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FileIcon className="w-24 h-24 text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
