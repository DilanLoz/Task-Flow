import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CookieConsentProps {
  onAccept: (ip: string) => void;
}

export default function CookieConsent({ onAccept }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [userIP, setUserIP] = useState('');

  useEffect(() => {
    // Verificar si ya aceptó cookies
    const hasAccepted = localStorage.getItem('cookies-accepted');
    if (!hasAccepted) {
      setIsVisible(true);
      // Obtener IP del usuario
      fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => setUserIP(data.ip))
        .catch(() => setUserIP('unknown'));
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookies-accepted', 'true');
    localStorage.setItem('user-ip', userIP);
    onAccept(userIP);
    setIsVisible(false);
  };

  const handleDecline = () => {
    // Opcional: manejar rechazo
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50"
        >
          <div className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🍪</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Cookies & Privacidad
                </h3>
                <p className="text-gray-700 text-sm mb-4">
                  Usamos cookies para guardar tus tareas localmente y mejorar tu experiencia. 
                  También capturamos tu IP de forma anónima para análisis.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={handleAccept}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
                  >
                    Aceptar
                  </button>
                  <button
                    onClick={handleDecline}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}