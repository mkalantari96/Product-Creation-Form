import showUnshow from "./assets/showUnshow.svg";
import ProductInformation from "./components/ProductInformation";
import { useState } from "react";
import ProductCollection from "./components/ProductCollection";
import ProductVariants from "./components/ProductVariants";
import ShippingMethod from "./components/ShippingMethod";
import { useSelector, useDispatch } from "react-redux";
import { resetProductState } from "./store/productSlice";

function App() {
  const [isGeneralInfoVisible, setIsGeneralInfoVisible] = useState(false);
  const [isVariantInfoVisible, setIsVariantInfoVisible] = useState(false);
  const [isShippingInfoVisible, setIsShippingInfoVisible] = useState(false);
  const dispatch = useDispatch();

  const { title, description, collectionID, shippingType, media, sku } =
    useSelector((state: any) => state.product);

  const handleSubmit = async () => {
    const data = {
      title,
      description,
      priceUnit: "USD",
      productCollectionID: collectionID,
      shippingType,
      media,
      sku,
    };
    if (
      !title ||
      !description ||
      !collectionID ||
      !shippingType ||
      media.length === 0 ||
      sku.length === 0
    ) {
      if (!title) alert("Title is required");
      if (!description) alert("Description is required");
      if (!collectionID) alert("Collection ID is required");
      if (!shippingType) alert("Shipping Type is required");
      if (media.length === 0) alert("At least one media is required");
      if (sku.length === 0) alert("At least one SKU is required");
      return;
    }

    // Replace with your API endpoint
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Handle success
      alert(`Product submitted successfully, data: ${JSON.stringify(data)}`);
      console.log("Product submitted successfully, data:", data);
    } else {
      // Handle error
      console.error("Failed to submit product");
    }
  };

  return (
    <div className="bg-[#141414] h-[100vh] overflow-auto">
      <div className="max-w-4xl mx-auto p-8 text-white">
        <h1 className="text-3xl font-bold mb-8">Creating Physical Product</h1>
        <div className="mb-6 ">
          <div
            className="bg-[#1C1C1C] p-4 flex justify-between items-center hover:cursor-pointer hover:bg-slate-900"
            onClick={() => setIsGeneralInfoVisible(!isGeneralInfoVisible)}
          >
            <div>
              <h2 className="text-xl font-semibold">
                General Information <span className="text-green-300">*</span>
              </h2>
              <h5 className="text-xs mb-6 text-[#7B7B7B]">
                Provide product details.
              </h5>
            </div>

            <img
              src={showUnshow}
              className={`transition-transform duration-200 ${
                isGeneralInfoVisible ? "rotate-180" : ""
              }`}
            />
          </div>
          {isGeneralInfoVisible && (
            <div className="bg-[#1C1C1C] p-4">
              <ProductInformation />
              <ProductCollection />
            </div>
          )}
        </div>

        <div className="mb-6 ">
          <div
            className="bg-[#1C1C1C] p-4 flex justify-between items-center hover:cursor-pointer  hover:bg-slate-900"
            onClick={() => setIsVariantInfoVisible(!isVariantInfoVisible)}
          >
            <div>
              <h2 className="text-xl font-semibold">
                Variants <span className="text-green-300">*</span>
              </h2>
              <h5 className="text-xs mb-6 text-[#7B7B7B]">
                Create product properties to use in product variations.
              </h5>
            </div>

            <img
              src={showUnshow}
              className={`transition-transform duration-200 ${
                isVariantInfoVisible ? "rotate-180" : ""
              }`}
            />
          </div>
          {isVariantInfoVisible && (
            <div className="bg-[#1C1C1C] p-4">
              <ProductVariants />
            </div>
          )}
        </div>

        <div className="mb-6 ">
          <div
            className="bg-[#1C1C1C] p-4 flex justify-between items-center hover:cursor-pointer  hover:bg-slate-900"
            onClick={() => setIsShippingInfoVisible(!isShippingInfoVisible)}
          >
            <div>
              <h2 className="text-xl font-semibold">
                Shipping <span className="text-green-300">*</span>
              </h2>
              <h5 className="text-xs mb-6 text-[#7B7B7B]">
                Select a shipping method to deliver your product.
              </h5>
            </div>

            <img
              src={showUnshow}
              className={`transition-transform duration-200 ${
                isVariantInfoVisible ? "rotate-180" : ""
              }`}
            />
          </div>
          {isShippingInfoVisible && (
            <div className="bg-[#1C1C1C] p-4">
              <ShippingMethod />
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              dispatch(resetProductState());
              alert("All data has been successfully removed.");
            }}
            className="mt-6 mr-4 text-white bg-gray-500 px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="mt-6 text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600"
          >
            Submit Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
