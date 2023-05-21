import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

function CheckoutPage() {
    const params = useParams();
    const id = params.id || ""

    const {restaurant} = useAppSelector(state => state.orderRestaurant)
    const {cart} = useAppSelector(state => state.cart)

    return (
      <div>
        <section className="heading">
          <h1>Checkout</h1>
          <p>{restaurant.name}</p>
        
        </section>
      </div>
    );
}

export default CheckoutPage;