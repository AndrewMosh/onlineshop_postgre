import React from "react";

import ProductList from "./components/ProductList";
import ShoppingList from "./components/ShoppingList";
import ProductManagement from "./components/ProductManagement";

function App() {
  return (
    <div>
      <ProductList />
      <ShoppingList />
      <ProductManagement />
    </div>
  );
}

export default App;
