import { useState, useEffect } from 'react';
import Home from "./pages/Home";
import CookieConsent from "./components/CookieConsent";

function App() {
  const [userIP, setUserIP] = useState('');

  const handleCookieAccept = (ip: string) => {
    setUserIP(ip);
    console.log('IP del usuario:', ip);
  };

  useEffect(() => {
    const savedIP = localStorage.getItem('user-ip');
    if (savedIP) {
      setUserIP(savedIP);
    }
  }, []);

  return (
    // ELIMINA el fondo de aquí - déjalo transparente
    <div className="min-h-screen">
      <Home userIP={userIP} />
      <CookieConsent onAccept={handleCookieAccept} />
    </div>
  );
}

export default App;