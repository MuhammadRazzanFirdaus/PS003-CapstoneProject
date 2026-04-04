import { useRef } from "react";
import { MdOutlineImage } from "react-icons/md";

export default function GoalImageUpload({ imagePreview, onImageChange }) {
  const fileRef = useRef(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    onImageChange(file, URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">Upload Image</label>
      <div
        onClick={() => fileRef.current.click()}
        className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-gray-400 transition-colors"
      >
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="preview"
            className="h-32 object-contain rounded-lg"
          />
        ) : (
          <>
            <MdOutlineImage size={32} className="text-blue-400" />
            <p className="text-sm text-gray-500">
              Click to upload an image or icon
            </p>
            <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
          </>
        )}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImage}
      />
    </div>
  );
}
