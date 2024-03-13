import React, { useEffect, useState } from "react";
import { Products } from "./features/products/Products";
import { Cart } from "./features/cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsAsync } from "./features/cart/CartSlice";

function App() {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);
  useEffect(()=>{
    dispatch(fetchItemsAsync())
  },[])
  const items = useSelector((state)=>state.cart.items)

  return (
    <div className="App">
      <button onClick={()=>setShowCart(!showCart)}>Cart [ {items.length} ]</button>
      {showCart? <Cart />:<Products />}
    </div>
  );
}

export default App;
