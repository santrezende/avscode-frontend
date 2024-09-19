import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientSignInPage from "./pages/ClientSignInPage";
import ClientHomePage from "./pages/ClientHomePage";
import ClientCarPage from "./pages/ClientCarPage";
import ClientHistoryPage from "./pages/ClientHistoryPage";
import OperationalSignInPage from "./pages/OperationalSignInPage";
import OperationalHomePage from "./pages/OperationalHomePage";
import OperationalFindPlatePage from "./pages/OperationalFindPlatePage";
import OperationalHistoryPage from "./pages/OperationalHistoryPage";
import OperationalRegisterPage from "./pages/OperationalRegisterPage";
import { OperationalProvider } from "./context/OperationalContext";
import OperationalNewServicePage from "./pages/OperationalNewServicePage";
import { ClientProvider } from "./context/ClientContext";
import { ToastContainer } from "react-toastify";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import PrivateRoute from "./components/PrivateRoute";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const OperationalRoutes = () => (
  <OperationalProvider>
    <Routes>
      <Route path="/signin" element={<OperationalSignInPage />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <OperationalHomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PrivateRoute>
            <OperationalRegisterPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/findplate"
        element={
          <PrivateRoute>
            <OperationalFindPlatePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/newservice"
        element={
          <PrivateRoute>
            <OperationalNewServicePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/history"
        element={
          <PrivateRoute>
            <OperationalHistoryPage />
          </PrivateRoute>
        }
      />
    </Routes>
  </OperationalProvider>
);

const ClientRoutes = () => (
  <ClientProvider>
    <Routes>
      <Route path="/" element={<ClientSignInPage />} />
      <Route path="/home" element={<ClientHomePage />} />
      <Route path="/car" element={<ClientCarPage />} />
      <Route path="/history" element={<ClientHistoryPage />} />
    </Routes>
    <FloatingWhatsApp />
  </ClientProvider>
);

function App() {
  useEffect(() => {
    const checkAndClearLocalStorage = () => {
      const lastClear = localStorage.getItem('lastClear');
      const oneDay = 24 * 60 * 60 * 1000;
      const now = new Date().getTime();

      if (!lastClear || now - parseInt(lastClear) > oneDay) {
        localStorage.clear();
        localStorage.setItem('lastClear', now.toString());
      }
    };

    checkAndClearLocalStorage();
  }, []);
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<ClientRoutes />} />
          <Route path="/auth/*" element={<OperationalRoutes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
