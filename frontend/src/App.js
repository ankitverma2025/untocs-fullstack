import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LittleSage from "./pages/LittleSage";
import { Toaster } from "./components/ui/sonner";
import "./styles/little-sage-page.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LittleSage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
