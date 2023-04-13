import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout, reset } from "../../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <ul>
        {user?.token ? (
          <>
            <li>
              <span>Hello, {user?.name} </span>
            </li>
            {user?.isAdmin === true && (
              <li>
                <Link to="/admin">
                 <MdAdminPanelSettings size={24}/> Admin Panel
                </Link>
              </li>
            )}
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
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
    </header>
  );
}

export default Header;
