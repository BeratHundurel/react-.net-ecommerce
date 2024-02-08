import Loading from "../../app/layout/Loading";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { fetchFilters, fetchProductsAsync, productSelectors } from "./catalogSlice";
import Grid from "@mui/material/Grid";
import { Paper, TextField } from "@mui/material";
import { Padding } from "@mui/icons-material";

export default function Catolog() {
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, status, filtersLoaded } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    const sortOptions = [
        { value: 'name', label: 'Alphabetical' },
        { value: 'priceDesc', label: 'Price - High to low' },
        { value: 'price', label: 'Price - Low to high' },
    ]
    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());
    }, [dispatch, filtersLoaded]);

    if (status.includes("pending")) return <Loading />

    return (
        <Grid container spacing={4} sx={{padding:"7.5% 5%"}}>
            <Grid item xs={3}>
                <Paper sx={{ p: 2 }}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        fullWidth
                    />
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <ProductList products={products} />
            </Grid>
        </Grid>
    )
}
