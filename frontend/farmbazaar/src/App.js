import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from './components/Users/AdminUsers/Admin';
import AdminUsers from './components/Users/AdminUsers/AdminUsers';
import FarmerUsers from './components/Users/AdminUsers/FarmerUsers';
import AssignProduct from './components/Users/AdminUsers/AssignProduct';
import Category from './components/Users/AdminUsers/Category';
import Product from './components/Users/AdminUsers/Product';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Farmer from './components/Users/FarmerUsers/Farmer';
import FarmerStocks from './components/Users/FarmerUsers/FarmerStocks';
import Customer from './components/Users/CustomerUsers/Customer';
import Cart from './components/Users/CustomerUsers/Cart';
import Payment from './components/Users/CustomerUsers/Payment';
import OrderList from './components/Users/CustomerUsers/OrderList';
import DeliveryPartner from './components/Users/DeliveryPartnerUsers/DeliveryPartner';
import CustomerUsers from './components/Users/AdminUsers/CustomerUsers';
import DeliveryPartnerUsers from './components/Users/AdminUsers/DeliveryPartnerUsers';
import OrdersTable from './components/Users/AdminUsers/OrdersTable';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin/>} />
        <Route path="/admin/admin-users" element={<AdminUsers/>} />
        <Route path="/admin/farmer-users" element={<FarmerUsers/>} />
        <Route path="/admin/assign-product-to-farmer" element={<AssignProduct/>} />
        <Route path="/admin/categories" element={<Category/>} />
        <Route path="/admin/products" element={<Product/>} />
        <Route path="/admin/customer-users" element={<CustomerUsers/>} />
        <Route path="/admin/delivery-partner-users" element={<DeliveryPartnerUsers/>} />
        <Route path="/admin/orders" element={<OrdersTable/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/farmer-dashboard" element={<Farmer/>} />
        <Route path="/farmer/farmer-stocks" element={<FarmerStocks/>} />
        <Route path="/customer-dashboard" element={<Customer/>} />
        <Route path="/customer-cart" element={<Cart/>} />
        <Route path="/payment/:totalAmount" element={<Payment />} />
        <Route path="/customer-orders" element={<OrderList/>} />
        <Route path="/delivery-partner-dashboard" element={<DeliveryPartner/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
