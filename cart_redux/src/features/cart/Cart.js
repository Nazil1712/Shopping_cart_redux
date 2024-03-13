import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsAsync } from "./ProductsSlice";
import "./Cart.css";

export function Products() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  return (
    <div>
      <button
        onClick={() => dispatch(fetchProductsAsync())}
        className="border-red-400 border hover:bg-slate-400"
      >
        Fetch Products
      </button>
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
              <select
                value={item.quantity}
                onChange={(e) => handleChange(e, item.id)}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
            <div className="close">
              <button onClick={() => dispatch(deleteAsync(item.id))}>X</button>
            </div>
          </div>
        ))}
    </div>
  );
}
