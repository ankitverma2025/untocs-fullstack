import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Untocs from "./pages/Untocs";
import Cardamoon from "./pages/Cardamoon";
import { Toaster } from "./components/ui/sonner";
import "./styles/landing.css";
import "./styles/cardamoon.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/untocs" element={<Untocs />} />
          <Route path="/cardamoon" element={<Cardamoon />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
