import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientSignInPage from "./pages/ClientSignInPage";
import ClientHomePage from "./pages/ClientHomePage";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClientSignInPage />} />
          <Route path="/home" element={<ClientHomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
