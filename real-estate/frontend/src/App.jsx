import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import PropertyDetail from "./pages/PropertyDetail";
import About from "./pages/About";
import Services from "./pages/Services";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f5f0eb" }}>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={
          <>
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/plots" element={<Listings />} />
                <Route path="/plot/:id" element={<PropertyDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
              </Routes>
            </main>
            <Footer />
            <FloatingContact />
          </>
        } />
      </Routes>
    </div>
  );
}
