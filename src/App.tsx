import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientSignInPage from "./pages/ClientSignInPage";
import ClientHomePage from "./pages/ClientHomePage";
import ClientCarPage from "./pages/ClientCarPage";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClientSignInPage />} />
          <Route path="/home" element={<ClientHomePage />} />
          <Route path="/car" element={<ClientCarPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
