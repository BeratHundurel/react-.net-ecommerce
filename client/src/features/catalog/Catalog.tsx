import Loading from "../../app/layout/Loading";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { fetchFilters, fetchProductsAsync, productSelectors } from "./catalogSlice";
import Grid from "@mui/material/Grid";
import {
   Box,
   Checkbox,
   FormControl,
   FormControlLabel,
   FormGroup,
   Pagination,
   Paper,
   Radio,
   RadioGroup,
   TextField,
   Typography,
} from "@mui/material";

export default function Catolog() {
   const products = useAppSelector(productSelectors.selectAll);
   const { productsLoaded, status, filtersLoaded, brands, types } = useAppSelector((state) => state.catalog);
   const dispatch = useAppDispatch();
   const sortOptions = [
      { value: "name", label: "Alphabetical" },
      { value: "priceDesc", label: "Price - High to low" },
      { value: "price", label: "Price - Low to high" },
   ];

   useEffect(() => {
      if (!productsLoaded) dispatch(fetchProductsAsync());
   }, [productsLoaded, dispatch]);

   useEffect(() => {
      if (!filtersLoaded) dispatch(fetchFilters());
   }, [dispatch, filtersLoaded]);

   if (status.includes("pending")) return <Loading />;

   return (
      <Grid container spacing={5} sx={{ padding: "7.5% 5%" }}>
         <Grid item xs={3}>
            <Paper sx={{ p: 2, mb: 2 }} elevation={0}>
               <TextField label="Search" fullWidth />
            </Paper>
            <Paper sx={{ mb: 2, p: 2 }} elevation={0}>
               <FormControl>
                  <RadioGroup>
                     {sortOptions.map(({ value, label }) => (
                        <FormControlLabel value={value} control={<Radio />} label={label} key={value} />
                     ))}
                  </RadioGroup>
               </FormControl>
            </Paper>
            <Paper sx={{ mb: 2, p: 2 }} elevation={0}>
               <FormGroup>
                  {brands.map((brand) => (
                     <FormControlLabel control={<Checkbox />} label={brand} key={brand} />
                  ))}
               </FormGroup>
            </Paper>
            <Paper sx={{ mb: 2, p: 2 }} elevation={0}>
               <FormGroup>
                  {types.map((type) => (
                     <FormControlLabel control={<Checkbox />} label={type} key={type} />
                  ))}
               </FormGroup>
            </Paper>
         </Grid>
         <Grid item xs={9}>
            <ProductList products={products} />
         </Grid>
         <Grid item xs={3}></Grid>
         <Grid item xs={9}>
            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
               <Typography variant={"h6"}>Displaying 1-8 of 32 results</Typography>
               <Pagination color="secondary" count={10} size="large" page={2}></Pagination>
            </Box>
         </Grid>
      </Grid>
   );
}
