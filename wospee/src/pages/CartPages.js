import CartPageComponent from "../Component/CartPageComponent";
import { useDispatch } from "react-redux"; 
import { useSelector } from "react-redux/es/hooks/useSelector";
import { addToCart , removeFormCart } from "../redux/actions/cartActions";
import { useEffect, useState } from "react";

 
const CartPage = () => {
  const [subTotal , setSubTotal] = useState(0);
const cartItems = useSelector((state) => state.cart.cartItems);
const cartSubtotal = useSelector((state) => state.cart.cartSubtotal);
const reduxDispatch = useDispatch();



return (
    <CartPageComponent 

    addToCart={addToCart}    
    removeFormCart={removeFormCart}
   cartItems={cartItems}
   cartSubtotal={cartSubtotal}
   reduxDispatch={reduxDispatch}       
 />
)
  };
  
  export default CartPage;
  
  