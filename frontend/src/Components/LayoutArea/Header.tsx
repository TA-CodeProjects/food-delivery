import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout, reset } from "../../features/auth/authSlice";
import { reset as resetCart } from "../../features/cart/cartSlice";
import CartButton from "../CartArea/CartButton";
import { useEffect } from "react";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!location.state) {
      dispatch(resetCart());
    }
  }, [location, dispatch])
  

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user?.token ? (
          <>
            <li>
              <span>Hello, {user?.name} </span>
            </li>
            {user?.role === "Admin" && (
              <li>
                <Link to="/admin">
                  <MdAdminPanelSettings size={24} /> Admin Panel
                </Link>
              </li>
            )}
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
            <li>
              <Link to="/addRestaurant">
                <p>Add Restaurant</p>
              </Link>
            </li>
            {user.role === "Restaurant" && (
              <li>
                <Link to="Restaurant">
                  <p>Restaurant</p>
                </Link>
              </li>
            )}
          </>
        ) : (
          <>
            <li>
              <Link to="/login" state={{previousUrl: location.pathname}}>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
      <ul className="float-right">
        <li>
          <CartButton />
        </li>
      </ul>
    </header>
  );
}

export default Header;
