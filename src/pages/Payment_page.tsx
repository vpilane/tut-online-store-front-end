import React from "react";
const username = localStorage.getItem("loggedInUser");
const Payment_page: React.FC = () => {
  const grandTotal = localStorage.getItem("grandTotal") || "0.00";

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Payment</h2>
      <div className="card p-4 shadow-sm text-center">
        <h4>Amount to Pay:</h4>
        <div className="display-4 text-success mb-4">R{grandTotal}</div>
        <form action="https://sandbox.payfast.co.za/eng/process" method="post">
          <input type="hidden" name="merchant_id" value="10000100" />
          <input type="hidden" name="merchant_key" value="46f0cd694581a" />
          <input type="hidden" name="amount" value={grandTotal} />
          <input type="hidden" name="item_name" value="Test Product" />
          <input type="hidden" name="return_url" value="https://vpilane.github.io/tut-online-store-front-end/Confirmation_page" />
          <input
            type="submit"
            className="btn btn-primary"
            value="Pay with PayFast"
          />
        </form>
      </div>
    </div>
  );
};

export default Payment_page;