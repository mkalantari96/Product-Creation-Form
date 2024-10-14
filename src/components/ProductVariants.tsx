import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSKU, setVariants } from "../store/productSlice"; // Keep setSKU as named import
import deleteSvg from "../assets/deleteSvg.svg";

interface Variant {
  name: string;
  values: string[];
  isApplied: boolean;
  price: number;
  quantity: number;
  weight: number;
  height: number;
  length: number;
  width: number;
  isMain: boolean; // Added property
  url: string; // Added property
}

interface Combination {
  combination: string[];
  price: number;
  quantity: number;
  weight: number;
  height: number;
  length: number;
  width: number;
}

export default function ProductVariants() {
  const dispatch = useDispatch();
  const { variants } = useSelector((state: any) => state.product);
  const [localVariants, setLocalVariants] = useState<Variant[]>(variants);
  const [combinations, setCombinations] = useState<Combination[]>([]);

  useEffect(() => {
    dispatch(setVariants(localVariants));
  }, [localVariants]);

  const addVariant = () => {
    const newVariant: Variant = {
      name: "",
      values: [""],
      isApplied: false,
      price: 0,
      quantity: 0,
      weight: 0,
      height: 0,
      length: 0,
      width: 0,
      isMain: false, // Default value
      url: "", // Default value
    };
    setLocalVariants([...localVariants, newVariant]);
  };

  const handleVariantNameChange = (index: number, value: string) => {
    const updatedVariants = localVariants.map((variant, i) => {
      if (i === index) {
        return { ...variant, name: value }; // Create a new object for the updated variant
      }
      return variant; // Return unchanged variant
    });
    setLocalVariants(updatedVariants);
  };

  const handleVariantValueChange = (
    variantIndex: number,
    valueIndex: number,
    value: string
  ) => {
    const updatedVariants = localVariants.map((variant, i) => {
      if (i === variantIndex) {
        const updatedValues = [...variant.values]; // Create a new copy of the values array
        updatedValues[valueIndex] = value; // Update the specific value
        return { ...variant, values: updatedValues }; // Return the updated variant
      }
      return variant; // Return unchanged variant
    });
    setLocalVariants(updatedVariants);
  };

  const addVariantValue = (index: number) => {
    const updatedVariants = localVariants.map((variant, i) => {
      if (i === index) {
        return { ...variant, values: [...variant.values, ""] }; // Add a new empty value
      }
      return variant; // Return unchanged variant
    });

    setLocalVariants(updatedVariants);
  };

  const generateCombinations = () => {
    const variantValues = localVariants.map((v) =>
      v.values.filter((value) => value.trim() !== "")
    );
    const cartesianProduct = (arr: string[][]) =>
      arr.reduce<string[][]>(
        (a, b) => a.flatMap((d) => b.map((e) => [...d, e])),
        [[]]
      );
    const combinationsArray = cartesianProduct(variantValues);
    const newCombinations = combinationsArray.map((combination) => ({
      combination,
      price: 0,
      quantity: 0,
      weight: 0,
      height: 0,
      length: 0,
      width: 0,
    }));
    setCombinations(newCombinations);
    const skuData = combinations.map((combination) => ({
      // Create an array of SKU objects
      price: combination.price,
      quantity: combination.quantity,
      weight: combination.weight,
      height: combination.height,
      length: combination.length,
      width: combination.width,
    }));

    dispatch(setSKU(skuData));
  };

  const startEditing = (index: number) => {
    const updatedVariants = localVariants.map((variant, i) => {
      if (i === index) {
        return { ...variant, isApplied: false }; // Mark the variant as applied
      }
      return variant; // Return unchanged variant
    });
    setLocalVariants(updatedVariants);
  };

  const handleApply = (index: number) => {
    const updatedVariants = localVariants.map((variant, i) => {
      if (i === index) {
        return { ...variant, isApplied: true };
      }
      return variant;
    });
    setLocalVariants(updatedVariants);
    generateCombinations();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Product Properties <span className="text-green-300">*</span>
      </h2>
      <h5 className="text-xs mb-6 text-[#7B7B7B]">
        Add at least one property to enable all variant fields.
      </h5>

      {localVariants.map((variant, variantIndex) => (
        <div key={variantIndex} className="mb-4 p-4 bg-[#141414]">
          {variant.isApplied ? (
            <div
              className="flex justify-between items-center hover:cursor-pointer"
              onClick={() => startEditing(variantIndex)}
            >
              <div className="flex items-center">
                <span className="text-sm font-medium mr-4">{variant.name}</span>
              </div>
              <div className="flex gap-2">
                {variant.values.map((value) => {
                  if (value !== "") {
                    return (
                      <span className="text-sm font-medium p-1 rounded-md bg-slate-300 text-black">
                        {value}
                      </span>
                    );
                  }
                })}
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium">Property Name</label>
              <input
                type="text"
                value={variant.name}
                onChange={(e) =>
                  handleVariantNameChange(variantIndex, e.target.value)
                }
                className="mt-1 block w-[33%] p-2 rounded-md pl-4 bg-[#1C1C1C]"
              />
              <label className="block text-sm font-medium mt-4">
                Property Values
              </label>
              {variant.values.map((value, valueIndex) => (
                <div key={valueIndex} className="relative">
                  <input
                    placeholder="Custom Value"
                    type="text"
                    value={value}
                    onChange={(e) => {
                      handleVariantValueChange(
                        variantIndex,
                        valueIndex,
                        e.target.value
                      );
                      if (
                        e.target.value !== "" &&
                        valueIndex === variant.values.length - 1
                      ) {
                        addVariantValue(variantIndex);
                      }
                    }}
                    className="mt-1 block w-full p-2 mb-4 rounded-md pl-4 bg-[#1C1C1C]"
                  />
                  {valueIndex !== variant.values.length - 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const updatedVariants = localVariants.map(
                          (variant, i) => {
                            if (i === variantIndex) {
                              const updatedValues = [...variant.values]; // Create a new copy of the values array
                              updatedValues.splice(valueIndex, 1); // Remove the specific value
                              return { ...variant, values: updatedValues }; // Return the updated variant
                            }
                            return variant; // Return unchanged variant
                          }
                        );
                        setLocalVariants(updatedVariants); // Update state with the new variants
                      }}
                      className="absolute top-2 right-2 text-red-500"
                    >
                      <img src={deleteSvg} alt="delete icon" />
                    </button>
                  )}
                </div>
              ))}
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleApply(variantIndex)}
                  className="bg-green-300 text-black hover:bg-[#1C1C1C] hover:text-green-300 border hover:border-green-300 rounded-md py-2 px-4"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addVariant}
        className="bg-green-300 text-black hover:bg-[#1C1C1C] hover:text-green-300 border hover:border-green-300 rounded-md w-full py-2"
      >
        Add product Attribute
      </button>

      {combinations.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium">Variant Combinations</h3>
          <div className="overflow-hidden">
            <table className="w-full mt-4 border-collapse rounded-md table-fixed">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-2 w-1/4">Variant</th>
                  <th className="p-2 w-1/8">Price</th>
                  <th className="p-2 w-1/8">Quantity</th>
                  <th className="p-2 w-1/8">Weight</th>
                  <th className="p-2 w-1/8">Height</th>
                  <th className="p-2 w-1/8">Length</th>
                  <th className="p-2 w-1/8">Width</th>
                </tr>
              </thead>
              <tbody>
                {combinations.map((comb, index) => (
                  <tr key={index} className="bg-slate-900 text-white">
                    <td className="p-2">{comb.combination.join(", ")}</td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={comb.price}
                        className="bg-gray-700 text-white rounded-md p-1 w-full"
                        onChange={(e) =>
                          setCombinations(
                            combinations.map((c, i) =>
                              i === index
                                ? { ...c, price: Number(e.target.value) }
                                : c
                            )
                          )
                        }
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={comb.quantity}
                        className="bg-gray-700 text-white rounded-md p-1 w-full"
                        onChange={(e) =>
                          setCombinations(
                            combinations.map((c, i) =>
                              i === index
                                ? { ...c, quantity: Number(e.target.value) }
                                : c
                            )
                          )
                        }
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={comb.weight}
                        className="bg-gray-700 text-white rounded-md p-1 w-full"
                        onChange={(e) =>
                          setCombinations(
                            combinations.map((c, i) =>
                              i === index
                                ? { ...c, weight: Number(e.target.value) }
                                : c
                            )
                          )
                        }
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={comb.height}
                        className="bg-gray-700 text-white rounded-md p-1 w-full"
                        onChange={(e) =>
                          setCombinations(
                            combinations.map((c, i) =>
                              i === index
                                ? { ...c, height: Number(e.target.value) }
                                : c
                            )
                          )
                        }
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={comb.length}
                        className="bg-gray-700 text-white rounded-md p-1 w-full"
                        onChange={(e) =>
                          setCombinations(
                            combinations.map((c, i) =>
                              i === index
                                ? { ...c, length: Number(e.target.value) }
                                : c
                            )
                          )
                        }
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={comb.width}
                        className="bg-gray-700 text-white rounded-md p-1 w-full"
                        onChange={(e) =>
                          setCombinations(
                            combinations.map((c, i) =>
                              i === index
                                ? { ...c, width: Number(e.target.value) }
                                : c
                            )
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
