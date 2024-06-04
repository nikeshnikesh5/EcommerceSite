import {  BrowserRouter, Route, Routes } from "react-router-dom"
import 'bootstrap-icons/font/bootstrap-icons.css';

import HomePages from "./pages/HomePages";

import ProductDetailsPage from "./pages/ProductDetailsPage";
import RegisterPage from "./pages/RegisterPage";
import ProductListPage from "./pages/ProductListPage";
import CartPages from "./pages/CartPages";
import LoginPage from "./pages/LoginPage";
import UserProfilePage from "./user/UserProfilePage";
import UserCartDetails from "./user/UserCartDetails";
import UserOrderDetail from "./user/UserOrderDetail";
import UserOrdersPage from "./user/UserOrderPage";
import ProtectedRoutesComponents from "./Component/ProtectedRoutesComponents";
import  AdminUsersPage from "./pages/admin/AdminUserPage"
import AdminEditUser from "./admin/AdminEditUser";
import AdminProductPage from "./admin/AdminProductPage";
import AdminCreatePage from "./admin/AdminCreatePage";
import AdminEditProduct from "./admin/AdminEditProduct";
import AdminOrderDetail from "./admin/AdminOrderDetail";
import AdminChartPage from "./admin/AdminChartPage";
import HeaderComponent from "./Component/HeaderComponent";
import FooterComponent from "./Component/FooterComponent";
import RoutesWithUserChatComponent from "./Component/users/RoutesWithUserChatComponent";
import UserChatComponent from "./Component/users/UserChatComponent";
import ScrollToTop from "./util/scrollTop";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminCreateProductPage from "./admin/AdminCreatePage";
import AdminEditProductPage from "./admin/AdminEditProduct";
import AdminChatRoomComponent from "./admin/AdminChatRoomComponent";
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";
import UserOrderDetailsPage from "./user/UserOrderDetail";
import AdminChatsPage from "./pages/admin/AdminChatsPage";


// user COmponent



function App() {

  return (
    <>
  <BrowserRouter>
 
   <HeaderComponent/>
  <ScrollToTop/>
  
  <Routes>
    <Route element={<RoutesWithUserChatComponent/>}>


  <Route path="/" element={<HomePages/>}/>
 
 <Route path="/product-list" element={<ProductListPage/>}/>
 <Route path="/product-list/:pageNumParam" element={<ProductListPage />} />
          <Route path="/product-list/category/:categoryName" element={<ProductListPage />} />
          <Route path="/product-list/category/:categoryName/:pageNumParam" element={<ProductListPage />} />
          <Route path="/product-list/search/:searchQuery" element={<ProductListPage />} />
          <Route path="/product-list/search/:searchQuery/:pageNumParam" element={<ProductListPage />} />
          <Route path="/product-list/category/:categoryName/search/:searchQuery" element={<ProductListPage />} />
          <Route path="/product-list/category/:categoryName/search/:searchQuery/:pageNumParam" element={<ProductListPage />} />
          <Route path="/product-details/:id" element={<ProductDetailsPage />} />

<Route path="/cart" element={<CartPages/>}/> 
 <Route path="/login" element={<LoginPage/>}/>
 <Route path="/register" element={<RegisterPage/>}/>

 <Route path="*" element="NO Page"/>
<Route element={<ProtectedRoutesComponents admin={false}/>}>
<Route path="/user" element={<UserProfilePage/>}/>

<Route path="/user/my-orders" element={<UserOrdersPage/>}/>
<Route path="/user/cart-details" element={<UserCartDetails/>}/>
<Route path="/user/order-details" element={<UserOrderDetail/>} />
<Route path="/user/product-details/:id" element={<ProductDetailsPage />} />
<Route path="/user/order-details/:id" element={<UserOrderDetailsPage/>} />
</Route>
</Route>

// admin Route
<Route element={<ProtectedRoutesComponents admin={true}/>}>
<Route path="/admin/orders" element={<AdminOrdersPage/>}/>
<Route path="/admin/users" element={<AdminUsersPage/>}/>
<Route path="/admin/edit-user/:id" element={<AdminEditUser/>}/>
<Route path="/admin/products" element={<AdminProductsPage/>}/>
<Route path="/admin/create-new-product" element={<AdminCreateProductPage/>}/>
<Route path="/admin/edit-product/:id" element={<AdminEditProductPage/>}/>

<Route path="/admin/chats" element={<AdminChatsPage/>}/>
<Route path="/admin/analytics" element={<AdminAnalyticsPage/>}/>
<Route path="/admin/order-details/:id" element={<AdminOrderDetail/>}/>
</Route>

  </Routes>
  
 
    {/* <FooterComponent/> */}
    </BrowserRouter>
   </>
    
  );
}

export default App;
