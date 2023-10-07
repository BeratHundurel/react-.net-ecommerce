import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { error } from "console";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

interface Props {
    product: Product;
}
export default function ProductCard({ product }: Props) {
    const [loading,setLoading] = useState(false);
    function handleAddItem(productId: number) {
        setLoading(true);
        agent.Basket.addItem(productId)
          .catch(error => console.log(error))
          .finally(() => setLoading(false));
      }
    return (
        <Card sx={{ boxShadow: "unset" }}>
            <CardMedia
                sx=
                {{ height: 310, backgroundSize: "contain", bgcolor: 'primary.light', borderRadius: '12px' }}
                image={product.pictureUrl}
                title={product.name}
                component={Link} to={`/catalog/${product.id}`}
            />
            <CardContent>
                <Typography sx=
                    {{ fontSize: "16px", textAlign: "center", color: "text.secondary", fontWeight: "500" }}>
                    {product.name} - {product.brand} / {product.type}
                </Typography>
                <Typography sx=
                    {{ fontSize: "18px", textAlign: "center", color: "secondary.main", fontWeight: "600", mt: 1 }}>
                    ${(product.price / 100).toFixed(2)}
                </Typography>
                <LoadingButton loading={loading} onClick={() => handleAddItem(product.id)} sx={{ mt: 2 }} variant="contained">Add to Cart</LoadingButton>
            </CardContent>
        </Card>
    );
}