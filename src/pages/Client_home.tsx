import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeCss.css';
import 'bootstrap/dist/css/bootstrap.min.css';

type Product = {
  itemName: string;
  price: number;
  image: string;
};

const Client_home: React.FC = () => {
  const [name, setName] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://tut-online-store.onrender.com/products/all")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setSelectedItems((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("cartItems", JSON.stringify(selectedItems));
    alert("Selected items have been saved to local storage!");
    navigate("/Checkout_page");
  };

  return (
    <div className="home-container">
      <h1 className="display-4 mb-4">Start shopping with Modern Tech & Partners Online Stores<br />{name}</h1>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <input type="hidden" id="username" name="username" value={name} />
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map((product, idx) => {
            const value = `${product.itemName}|${product.price}|${product.image}`;
            const isSelected = selectedItems.includes(value);
            return (
              <div className="col" key={idx}>
                <div
                  className={`card h-100 text-center ${isSelected ? "bg-success text-white border-success" : ""}`}
                  style={{ cursor: "pointer", maxWidth: "150px", margin: "0 auto", width: "100%" }} // Reduced and full width
                  onClick={() => handleCheckboxChange(value, !isSelected)}
                >
                  <input
                    type="checkbox"
                    name="items"
                    value={value}
                    checked={isSelected}
                    readOnly
                    style={{ display: "none" }}
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                  <img
                    src={`https://tut-online-store.onrender.com/uploads/${product.image}`}
                    alt={product.itemName}
                    className="img-fluid mb-2 product-img d-block mx-auto"
                    style={{ width: "100%", height: "150px", objectFit: "contain", background: "#f8f9fa" }} // Show full image, add light background
                  />
                  <div className="fw-bold">{product.itemName}</div>
                  <div className="price">
                    {isSelected ? (
                      <span className="text-white">R{product.price}</span>
                    ) : (
                      <span className="text-success">R{product.price}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-4">
          <input type="submit" value="Add to Cart" className="btn btn-success px-4" />
        </div>
      </form>
    </div>
  );
};

export default Client_home;