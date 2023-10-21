import { useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";

export default function BasketSummary() {
    const { basket } = useAppSelector(state => state.basket);
    const Total = basket?.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) ?? 0;
    const deliveryFee = Total > 10000 ? 0 : 500;
    return (
        <div className="basket-summary-container">
            <div className="basket-coupon">
                <div className="coupon-title">Use Coupon</div>
                <div className="coupon-group">
                    <input placeholder="Coupon Code" className="coupon-input" type="text" name="coupon-input" />
                    <button className="coupon-btn">Apply</button>
                </div>
                <a href="#" className="basket-login">Don't have an account? Log in or sign up now</a>
            </div>
            <div className="basket-summary">
                <div className="main-title">Basket Summary</div>
                <div className="basket-box">
                    <p>Delivery fee</p>
                    <p>{currencyFormat(deliveryFee)}</p>
                </div>
                <div className="basket-box">
                    <p>Total</p>
                    <p>{currencyFormat(Total)}</p>
                </div>
                <a href="/checkout" className="checkout-btn">Proceed to Checkout</a>
            </div>
        </div>
    )
}