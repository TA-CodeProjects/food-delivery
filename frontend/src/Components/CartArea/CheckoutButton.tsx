import { loadStripe } from "@stripe/stripe-js";
import { useAppSelector } from "../../app/hooks";
import { getTotal } from "../../Services/Utils";
import checkoutService from "../../features/checkout/checkoutService";

interface CheckoutButtonProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CheckoutButton(props: CheckoutButtonProps) {

  const { cart } = useAppSelector((state) => state.cart);
  const { restaurant } = useAppSelector(state => state.orderRestaurant)

   const handleCLick = async () => {
     const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);
     const session: any = await checkoutService.checkout(restaurant.id, cart);

     const result = await stripe!.redirectToCheckout({
       sessionId: session.id,
     });

     if (result.error) {
       console.log(result.error);
     }
   };

  return (
    <>
      <button className="btn-cart" onClick={handleCLick}>
        <p className="quantity-circle">{getTotal(cart).totalQuantity}</p>
        <p>Go to checkout</p>
        <p> ₪{getTotal(cart).totalPrice + restaurant.deliveryCost}</p>
      </button>
    </>
  );
}

export default CheckoutButton;
