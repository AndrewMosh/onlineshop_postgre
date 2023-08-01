import React, { useState, useEffect } from "react";
import {
  getProducts,
  createNewProduct,
  deleteExistingProduct,
  updateExistingProduct,
} from "../features/products/productsSlice";
import { useSelector, useDispatch } from "react-redux";
const ProductManagement = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.data);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    // Fetch products from the backend when the component mounts
    getProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  return (
    <div>
      <h2>Product Management</h2>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => handleInputChange(e)}
        />
        <input
          type="text"
          name="description"
          placeholder="Product Description"
          value={newProduct.description}
          onChange={(e) => handleInputChange(e)}
        />
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={(e) => handleInputChange(e)}
        />
        <button onClick={() => dispatch(createNewProduct(newProduct))}>
          Add Product
        </button>
      </div>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <div>
              <span>{product.name}</span>
              <span>{product.description}</span>
              <span>${product.price}</span>
              <button
                onClick={() => dispatch(deleteExistingProduct(product._id))}
              >
                Delete
              </button>
              <button
                onClick={() =>
                  dispatch(
                    updateExistingProduct({
                      productId: product._id,
                      updatedProductData: {
                        name: "bitch",
                        description: "bitch",
                        price: 8298492948,
                      },
                    })
                  )
                }
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;
