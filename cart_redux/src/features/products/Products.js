import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsAsync } from "./ProductsSlice";
import "../../App.css";
import { AddItemAsync } from "../cart/CartSlice";

export function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, []);

  return (
    <div>
      <div className="container">
        {products &&
          products.map((product) => (
            // <div className="mt-4">
            <div className="card">
              <img
                src={product.thumbnail}
                alt={product.title}
                width={"300px"}
              />
              <h1>{product.title}</h1>
              <p className="price">$ {product.price}</p>
              <p>{product.rating}</p>
              <p>
                <button onClick={() => dispatch(AddItemAsync(product))}>
                  Add to Cart
                </button>
              </p>
              {/* </div> */}
            </div>
          ))}
      </div>
    </div>
  );
}
