import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const RemoveItem: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [selectedToRemove, setSelectedToRemove] = useState<string[]>([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
    console.log("Loaded cartItems:", items);
    setCartItems(items);
  }, []);

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setSelectedToRemove((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleRemove = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedCart = cartItems.filter(item => !selectedToRemove.includes(item));
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    setSelectedToRemove([]);
    alert("Selected items have been removed from the cart!");
    navigate("/Checkout_page");
  };

  const allProducts = cartItems.map((item) => {
    const [name, price, img] = item.split("|");
    return { name, price, img, value: item };
  });

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Remove Items from Cart</h2>
      <form onSubmit={handleRemove} className="card p-4 shadow-sm">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {allProducts.length === 0 ? (
            <div className="col">
              <div className="alert alert-info">No items in cart.</div>
            </div>
          ) : (
            allProducts.map((product, idx) => (
              <div className="col" key={idx}>
                <div className="card h-100 text-center">
                  <label className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedToRemove.includes(product.value)}
                      onChange={(e) =>
                        handleCheckboxChange(product.value, e.target.checked)
                      }
                      className="form-check-input mb-2"
                    />
                    <img
                      src={product.img}
                      alt={product.name}
                      className="img-fluid mb-2"
                      style={{ maxHeight: "100px" }}
                    />
                    <div className="fw-bold">{product.name}</div>
                    <div className="price text-success">R{product.price}</div>
                  </label>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="text-center mt-4">
          <button type="submit" className="btn btn-danger px-4">
            Remove Selected Items
          </button>
        </div>
      </form>
    </div>
  );
};

export default RemoveItem;