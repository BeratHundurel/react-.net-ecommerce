import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product, ProductParams } from "../../app/models/product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

const productsAdapter = createEntityAdapter<Product>();

interface CatalogState {
   productsLoaded: boolean;
   filtersLoaded: boolean;
   status: string;
   brands: string[];
   types: string[];
   productParams: ProductParams;
}

function getAxiosParams(productParams: ProductParams) {
   const params = new URLSearchParams();
   params.append("OrderBy", productParams.orderBy);
   params.append("PageNumber", productParams.pageNumber.toString());
   params.append("PageSize", productParams.pageSize.toString());
   if (productParams.searchTerm) params.append("SearchTerm", productParams.searchTerm);
   if (productParams.brands) params.append("brand", productParams.brands);
   if (productParams.types) params.append("type", productParams.types);
   return params;
}
/*Multiple Products*/
export const fetchProductsAsync = createAsyncThunk<
   Product[],
   void,
   {
      state: RootState;
   }
>("catalog/fetchProductsAsync", async (_, thunkAPI) => {
   const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
   try {
      return await agent.Catalog.list(params);
   } catch {
      return thunkAPI.rejectWithValue({
         error: "Error loading products",
      });
   }
});

/*Single Product */
export const fetchProductAsync = createAsyncThunk<Product, number>("catalog/fetchProductAsync", async (productId, thunkAPI) => {
   console.log("fetchProductAsync productId:", productId);
   try {
      return await agent.Catalog.details(productId);
   } catch (error: any) {
      return thunkAPI.rejectWithValue({
         error: error.data,
      });
   }
});

export const fetchFilters = createAsyncThunk("catalog/fetchFilters", async (_, thunkAPI) => {
   try {
      return await agent.Catalog.fetchFilters();
   } catch (error: any) {
      return thunkAPI.rejectWithValue({
         error: error.data,
      });
   }
});

function initParams(): ProductParams {
   return {
      pageNumber: 1,
      pageSize: 6,
      orderBy: "name",
      //   brands: [],
      //   types: [],
   };
}
export const catalogSlice = createSlice({
   name: "catalog",
   initialState: productsAdapter.getInitialState({
      productsLoaded: false,
      filtersLoaded: false,
      status: "idle",
      brands: [],
      types: [],
      productParams: initParams(),
   }),
   reducers: {
      setProductParams: (state, action) => {
         state.productsLoaded = false;
         state.productParams = {
            ...state.productParams,
            ...action.payload,
         };
      },
      resetProductParams: (state) => {
         state.productParams = initParams();
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchProductsAsync.pending, (state) => {
         state.status = "pendingFetchProducts";
      });
      builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
         productsAdapter.setAll(state, action.payload);
         (state.status = "idle"), (state.productsLoaded = true);
      });
      builder.addCase(fetchProductsAsync.rejected, (state, action) => {
         console.log(action.payload);
         state.status = "idle";
      });
      builder.addCase(fetchProductAsync.pending, (state) => {
         state.status = "pendingFetchProduct";
      });
      builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
         productsAdapter.upsertOne(state, action.payload);
         state.status = "idle";
      });
      builder.addCase(fetchProductAsync.rejected, (state, action) => {
         console.log(action);
         state.status = "idle";
      });
      builder.addCase(fetchFilters.pending, (state) => {
         state.status = "pendingFetchFilters";
      });
      builder.addCase(fetchFilters.fulfilled, (state, action) => {
         state.brands = action.payload.brands;
         state.types = action.payload.types;
         state.status = "idle";
         state.filtersLoaded = true;
      });
      builder.addCase(fetchFilters.rejected, (state) => {
         state.status = "idle";
      });
   },
});

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);
export const { setProductParams, resetProductParams } = catalogSlice.actions;
