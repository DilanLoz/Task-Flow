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

  // 👇 Aquí va el nuevo return
  return (
    <div className="min-h-screen">
      {userIP ? (
        // Solo renderiza Home cuando ya tienes la IP
        <Home userIP={userIP} />
      ) : (
        // Mientras no haya IP, muestra algo simple
        <div className="flex flex-col items-center justify-center min-h-screen text-white text-lg">
          <p>Obteniendo dirección IP...</p>
        </div>
      )}

      {/* CookieConsent siempre visible */}
      <CookieConsent onAccept={handleCookieAccept} />
    </div>
  );
}

export default App;
