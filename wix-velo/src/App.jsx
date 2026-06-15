import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ProgrammaPage from "./pages/ProgrammaPage";
import PakalpojumiPage from "./pages/PakalpojumiPage";
import PortfolioPage from "./pages/PortfolioPage";
import BujPage from "./pages/BujPage";
import KontaktiPage from "./pages/KontaktiPage";
import PrivatumsPage from "./pages/PrivatumsPage";
import KopienaPage from "./pages/KopienaPage";

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="programma" element={<ProgrammaPage />} />
              <Route path="pakalpojumi" element={<PakalpojumiPage />} />
              <Route path="portfolio" element={<PortfolioPage />} />
              <Route path="buj" element={<BujPage />} />
              <Route path="kontakti" element={<KontaktiPage />} />
              <Route path="privatums" element={<PrivatumsPage />} />
              <Route path="kopiena" element={<KopienaPage />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}
