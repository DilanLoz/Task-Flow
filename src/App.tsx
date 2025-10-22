import { useState, useEffect } from "react";
import Home from "./pages/Home";
import CookieConsent from "./components/CookieConsent";

function App() {
  const [userIP, setUserIP] = useState<string>("");
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean>(false);

  // Maneja la aceptación de cookies
  const handleCookieAccept = (ip: string) => {
    setUserIP(ip);
    setCookiesAccepted(true);
    localStorage.setItem("user-ip", ip);
    localStorage.setItem("cookies-accepted", "true");
    console.log("IP del usuario:", ip);
  };

  useEffect(() => {
    // Revisar si ya aceptó cookies antes
    const accepted = localStorage.getItem("cookies-accepted") === "true";
    setCookiesAccepted(accepted);

    // Cargar IP si ya fue guardada
    const savedIP = localStorage.getItem("user-ip");
    if (savedIP) setUserIP(savedIP);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b to-black text-white">
      {/* 🌟 Contenido principal siempre visible */}
      <div className="flex-grow">
        <Home userIP={userIP} cookiesAccepted={cookiesAccepted} />
      </div>

      {/* 🍪 Banner de cookies */}
      {!cookiesAccepted && <CookieConsent onAccept={handleCookieAccept} />}

      {/* 🦾 Footer */}
      <footer className="flex flex-col sm:flex-row items-center justify-center gap-2 py-4 text-sm text-gray-400">
        <img
          src="/favicon.png"
          alt="RocketFlow logo"
          className="w-6 h-6 object-contain"
        />
        <span>
          © {new Date().getFullYear()} RocketFlow — Desarrollado por{" "}
          <a
            href="https://github.com/DilanLoz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Dilan Lopez
          </a>
        </span>
      </footer>
    </div>
  );
}

export default App;
