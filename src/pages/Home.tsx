import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './HomeCss.css';
import 'bootstrap/dist/css/bootstrap.min.css';

type Product = {
  itemName: string;
  price: number;
  image: string;
};

const Home: React.FC = () => {
  const [name, setName] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [publicImages, setPublicImages] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from backend
    fetch("https://tut-online-store.onrender.com/products/all")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));

    // Fetch images from public folder (assuming you have a products.json in public)
    fetch("/products.json")
      .then(res => res.json())
      .then(data => setPublicImages(data.map((item: any) => item.img || item.image)))
      .catch(() => setPublicImages([]));
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
    <div className="home-container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <h1 className="display-4 mb-3 text-center" style={{ color: "white" }}>
        Welcome to Modern Tech & Partners Online Stores!
      </h1>
      <p className="lead text-center mb-4" style={{ color: "white" }}>
        We are delighted to have you here. Explore a wide variety of quality products including groceries, household essentials, personal care, and more. Enjoy a seamless shopping experience and discover great deals every day!
      </p>
      <p className="text-center mb-4" style={{ color: "white", fontSize: "1.15em" }}>
        Our platform partners with various shops to bring you the best selection and prices. When you select items, our system will compare your choices against those stored in our database and help you choose the shop offering the best price for each product.
      </p>
      <div className="text-center mt-5">
        <Link to="/login" className="btn btn-primary btn-lg">
          Login or Create Account
        </Link>
        <div className="mt-2 text-white">
          Don't have an account? <Link to="/RegisterAccount" className="text-warning">Sign up here</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;