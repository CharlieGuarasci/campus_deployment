import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Marketplace from "./pages/Marketplace";
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Footer from "./components/Footer"
import Welcome from "./pages/Welcome";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-grow">
          <Routes>
            <Route path="/" element={<Marketplace />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/welcome" element={<Welcome />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
