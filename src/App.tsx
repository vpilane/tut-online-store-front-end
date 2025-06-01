import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.tsx';
import About from './pages/About.tsx';
import Home from './pages/Home.tsx'; // Import Home component
import Contacts from './pages/Contacts.tsx';
import RegisterAccount from './pages/RegisterAccount.tsx';
import Login from './pages/Login.tsx';
import Checkout_page from './pages/Checkout_page.tsx';
import RemoveItem from './pages/RemoveItem.tsx';
import Payment_page from './pages/Payment_page.tsx';
import Confirmation_page from './pages/Confirmation_page.tsx';
import logout from './pages/logout.tsx';
import TrackOrder from './pages/TrackOrder.tsx';
import Driver_home from './pages/Driver_home.tsx';
import Admin_home from './pages/Admin_home.tsx';
import RemoveAccount from './pages/RemoveAccount.tsx';
import AccountLists from './pages/AccountLists.tsx';
import Client_home from './pages/Client_home.tsx'; // Import Client_home component
import Edit_profile from './pages/Edit_profile.tsx'; // Import Edit_profile component
import Query from './pages/Query.tsx'; // Import Edit_profile component
import Query_Response from './pages/Query_Response.tsx'; // Import Query_Response component
import CheckQueries from './pages/CheckQueries.tsx'; // Import CheckQueries component
import AddStore from './pages/AddStore.tsx'; // Import AddStore component
import Reports from './pages/Reports.tsx';

type Product = {
  // Define the properties of Product according to your application's needs
  id: number;
  name: string;
  price: number;
  // Add other fields as needed
};

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  return (
    <Router>
      <Navbar setSearchQuery={setSearchQuery} setFilteredProducts={function (products: any[]): void {
        throw new Error('Function not implemented.');
      } } />
      <Routes>
        <Route index element={<Home searchQuery={searchQuery} products={filteredProducts} />} /> 
        <Route path="/home" element={<Home searchQuery={searchQuery} products={filteredProducts} />} />
        <Route path="/about" element={<About />} />
        <Route path="/Contacts" element={<Contacts />} />
        <Route path="/RegisterAccount" element={<RegisterAccount />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Confirmation_page" element={<Confirmation_page />} />
        <Route path="/Checkout_page" element={<Checkout_page />} />
        <Route path="/RemoveItem" element={<RemoveItem />} />
        <Route path="/Payment_page" element={<Payment_page />} />
        <Route path="/logout" element={<logout />} />
        <Route path="/TrackOrder" element={< TrackOrder/>} />
        <Route path="/Driver_home" element={< Driver_home />} />
        <Route path="/Admin_home" element={< Admin_home />} />
        <Route path="/RemoveAccount" element={< RemoveAccount />} />
        <Route path="/AccountLists" element={< AccountLists />} />
        <Route path="/Client_home" element={< Client_home />} />
        <Route path="/Edit_profile" element={<Edit_profile />} />
        <Route path="/Query" element={<Query />} />
        <Route path="/Query_Response" element={<Query_Response />} />
        <Route path="/CheckQueries" element={<CheckQueries />} />
        <Route path="/AddStore" element={<AddStore/>} />
        <Route path="/Reports" element={<Reports/>} />
        
        {/* Add other routes here */}

      </Routes>
    </Router>
  );
};

export default App;