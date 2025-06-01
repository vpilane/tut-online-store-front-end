import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeCss.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Checkout_page: React.FC = () => {
  const rawProducts = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const products = rawProducts.map((item: string) => {
    const [name, price, img] = item.split("|");
    return { name, price, img };
  });

  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<number[]>(products.map(() => 1));
  const [name, setName] = useState("");
  const [checkedItems, setCheckedItems] = useState<boolean[]>(products.map(() => false));

  // Suggestion modal state
  const [showModal, setShowModal] = useState(false);
  const [suggestedItems, setSuggestedItems] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [suggestionError, setSuggestionError] = useState<string | null>(null);

  useEffect(() => {
    console.log("useEffect called");
  }, [name]);

  const handleQuantityChange = (idx: number, newValue: number) => {
    setQuantities((prev) =>
      prev.map((q, i) => (i === idx ? newValue : q))
    );
  };

  // Calculate grand total
  const grandTotal = products.reduce(
    (sum, product, idx) => sum + Number(product.price) * quantities[idx],
    0
  );

  // Update checkbox in your map:
  const handleCheckboxChange = (idx: number, checked: boolean) => {
    const updated = [...checkedItems];
    updated[idx] = checked;
    setCheckedItems(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store only the grand total for payment
    localStorage.setItem("grandTotal", grandTotal.toFixed(2));
    navigate("/Payment_page");
  };

  const handleRemove = (e: React.FormEvent) => {
    e.preventDefault();
    // Keep only unchecked items
    const remainingItems = products
      .map(p => `${p.name}|${p.price}|${p.img}`)
      .filter((_, idx) => !checkedItems[idx]);
    localStorage.setItem("cartItems", JSON.stringify(remainingItems));
    setCheckedItems(remainingItems.map(() => false)); // reset checked state
    window.location.reload(); // reload to update the list
  };

  // --- Suggestion Logic ---
  const handleSuggest = async () => {
    setLoadingSuggestions(true);
    setSuggestionError(null);
    setShowModal(true);

    // Get item names from cart
    const itemNames = products.map(p => p.name);

    try {
      const res = await fetch("https://tut-online-store.onrender.com/suggest_grocery_items/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: itemNames }),
      });
      if (!res.ok) throw new Error("Failed to fetch suggestions");
      const data = await res.json();
      setSuggestedItems(data.suggested_items || []);
    } catch (err: any) {
      setSuggestionError("Could not fetch suggestions.");
      setSuggestedItems([]);
    }
    setLoadingSuggestions(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSuggestedItems([]);
    setSuggestionError(null);
  };

  return (
    <div className="home-container">
      <h1 className="display-4 mb-4">Welcome<br />{name}</h1>

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <input type="hidden" id="username" name="username" value={name} />
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map((product, idx) => {
            const total = Number(product.price) * quantities[idx];
            return (
              <div className="col" key={idx}>
                <div
                  className="card h-100 text-center"
                  style={{
                    cursor: "pointer",
                    maxWidth: "150px",
                    margin: "0 auto",
                    width: "100%",
                  }}
                >
                  <label className="p-3" style={{ width: "100%" }}>
                    <input
                      type="checkbox"
                      name="items"
                      value={`${product.name}|${product.price}|${product.img}`}
                      className="form-check-input mb-2"
                      checked={checkedItems[idx]}
                      onChange={(e) => handleCheckboxChange(idx, e.target.checked)}
                      style={{ display: "none" }}
                      tabIndex={-1}
                      aria-hidden="true"
                    />
                    <img
                      src={`https://tut-online-store.onrender.com/uploads/${product.img}`}
                      alt={product.name}
                      className="img-fluid mb-2 product-img d-block mx-auto"
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "contain",
                        background: "#f8f9fa",
                      }}
                    />
                    <div className="fw-bold">{product.name}</div>
                    <div className="price text-success">R{product.price}</div>
                    <input
                      type="number"
                      min={1}
                      value={quantities[idx]}
                      onChange={(e) => handleQuantityChange(idx, Number(e.target.value))}
                      className="form-control mt-2"
                    />
                    <div className="mt-2">
                      <span className="fw-bold">Total: </span>
                      <span className="text-primary">R{total.toFixed(2)}</span>
                    </div>
                  </label>
                </div>
              </div>
            );
          })}
        </div>
        {/* Grand Total Label */}
        <div className="text-end mt-4 me-2">
          <h5>
            Grand Total: <span className="text-success">R{grandTotal.toFixed(2)}</span>
          </h5>
        </div>
        <div className="text-center mt-4">
          <input type="submit" value="Check Out" className="btn btn-success px-4 me-3" />
          <button
            type="button"
            className="btn btn-info px-4"
            onClick={handleSuggest}
            disabled={loadingSuggestions}
          >
            {loadingSuggestions ? "Loading..." : "Suggest Items"}
          </button>
        </div>
      </form>

      {/* Suggestion Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Suggested Items</h5>
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {suggestionError && (
                  <div className="alert alert-danger">{suggestionError}</div>
                )}
                {loadingSuggestions ? (
                  <div>Loading suggestions...</div>
                ) : (
                  <ul>
                    {suggestedItems.length === 0 && !suggestionError && (
                      <li>No suggestions found.</li>
                    )}
                    {suggestedItems.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={() => navigate("/home")}>
          Back
        </button>
      </div>

    </div>
  );
};

export default Checkout_page;
