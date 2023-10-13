import { Remove, Add, Delete } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useStoreContext } from "../../app/context/StoreContext";
import agent from "../../app/api/agent";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

export default function Home() {
    const { basket, setBasket, removeItem } = useStoreContext();
    const [loading, setLoading] = useState(false);
    function handleAddItem(productId: number) {
        setLoading(true);
        agent.Basket.addItem(productId)
            .then(basket => setBasket(basket.value))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    function handleRemoveItem(productId: number, quantity = 1) {
        setLoading(true);
        agent.Basket.removeItem(productId, quantity)
            .then(() => removeItem(productId,quantity))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    if (!basket) return <Typography variant="h3">Your basket is empty</Typography>

    return (
        <div className="page-container">
            {
                basket.items.map(item => (
                    <div className="basket-container" key={item.productId}>
                        <div className="basket-img-container">
                            <img src={item.pictureUrl} alt="product image" />
                        </div>
                        <div className="basket-description">
                            <p>{item.name}</p>
                        </div>
                        <div className="counter">
                            <Box sx={{ width: "100%", borderRadius: "10px", border: "2px solid #007247", padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", margin: "25px 0" }}>
                                <LoadingButton onClick={() => handleRemoveItem(item.productId)} loading={loading} sx={{ minWidth: "25px", height: "25px" }} >
                                    <Remove fontSize="small" sx={{ cursor: "pointer" }} />
                                </LoadingButton>

                                <Typography sx={{ color: "text.primary", fontWeight: "800", fontSize: "12px", borderRight: "2px solid #CDCDCD", borderLeft: "2px solid #CDCDCD", padding: "0 15px" }}>{item.quantity}</Typography>
                                <LoadingButton onClick={() => handleAddItem(item.productId)} loading={loading} sx={{ minWidth: "25px", height: "25px" }}>
                                    <Add fontSize="small" sx={{ cursor: "pointer" }} />
                                </LoadingButton>
                            </Box>
                        </div>
                        <div className="basket-price">
                            <p>{((item.price / 100) * item.quantity)}$</p>
                        </div>
                        <div className="basket-remove">
                            <LoadingButton onClick={() => handleRemoveItem(item.productId, item.quantity)} loading={loading} sx={{ minWidth: "25px", height: "25px" }} >
                                <Delete />
                            </LoadingButton>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}