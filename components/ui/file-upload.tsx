import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload, IconTrash } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 20, y: -20, opacity: 0.9 }
};

const secondaryVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
};

export const MediaUpload = ({
  onChange
}: {
  onChange?: (files: File[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 
                       'video/mp4', 'video/webm', 'video/ogg'];
    return validTypes.includes(file.type);
  };

  const handleFileChange = (newFiles: File[]) => {
    const validFiles = newFiles.filter(validateFile);
  
    // Ensure no duplicate files are added (by name and size as a basic check)
    const uniqueFiles = validFiles.filter(
      (newFile) =>
        !files.some(
          (existingFile) =>
            existingFile.name === newFile.name && existingFile.size === newFile.size
        )
    );
  
    if (uniqueFiles.length) {
      setFiles((prevFiles) => [...prevFiles, ...uniqueFiles]); // Append new files
      onChange && onChange([...files, ...uniqueFiles]); // Notify parent
    }
  };
  
  
  const handleDelete = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: true,
    noClick: true,
    onDrop: handleFileChange,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
      'video/*': ['.mp4', '.webm', '.ogg']
    },
    onDropRejected: (error) => {
      console.log('Invalid file type:', error);
    },
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
          multiple
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
            Upload Media Files
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
            Drop your images or videos here, or click to upload
          </p>
          
          <div className="relative w-full mt-10 max-w-6xl mx-auto">
            {files.length > 0 && (
              <motion.div
                layout
                className="flex overflow-x-auto gap-4 pb-4"
              >
                {files.map((file, idx) => (
                  <motion.div
                    key={`file-${idx}`}
                    layoutId={`file-${idx}`}
                    className="flex-shrink-0 relative bg-white dark:bg-neutral-900 p-4 w-60 rounded-md shadow-sm"
                  >
                    <div className="w-full h-32 mb-2 rounded-md overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                      {file.type.startsWith('image/') ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={URL.createObjectURL(file)}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    
                    <div className="flex justify-between w-full items-center gap-2">
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs bg-neutral-100 dark:bg-neutral-800 rounded px-2 py-1">
                        {(file.size / (1024 * 1024)).toFixed(1)}MB
                      </p>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(idx);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <IconTrash size={16} />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            {!files.length && (
              <motion.div
                layoutId="upload-placeholder"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="relative z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md shadow-lg"
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center"
                  >
                    Drop files
                    <IconUpload className="h-4 w-4 mt-2" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const GridPattern = () => {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => (
          <div
            key={`${col}-${row}`}
            className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${
              (row * columns + col) % 2 === 0
                ? "bg-gray-50 dark:bg-neutral-950"
                : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
            }`}
          />
        ))
      )}
    </div>
  );
};

export default MediaUpload;