import { Link } from "react-router-dom";

function Cancel() {
    return (
        <div className="flex-columns">
            <h4>Oops! Your payment has been cancelled.</h4>
            <p>
                We appreciate your business! If you have any questions, please email us
                at <a href="mailto:orders@fooddelivery.com">orders@fooddelivery.com</a>.
            </p>
            <div>
                <Link to="/">
                <button className="btn"> Go to Home page</button>
                </Link>
            </div>
        </div>
    );
}

export default Cancel;