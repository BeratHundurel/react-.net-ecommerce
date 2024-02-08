import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";

interface Props {
    product: Product;
}
export default function ProductCard({ product }: Props) {
    const { status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    return (
        <Card sx={{ boxShadow: "unset" }}>
            <CardMedia
                sx=
                {{ height: 310, backgroundSize: "contain", bgcolor: 'primary.light', borderRadius: '12px' }}
                image={product.pictureUrl}
                title={product.name}
                component={Link} to={`/catalog/${product.id}`}
            />
            <CardContent sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <Typography sx=
                    {{ fontSize: "16px", textAlign: "center", color: "text.secondary", fontWeight: "500" }}>
                    {product.name} - {product.brand} / {product.type}
                </Typography>
                <Typography sx=
                    {{ fontSize: "18px", textAlign: "center", color: "secondary.main", fontWeight: "600", mt: 1 }}>
                    ${(product.price / 100).toFixed(2)}
                </Typography>
                <LoadingButton loading={status ==="pendingAddItem" + product.id} onClick={() => dispatch(addBasketItemAsync({ productId: product.id }))} sx={{ mt: 2, width:"75%" }} variant="contained">Add to Cart</LoadingButton>
            </CardContent>
        </Card>
    );
}