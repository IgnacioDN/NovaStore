import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Banner from './components/Banner';
import InfoCintillo from "./components/InfoCintillo"; 
import ProductList from "./components/ProductList";
import PromoBanners from "./components/PromoBanners";
import ProductCarousel from './components/ProductCarousel';
import InformativeSection from "./components/InformativeSection";
import Footer from './components/Footer.jsx';
import Checkout from "./pages/Checkout";

import "bootstrap/dist/css/bootstrap.min.css";
import './styles/App.css';
import './styles/library.css';

function Home() {
  return (
    <>
      <InfoCintillo />
      <ProductList />
      <PromoBanners />
      <ProductCarousel />
      <InformativeSection />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <Banner />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;