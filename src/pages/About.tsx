import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const About: React.FC = () => {
    return (
        <div className="about-container">
            <h1>About Us</h1>
            <p>
                Welcome to Modern Tech & Partners Online Stores – your smart, convenient, and cost-effective online shopping solution!.
            </p>
            <p>
                We are a proudly local platform that helps you save time and money by comparing prices across multiple nearby stores and recommending the most affordable options for your needs. Whether you're shopping for groceries, household items, or everyday essentials, we help you make the best choice—every time.
            </p>
            <p>
                But we don’t stop there. <br />

                We offer fast and reliable delivery straight to your doorstep, so you don’t have to leave the comfort of your home. Our team of verified drivers ensures that your items arrive safely and on time.
            </p>
            <p>
                At Modern Tech & Partners Online Stores, we’re not just building an e-commerce platform — we’re creating a community-focused marketplace that prioritizes affordability, convenience, and trust.

                Join us today and experience shopping redefined!
            </p>
            <link  to="/Home" />
        </div>
    );
};

export default About;


