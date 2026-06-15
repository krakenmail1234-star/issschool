import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CookieBanner from "./CookieBanner";

export default function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Pāriet uz saturu
      </a>
      <Header />
      <main id="main" style={{ flex: "1 0 auto", display: "flex", flexDirection: "column" }}>
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
