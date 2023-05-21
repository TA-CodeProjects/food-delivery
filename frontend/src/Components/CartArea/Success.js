import { Link } from "react-router-dom";

function Success() {
    return (
        <div className="flex-columns">
            <h2>Thanks for your order!</h2>
            <h4>Your payment is successful.</h4>
            <p>
                We appreciate your business! If you have any questions, please email us
                at
                <a href="mailto:orders@example.com"> orders@fooddelivery.com</a>.
            </p>
            <div>
                <Link to="/">
                    <button className="btn"> Go to Home page</button>
                </Link>
            </div>
        </div>
    );
}

export default Success; 