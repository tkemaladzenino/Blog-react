// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import HeaderTitle from './components/HeaderTitle';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Details from './components/Details';
import AddNews from './components/AddNews';
import Footer from './components/Footer';

const App = () => {
    return (
        <BrowserRouter>
            <HeaderTitle />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/details/:id" element={<Details />} />


                <Route
                    path="/Home"
                    element={
                        <>
                            <Header />
                            <Home />
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="/AddNews"
                    element={
                        <>
                            <Header />
                            <AddNews />
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="/About"
                    element={
                        <>
                            <Header />
                            <About />
                            <Footer />
                        </>
                    }
                />

                <Route
                    path="/Contact"
                    element={
                        <>
                            <Header />
                            <Contact />
                            <Footer />
                        </>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
};

var root = document.getElementById('root');
ReactDOM.createRoot(root).render(<App />);




