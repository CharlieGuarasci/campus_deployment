import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Marketplace from "./pages/Marketplace";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-grow">
          <Routes>
            <Route path="/" element={<Marketplace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
