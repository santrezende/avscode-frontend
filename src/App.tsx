import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientSignInPage from "./pages/ClientSignInPage";
import ClientHomePage from "./pages/ClientHomePage";
import ClientCarPage from "./pages/ClientCarPage";
import ClientHistoryPage from "./pages/ClientHistoryPage";
import OperationalSignInPage from "./pages/OperationalSignInPage";
import OperatinalHomePage from "./pages/OperationalHomePage";
import OperationalFindPlatePage from "./pages/OperationalFindPlatePage";
import OperationalRegisterPage from "./pages/OperationalRegisterPage";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClientSignInPage />} />
          <Route path="/home" element={<ClientHomePage />} />
          <Route path="/car" element={<ClientCarPage />} />
          <Route path="/history" element={<ClientHistoryPage />} />
          <Route path="/auth/signin" element={<OperationalSignInPage />} />
          <Route path="/auth/home" element={<OperatinalHomePage />} />
          <Route path="/auth/findplate" element={<OperationalFindPlatePage />} />
          <Route path="/auth/register" element={<OperationalRegisterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
