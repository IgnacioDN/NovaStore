import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/LoginPage";
import Search from './components/Search';
import Banner from './components/Banner';
import InfoCintillo from "./components/InfoCintillo"; 
import ProductList from "./components/ProductList";
import PromoBanners from "./components/PromoBanners";
import ProductCarousel from './components/ProductCarousel';
import InformativeSection from "./components/InformativeSection";
import Footer from './components/Footer.jsx';
import MenCategory from "./pages/MenCategory";
import WomenCategory from "./pages/WomenCategory";
import AccessoriesCategory from "./pages/AccessoriesCategory";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart.jsx";
import CartModal from "./context/CartModal";
import Checkout from "./pages/Checkout";
import ScrollToTop from "./components/ScrollToTop";


import "bootstrap/dist/css/bootstrap.min.css";
import './styles/App.css';
import './styles/library.css';

function Home() {
  return (
    <>
      <InfoCintillo />
      <ProductCarousel />
      <InformativeSection />
      <ProductList />
      <PromoBanners />
    </>
  );
}

function App() {
  return (
    <div className="app-wrapper">
            <ScrollToTop />

      <Header />
      <Routes>
        <Route path="/" element={<><Banner /><Home /></>} />
        <Route path="/men" element={<MenCategory />} />
        <Route path="/women" element={<WomenCategory />} />
        <Route path="/accessories" element={<AccessoriesCategory />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/search" element={<Search />} />

      </Routes>
      <CartModal />
      <Footer />
    </div>
  );
}

export default App;