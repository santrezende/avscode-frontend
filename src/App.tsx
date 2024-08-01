import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientSignInPage from "./pages/ClientSignInPage";
import ClientHomePage from "./pages/ClientHomePage";
import ClientCarPage from "./pages/ClientCarPage";
import ClientHistoryPage from "./pages/ClientHistoryPage";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClientSignInPage />} />
          <Route path="/home" element={<ClientHomePage />} />
          <Route path="/car" element={<ClientCarPage />} />
          <Route path="/history" element={<ClientHistoryPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
