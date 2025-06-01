import React from 'react';
import { Link } from 'react-router-dom';
import './HomeCss.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Contacts: React.FC = () => {
    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-sm">
                <h1 className="display-5 mb-4">Contact</h1>
                <p><strong>Telephone:</strong> 0152368569</p>
                <p><strong>Email:</strong> clients@moderntech.com</p>
                <p className="mb-4">
                    <strong>Address:</strong> 56 Exculsior Street<br />
                    <span className="ms-4 d-block">Polokwane</span>
                    <span className="ms-4 d-block">0699</span>
                </p>
            </div>
        </div>
    );
};

export default Contacts;