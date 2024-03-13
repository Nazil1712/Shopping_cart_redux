import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Cart.css";
import { fetchItemsAsync } from "./CartSlice";

export function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  useEffect(()=>{
    dispatch(fetchItemsAsync())
  },[])

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
              <select value={item.quantity}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
            <div className="close">
              <button>X</button>
            </div>
          </div>
        ))}
    </div>
  );
}
