import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { Add, FavoriteBorder, Remove, Share } from "@mui/icons-material";
import agent from "../../app/api/agent";
import NotFound from "../../app/error/NotFound";
import Loading from "../../app/layout/Loading";


export default function ProductDetail() {
  const { id } = useParams<{ id: string; }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    id && agent.Catalog.details(parseInt(id))
      .then(response => setProduct(response))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);
  if (loading) return <Loading />;
  if (!product) return <NotFound />;

  const productDetailTextContainerStyle = {
    display: "flex",
    alignItems: "center",
    color: "secondary.main",
    mb: 2,
    fontSize: "16px",
    fontWeight: "700",
  };
  const productDetailTextStyle = {
    color: "primary.dark",
    minWidth: "125px",
    mr: 3,
    fontSize: "15px",
    fontWeight: "500",
  };
  const buttonStyle = {
    backgroundColor: "secondary.main",
    padding: "10px 20px",
    width: "20%",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    "&:hover": { color: "secondary.main", backgroundColor: "primary.main" }
  };
  return (
    <Box sx={{ padding: "10% 15%" }}>
      <Grid container spacing={5}>
        <Grid item xs={4} sx={{ bgcolor: 'primary.light', borderRadius: '12px', backgroundSize: 'contain', padding: '5% !important' }}>
          <img src={product.pictureUrl} alt={product.name} style={{ width: '100%', height: '400px' }} />
        </Grid>
        <Grid item xs={8} sx={{ paddingTop: '0 !important' }}>
          <Typography mb={4} sx={{ fontSize: "30px", fontWeight: "700", color: "tex.secondary" }} gutterBottom>{product.name}</Typography>
          <Typography mb={3} sx={{ fontSize: "17px", fontWeight: "600", color: "text.secondary" }}>Product details</Typography>
          <Grid container spacing={1} mb={3}>
            <Grid item xs={6}>
              <Typography sx={productDetailTextContainerStyle}><Typography sx={productDetailTextStyle}>Product Brand</Typography> {product.brand}</Typography>
              <Typography sx={productDetailTextContainerStyle}> <Typography sx={productDetailTextStyle}>Product Type</Typography> {product.type}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={productDetailTextContainerStyle}><Typography sx={productDetailTextStyle}>Product Price</Typography> ${(product.price / 100).toFixed(2)}</Typography>
              <Typography sx={productDetailTextContainerStyle}> <Typography sx={productDetailTextStyle}>Product Quantity</Typography> {product.quantityInStock}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ color: "primary.dark", }} />
          <Box sx={{ width: "25%", borderRadius: "10px", border: "2px solid #007247", padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", margin: "25px 0" }}>
            <Remove fontSize="small" sx={{ cursor: "pointer" }} />
            <Typography sx={{ color: "text.primary", fontWeight: "800", fontSize: "12px", borderRight: "2px solid #CDCDCD", borderLeft: "2px solid #CDCDCD", padding: "0 15px" }}>1</Typography>
            <Add fontSize="small" sx={{ cursor: "pointer" }} />
          </Box>
          <Divider sx={{ color: "primary.dark", }} />
          <Box sx={{ display: "flex", gap: "25px", alignItems: "center", mt: 2 }}>
            <Box sx={{ border: "2px solid #007247", borderRadius: "10px", width: "45px", height: "45px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Share />
            </Box>
            <Box sx={{ border: "2px solid #007247", borderRadius: "10px", width: "45px", height: "45px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <FavoriteBorder />
            </Box>
            <Button sx={buttonStyle}>Sepete Ekle</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
