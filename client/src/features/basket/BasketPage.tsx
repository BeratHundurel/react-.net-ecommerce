import { useEffect, useState } from "react";
import { Basket } from "../../app/models/basket"
import agent from "../../app/api/agent";
import Loading from "../../app/layout/Loading";
import { Remove, Add, Delete } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export default function Home() {
    const [loading, setLoading] = useState(true)
    const [basket, setBasket] = useState<Basket | null>(null);
    useEffect(() => {
        agent.Basket.get()
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [])
    if (loading) return <Loading message='Loading...' />
    if (!basket) return <p>Your basket is empty</p>
    console.log(basket)

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
                                <Remove fontSize="small" sx={{ cursor: "pointer" }} />
                                <Typography sx={{ color: "text.primary", fontWeight: "800", fontSize: "12px", borderRight: "2px solid #CDCDCD", borderLeft: "2px solid #CDCDCD", padding: "0 15px" }}>1</Typography>
                                <Add fontSize="small" sx={{ cursor: "pointer" }} />
                            </Box>
                        </div>
                        <div className="basket-price">
                            <p>{((item.price / 100) * item.quantity)}$</p>
                        </div>
                        <div className="basket-remove">
                            <Delete/>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}