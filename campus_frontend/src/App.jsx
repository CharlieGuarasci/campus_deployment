import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Marketplace from "./pages/Marketplace";
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Footer from "./components/Footer"
import Welcome from "./pages/Welcome";
import ListingDetail from "./pages/ListingDetail";
import Messages from "./pages/Messages";
import Board from "./pages/Board";
import "./index.css";

// Wrapper component to handle conditional footer rendering
const AppContent = () => {
  const location = useLocation();
  const showFooter = location.pathname === '/profile';

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-y-auto relative">
        <Routes>
          <Route path="/" element={<Marketplace />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/board" element={<Board />} />
        </Routes>
      </div>
      {showFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
