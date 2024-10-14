import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Media {
  url: string;
  isMain: boolean;
}

interface SKU {
  price: number;
  quantity: number;
  weight: number;
  height: number;
  length: number;
  width: number;
}

interface Variant {
  isMain: boolean;
  url: string;
  price: number;
  quantity: number;
  weight: number;
  height: number;
  length: number;
  width: number;
}

interface ProductState {
  title: string;
  description: string;
  collectionID: string;
  media: Media[];
  sku: SKU[];
  shippingType: string;
  variants: Variant[]; // Add variants property
}

const initialState: ProductState = {
  title: "",
  description: "",
  collectionID: "",
  media: [],
  sku: [],
  shippingType: "",
  variants: [], // Initialize variants
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    setCollectionID(state, action: PayloadAction<string>) {
      state.collectionID = action.payload;
    },
    setMedia(state, action: PayloadAction<Media[]>) {
      state.media = action.payload;
    },
    setSKU(state, action: PayloadAction<SKU[]>) {
      state.sku = action.payload;
    },
    setShippingType(state, action: PayloadAction<string>) {
      state.shippingType = action.payload;
    },
    setVariants(state, action: PayloadAction<Variant[]>) {
      state.variants = action.payload;
    },
    resetProductState() {
      return initialState;
    },
  },
});

export const {
  setTitle,
  setDescription,
  setCollectionID,
  setMedia,
  setSKU,
  setShippingType,
  setVariants,
  resetProductState,
} = productSlice.actions;

export default productSlice.reducer;
