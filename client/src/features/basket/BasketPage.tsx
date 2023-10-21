import { Remove, Add, Delete } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { removeItem, setBasket } from "./basketSlice";

export default function BasketPage() {
    const { basket } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const [status, setStatus] = useState({
        loading: false,
        name: ''
    });
    function handleAddItem(productId: number, name: string) {
        setStatus({ loading: true, name });
        agent.Basket.addItem(productId)
            .then(basket => dispatch(setBasket(basket.value)))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }));
    }

    function handleRemoveItem(productId: number, quantity = 1, name: string) {
        setStatus({ loading: true, name });
        agent.Basket.removeItem(productId, quantity)
            .then(() => dispatch(removeItem({ productId, quantity })))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }));
    }

    if (!basket) return <Typography variant="h3">Your basket is empty</Typography>

    return (
        <>
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
                                    <LoadingButton onClick={() => handleRemoveItem(item.productId, 1, "rem" + item.productId)} loading={status.loading && status.name === "rem" + item.productId} sx={{ minWidth: "25px", height: "25px" }} >
                                        <Remove fontSize="small" sx={{ cursor: "pointer", color: "rgb(69 69 69)" }} />
                                    </LoadingButton>

                                    <Typography sx={{ color: "text.primary", fontWeight: "800", fontSize: "12px", borderRight: "2px solid #CDCDCD", borderLeft: "2px solid #CDCDCD", padding: "0 15px" }}>{item.quantity}</Typography>
                                    <LoadingButton onClick={() => handleAddItem(item.productId, "add" + item.productId)} loading={status.loading && status.name === "add" + item.productId} sx={{ minWidth: "25px", height: "25px" }}>
                                        <Add fontSize="small" sx={{ cursor: "pointer", color: "rgb(69 69 69)" }} />
                                    </LoadingButton>
                                </Box>
                            </div>
                            <div className="basket-price">
                                <p>${((item.price / 100) * item.quantity).toFixed(2)}</p>
                            </div>
                            <div className="basket-remove">
                                <LoadingButton onClick={() => handleRemoveItem(item.productId, item.quantity, "rem" + item.productId)} loading={status.loading && status.name === "rem" + item.productId} sx={{ minWidth: "25px", height: "25px" }} >
                                    <Delete sx={{ color: "secondary.dark" }} />
                                </LoadingButton>
                            </div>
                        </div>
                    ))
                }
            </div>
            <BasketSummary />
        </>
    )
}