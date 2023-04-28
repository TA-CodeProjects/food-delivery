import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import CartModal from "./CartModal";
import { getTotal } from "../../Services/Utils";
import { useLocation, useNavigate } from "react-router-dom";

function CartButton() {
    const navigate = useNavigate();
    const location = useLocation();
    const { cart } = useAppSelector((state) => state.cart)
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { user } = useAppSelector(state => state.auth);

    const handleClick = () => {
      if (user) {
        setIsOpen(true)
      } else {
        navigate('/login', {state: { previousUrl: location.pathname}})
      }
    }
    return (
      <>
        {cart.length !== 0 && (
          <button className="btn-cart" onClick={handleClick}>
            <p className="quantity-circle">{getTotal(cart).totalQuantity}</p>
            {user ? <p>View Order</p> : <p>Log in to Order</p>}
            <p> ₪{getTotal(cart).totalPrice}</p>
          </button>
        )}
        {isOpen && <CartModal setIsOpen={setIsOpen} />}
      </>
    );
}

export default CartButton;