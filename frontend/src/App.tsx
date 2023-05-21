import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from './Components/LayoutArea/Header';
import Main from './Components/LayoutArea/Main';
import Login from './Components/AuthArea/Login';
import Register from './Components/AuthArea/Register';
import AdminPanel from './Components/AdminArea/AdminPanel';
import AddRestaurant from './Components/RestaurantArea/AddRestaurant';
import RestaurantList from './Components/RestaurantArea/RestaurantList';
import MenuList from './Components/RestaurantArea/MenuList';
import AddMenuItem from './Components/RestaurantArea/AddMenuItem';
import UpdateMenuItem from './Components/RestaurantArea/UpdateMenuItem';
import RestaurantPage from './Components/OrderArea/RestaurantPage';
import CheckoutPage from './Components/CartArea/CheckoutPage';
import Success from './Components/CartArea/Success';
import Cancel from './Components/CartArea/Cancel';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/order/:id" element={<RestaurantPage />} />
            <Route path="/order/:id/checkout" element={<CheckoutPage />} />
            <Route path="/order/success" element={<Success />} />
            <Route path="/order/cancel" element={<Cancel />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/restaurant" element={<RestaurantList />} />
            <Route path="/restaurant/:id" element={<MenuList />} />
            <Route path="/addRestaurant" element={<AddRestaurant />} />
            <Route path="/restaurant/:id/addMenu" element={<AddMenuItem />} />
            <Route path="/restaurant/:restaurantId/updateMenu/:menuId" element={<UpdateMenuItem />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
