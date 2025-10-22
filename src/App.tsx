import { useState, useEffect } from "react";
import Home from "./pages/Home";
import CookieConsent from "./components/CookieConsent";

function App() {
  const [userIP, setUserIP] = useState("");

  const handleCookieAccept = (ip: string) => {
    setUserIP(ip);
    localStorage.setItem("user-ip", ip);
    console.log("IP del usuario:", ip);
  };

  useEffect(() => {
    const savedIP = localStorage.getItem("user-ip");
    if (savedIP) {
      setUserIP(savedIP);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        {userIP ? (
          <Home userIP={userIP} />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-screen text-white text-lg">
            <p>Obteniendo dirección IP...</p>
          </div>
        )}
      </div>

      <CookieConsent onAccept={handleCookieAccept} />

      {/* ✅ Footer con año automático */}
      <footer className="flex flex-col sm:flex-row items-center justify-center gap-2 py-4 text-sm text-gray-400 ">
        <img
          src="/favicon.png"
          alt="RocketFlow logo"
          className="w-6 h-6 object-contain"
        />
        <span>
          © {new Date().getFullYear()} RocketFlow — Desarrollado por{" "}
          <a href="https://github.com/DilanLoz" target="_blank">Dilan Lopez</a>
        </span>
      </footer>
    </div>
  );
}

export default App;
