import { useState, useRef } from "react";
import { FaCloudUploadAlt, FaImage, FaTimes } from "react-icons/fa";

const DropZone = ({ onFileSelected }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const handleFiles = (file) => {
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onFileSelected(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const clearSelection = (e) => {
    e.stopPropagation();
    setPreview(null);
    onFileSelected(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-md mb-8">
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={(e) => handleFiles(e.target.files[0])}
      />
      <div
        className={`
          relative flex flex-col items-center justify-center w-full h-64 
          rounded-xl border-2 border-dashed transition-all cursor-pointer
          ${
            dragActive
              ? "border-blue-500 bg-blue-500/10"
              : "border-slate-600 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800"
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
      >
        {preview ? (
          <div className="relative w-full h-full p-2">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain rounded-lg"
            />
            <button
              onClick={clearSelection}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
            >
              <FaTimes />
            </button>
          </div>
        ) : (
          <div className="text-center p-6 pointer-events-none">
            <FaCloudUploadAlt
              className={`text-6xl mb-4 mx-auto ${
                dragActive ? "text-blue-400" : "text-slate-500"
              }`}
            />
            <p className="text-slate-300 font-medium text-lg">
              {dragActive ? "Drop it like it's hot!" : "Click to Upload Image"}
            </p>
            <p className="text-slate-500 text-sm mt-2">
              (JPG, PNG, JPEG supported)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropZone;
