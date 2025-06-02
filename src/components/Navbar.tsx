import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({ setSearchQuery, setFilteredProducts }: { setSearchQuery: (q: string) => void, setFilteredProducts: (products: any[]) => void }) => {
    const [input, setInput] = useState("");
    const [query, setQuery] = useState("");
    const [queryResponse, setQueryResponse] = useState<any>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const isLoggedIn = !!localStorage.getItem("loggedInUser");

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        navigate("/login");
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/products.json');
        const allProducts = await res.json();
        const filtered = allProducts.filter((p: any) =>
            p.itemName.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    // Example query handler (you can adapt as needed)
    const handleQuery = async () => {
        const res = await fetch(`/api/query?search=${encodeURIComponent(query)}`);
        const data = await res.json();
        setQueryResponse(data);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" title="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contacts">Contacts</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="reportsDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Reports
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="reportsDropdown">
                                <li>
                                    <Link className="dropdown-item" to="/reports">View Reports</Link>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => window.location.pathname === "/reports" ? document.getElementById("download-pdf-btn")?.click() : window.location.assign("/reports")}
                                        type="button"
                                    >
                                        Download PDF
                                    </button>
                                </li>
                            </ul>
                        </li>
                        {/* Dropdown menu */}
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {isLoggedIn ? "Account" : "Login"}
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {!isLoggedIn && (
                                    <>
                                        <li>
                                            <a className="dropdown-item" href="/login">Login</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="/RegisterAccount">Sign-up</a>
                                        </li>
                                    </>
                                )}
                                {isLoggedIn && (
                                    <>
                                        {localStorage.getItem("account") === "Driver" ? (
                                            <>
                                                <li>
                                                    <a className="dropdown-item" href="/edit_profile">Edit Profile</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="/remove_account">Delete Profile</a>
                                                </li>
                                                <li>
                                                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                                                </li>
                                            </>
                                        ) : localStorage.getItem("account") === "Administrator" ? (
                                            <li>
                                                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                                            </li>
                                        ) : localStorage.getItem("account") === "Client" ? (
                                            <>
                                                <li>
                                                    <a className="dropdown-item" href="/edit_profile">Edit Profile</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="/remove_account">Delete Profile</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="/query">add a query</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="/query_response">view query responses</a>
                                                </li>
                                                <li>
                                                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                                                </li>
                                            </>
                                        ) : (
                                            <>
                                                {/* Other roles options here */}
                                            </>
                                        )}
                                    </>
                                )}
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex ms-auto" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search"
                            name="search"
                            className="form-control me-2"
                            style={{ minWidth: "120px" }}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                        />
                        <button type="submit" className="btn btn-light btn-sm">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;