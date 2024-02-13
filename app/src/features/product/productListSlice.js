import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  fetchAllproducts,
  fetchProductByFilter,
  fetchProductById,
  fetchProductForHomePage,
  searchProduct,
  updateProduct,
} from "./productListAPI";

const initialState = {
  products: [],
  allProducts: [],
  status: "idle",
  totalProducts: 0,
  selectedProduct: null,
  searchedProduct: null,
  isLoading: false,
};

export const fetchAllproductsAsync = createAsyncThunk(
  "product/fetchAllproducts",
  // fetching product for all product page according to pagination, sorting, brand
  async () => {
    const response = await fetchAllproducts();
    return response.data;
  }
);
export const fetchProductForHomePageAsync = createAsyncThunk(
  // fetching all products
  "product/fetchProductForHomePage",
  async () => {
    const response = await fetchProductForHomePage();
    return response.data;
  }
);

export const addProductAsync = createAsyncThunk(
  "product/addProduct",
  async (product) => {
    const response = await addProduct(product);
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);
export const fetchProductByFilterAsync = createAsyncThunk(
  "product/fetchProductByFilter",
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductByFilter(filter, sort, pagination);
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);

export const searchProductAsync = createAsyncThunk(
  "product/searchProduct",
  async (keyword) => {
    const response = await searchProduct(keyword);
    return response.data;
  }
);

export const productListSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    clearSearchedProduct: (state) => {
      state.searchedProduct = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllproductsAsync.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(fetchAllproductsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductByFilterAsync.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(fetchProductByFilterAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "idle";
        state.products = action.payload.products;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(addProductAsync.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "idle";
        const index = state.products.findIndex(
          (e) => e.id === action.payload.id
        );
        state.products[index] = action.payload;
      })
      .addCase(searchProductAsync.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(searchProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "idle";
        state.searchedProduct = action.payload;
      })
      .addCase(fetchProductForHomePageAsync.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(fetchProductForHomePageAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "idle";
        state.allProducts = action.payload;
      });
  },
});

export const { clearSelectedProduct, clearSearchedProduct } =
  productListSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalProducts = (state) => state.product.totalProducts;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectIsLoading = (state) => state.product.status;
export const selectSearchedProduct = (state) => state.product.searchedProduct;
export const selectProductsForHome = (state) => state.product.allProducts;
export default productListSlice.reducer;
