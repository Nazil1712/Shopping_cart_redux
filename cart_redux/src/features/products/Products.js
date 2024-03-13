import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsAsync } from "./ProductsSlice";
import "../../App.css";
import { AddItemAsync } from "../cart/CartSlice";

export function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  return (
    <div>
      <button
        onClick={() => dispatch(fetchProductsAsync())}
        className="border-red-400 border hover:bg-slate-400"
      >
        Fetch Products
      </button>
      <div className="grid grid-cols-4 ">
        {products &&
          products.map((product) => (
            <div className="mt-4">
              <div className="card">
                <img src={product.thumbnail} alt={product.title}/>
                <h1>{product.title}</h1>
                <p className="price">$ {product.price}</p>
                <p>{product.rating}</p>
                <p>
                  <button onClick={()=>dispatch(AddItemAsync(product))}>Add to Cart</button>
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
