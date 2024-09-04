import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClientSignInPage from './pages/ClientSignInPage';
import ClientHomePage from './pages/ClientHomePage';
import ClientCarPage from './pages/ClientCarPage';
import ClientHistoryPage from './pages/ClientHistoryPage';
import OperationalSignInPage from './pages/OperationalSignInPage';
import OperationalHomePage from './pages/OperationalHomePage';
import OperationalFindPlatePage from './pages/OperationalFindPlatePage';
import OperationalHistoryPage from './pages/OperationalHistoryPage';
import OperationalRegisterPage from './pages/OperationalRegisterPage';
import { OperationalProvider } from './context/OperationalContext';
import OperationalNewServicePage from './pages/OperationalNewServicePage';
import { ClientProvider } from './context/ClientContext';

const OperationalRoutes = () => (
  <OperationalProvider>
    <Routes>
      <Route path="/signin" element={<OperationalSignInPage />} />
      <Route path="/home" element={<OperationalHomePage />} />
      <Route path="/findplate" element={<OperationalFindPlatePage />} />
      <Route path="/history" element={<OperationalHistoryPage />} />
      <Route path="/register" element={<OperationalRegisterPage />} />
      <Route path="/newservice" element={<OperationalNewServicePage />} />
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
      <Route path="/auth/*" element={<OperationalRoutes />} />
    </Routes>
  </ClientProvider>
)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<ClientRoutes />} />
        <Route path="/auth/*" element={<OperationalRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;