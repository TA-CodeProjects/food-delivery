import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import CartModal from "./CartModal";
import { getTotal } from "../../Services/Utils";
import { useLocation, useNavigate } from "react-router-dom";

function CartButton() {
    const navigate = useNavigate();
    const location = useLocation();
    const { cart } = useAppSelector((state) => state.cart)
    const { restaurant } = useAppSelector((state) => state.orderRestaurant)
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { user } = useAppSelector(state => state.auth);

    useEffect(() => {
      if (location.state === "checkout") {
        setIsOpen(false);
      }
    }, [location])

    const handleClick = () => {
      if (user) {
        setIsOpen(true)
      } else {
        navigate('/login', {state: { previousUrl: location.pathname}})
      }
    }
    return (
      <>
        {cart.length !== 0 && location.state !== "checkout" && (
          <button className="btn-cart" onClick={handleClick}>
            <p className="quantity-circle">{getTotal(cart).totalQuantity}</p>
            {user ? <p>View Order</p> : <p>Log in to Order</p>}
            <p> ₪{getTotal(cart).totalPrice + restaurant.deliveryCost}</p>
          </button>
        )}
        {isOpen && <CartModal setIsOpen={setIsOpen} />}
      </>
    );
}

export default CartButton;