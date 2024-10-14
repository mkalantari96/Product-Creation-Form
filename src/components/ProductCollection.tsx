import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCollectionID } from "../store/productSlice";

const collections = [
  { id: "1", name: "Clothing" },
  { id: "2", name: "Electronics" },
  { id: "3", name: "Books" },
];

export default function ProductCollection() {
  const dispatch = useDispatch();
  const { collectionID } = useSelector((state: any) => state.product);

  useEffect(() => {
    // Handle validation logic here if needed
  }, [collectionID]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Collections <span className="text-green-300">*</span>
      </h2>
      <label className="block text-sm font-medium text-[#7B7B7B] mb-2">
        Select Collection or create a new one to publish the product.
      </label>
      <select
        value={collectionID}
        onChange={(e) => dispatch(setCollectionID(e.target.value))}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-[#141414]"
      >
        {collections.map((collection) => (
          <option key={collection.id} value={collection.id}>
            {collection.name}
          </option>
        ))}
      </select>
    </div>
  );
}
