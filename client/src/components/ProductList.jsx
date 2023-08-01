import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../features/products/productsSlice";
import Product from "./Product";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data);
  console.log(products);
  useEffect(() => {
    // Fetch the list of products when the component mounts
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <h2>Product List</h2>
      {products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
