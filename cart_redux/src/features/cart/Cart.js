import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Cart.css";
import { deleteItemAsync, updateItemAsync} from "./CartSlice";

export function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const handleChange = (e,item) =>{
    dispatch(updateItemAsync({item,change:{quantity:Number(e.target.value)}}))
  }

  return (
    <div>
      {items &&
        items.map((item) => (
          <div className="cart-item">
            <img className="img-fluid" src={item.thumbnail} alt="" />
            <div className="description">
              <p>{item.title}</p>
              <span>{item.brand}</span>
              <strong>${item.price}</strong>
            </div>
            <div className="quantity">
              Quantity
              <select value={item.quantity} onChange={(e)=>handleChange(e,item)}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
            <div className="close">
              <button onClick={()=>dispatch(deleteItemAsync(item.id))}>X</button>
            </div>
          </div>
        ))}
    </div>
  );
}
