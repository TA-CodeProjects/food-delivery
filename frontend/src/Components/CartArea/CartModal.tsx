import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import CartModalQuantity from "./CartModalQuantity";
import CheckoutButton from "./CheckoutButton";

interface CartModalProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CartModal(props: CartModalProps) {
    const { cart } = useAppSelector(state => state.cart);
     const [isShow, setIsShow] = useState<boolean>(false);
   
    
    return (
      <>
        <div className="darkBG" onClick={() => props.setIsOpen(false)} />
        <div className="centered">
          <div className="document" onClick={() => setIsShow(false)} />
          <div className="modal">
            <div className="modalHeader">
              <h1 className="heading">Your order</h1>
            </div>
            <button className="closeBtn" onClick={() => props.setIsOpen(false)}>
              x
            </button>
            <div className="modalContent">
              {cart.map((item) => (
                <div key={item.id} className="modal-item" onClick={() => setIsShow(true)}>
                  <CartModalQuantity item={item} isShow={isShow} />
                  <div className="details">
                    <h2>{item.item}</h2>
                    <p>{item.description}</p>
                    <p>{item.price}</p>
                  </div>
                  <div className="image-modal">
                    <img src={item.image} alt={item.item} />
                  </div>
                </div>
              ))}
            </div>
            <div className="modalActions">
              <div className="actionContainer">
               <CheckoutButton />
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default CartModal;