import { useDispatch, useSelector } from "react-redux";
import { setTitle, setDescription, setMedia } from "../store/productSlice";
import FileUpload from "./FileUpload";
import imagStarNotSelected from "../assets/imagStarNotSelected.svg";

// Define a type for media items
type MediaItem = {
  url: string;
  isMain: boolean;
};

export default function ProductInformation() {
  const dispatch = useDispatch();
  const { title, description, media } = useSelector(
    (state: any) => state.product
  );

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
        isMain: false,
      }));
      dispatch(setMedia([...media, ...fileArray]));
    }
  };

  const handleSetMainImage = (index: number) => {
    const updatedMedia = media.map((img: MediaItem, i: number) => ({
      ...img,
      isMain: i === index,
    }));
    dispatch(setMedia(updatedMedia));
  };

  const handleRemoveImage = (index: number) => {
    const updatedMedia = media.filter((_: MediaItem, i: number) => i !== index);
    dispatch(setMedia(updatedMedia));
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-3">
          Product Name <span className="text-green-300">*</span>
        </label>
        <input
          placeholder="e.g., Long Sleeve T-shirt"
          type="text"
          value={title}
          onChange={(e) => dispatch(setTitle(e.target.value))}
          className="mt-1 block w-full p-2 rounded-md bg-[#141414] placeholder:text-[#7B7B7B]"
          maxLength={75}
        />
        <div className="text-xs text-right mt-2 mr-4 text-[#7B7B7B]">
          <span>{title.length}/75</span>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mt-4 mb-3">
          Description
        </label>
        <textarea
          placeholder="e.g., A stylish and comfortable long sleeve T-shirt"
          value={description}
          onChange={(e) => dispatch(setDescription(e.target.value))}
          className="mt-1 block w-full p-2 h-[178px] bg-[#141414] rounded-md placeholder:text-[#7B7B7B]"
          maxLength={250}
        />
        <div className="text-xs text-right mt-2 mr-4 text-[#7B7B7B]">
          <span>{description.length}/250</span>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Product Images <span className="text-green-300">*</span>
        </label>
        <h5 className="text-xs mb-6 text-[#7B7B7B]">
          Upload static images of your product.
        </h5>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <FileUpload onFileChange={handleImageUpload} />
          {media.map((img: MediaItem, index: number) => (
            <div key={index} className="relative">
              <img
                src={img.url}
                alt="Product"
                className="w-64 h-64 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => handleSetMainImage(index)}
                className="absolute top-2 left-2 p-1 rounded-md bg-gray-500"
              >
                {img.isMain ? (
                  "⭐"
                ) : (
                  <img src={imagStarNotSelected} alt="Not Selected Star" />
                )}
              </button>
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 p-1 rounded-md bg-gray-500 text-black"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
