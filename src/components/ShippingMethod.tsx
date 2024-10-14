import { useDispatch, useSelector } from "react-redux";
import { setShippingType } from "../store/productSlice";

const shippingOptions = [
  {
    id: "1",
    name: "EASY Post",
    detail: "EASY Post takes responsibility to deliver your customer orders",
  },
  {
    id: "2",
    name: "Warehouse Management System Integration",
    detail:
      "Product fulfillment and shipping directly from our warehouse to your customers",
  },
];

export default function ShippingMethod() {
  const dispatch = useDispatch();
  const { shippingType } = useSelector((state: any) => state.product);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
      <div>
        <div className="mt-1 block w-full p-2 ">
          {shippingOptions.map((option) => (
            <div
              key={option.id}
              className="rounded-md bg-[#141414] p-2 mb-2 hover:cursor-pointer"
              onClick={() => dispatch(setShippingType(option.id))}
            >
              <input
                type="radio"
                value={option.id}
                checked={shippingType === option.id}
                onChange={() => dispatch(setShippingType(option.id))} // Added onChange handler
                className="mr-2"
              />
              <label className="ml-2">{option.name}</label>
              <p className="mt-2 text-[#7B7B7B] text-sm">{option.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
