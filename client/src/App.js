import { Routes, Route } from "react-router-dom";
import HompePage from "./pages/HompePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import Orders from "./pages/user/Orders";
import AdminOrders from "./pages/Admin/AdminOrders";
import Faqs from "./pages/Faqs";
import TermsOfUse from "./pages/TermsOfUse";
import ReturnPolicy from "./pages/ReturnPolicy";
import TrackShipment from "./pages/TrackShipment";
import BulkUpload from "./pages/Admin/BulkCreateProduct";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HompePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />}></Route>
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />}></Route>
          <Route
            path="admin/create-category"
            element={<CreateCategory />}
          ></Route>
          <Route
            path="admin/create-product"
            element={<CreateProduct />}
          ></Route>
          <Route
            path="admin/bulk-create-product"
            element={<BulkUpload />}
          ></Route>
          <Route path="admin/product/:slug" element={<UpdateProduct />}></Route>
          <Route path="admin/users" element={<Users />}></Route>
          <Route path="admin/products" element={<Products />}></Route>
          <Route path="admin/orders" element={<AdminOrders />}></Route>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword></ForgotPassword>}
        />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/termsOfUse" element={<TermsOfUse />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/return_policy" element={<ReturnPolicy />} />
        <Route path="/track_shipment" element={<TrackShipment />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
