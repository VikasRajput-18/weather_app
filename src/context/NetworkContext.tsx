"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface NetworkContextType {
  isOffline: boolean;
  retryFetch: (callback: () => Promise<void>, retries?: number, delay?: number) => Promise<void>;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOffline, setIsOffline] = useState(false);

  // Detect browser offline/online events
  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    updateOnlineStatus(); // check at start

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  // Retry logic
  const retryFetch = async (callback: () => Promise<void>, retries = 3, delay = 2000) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        await callback();
        return;
      } catch (error) {
        if (attempt < retries) {
          await new Promise((res) => setTimeout(res, delay));
        } else {
          throw error;
        }
      }
    }
  };

  return (
    <NetworkContext.Provider value={{ isOffline, retryFetch }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = (): NetworkContextType => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error("useNetwork must be used within a NetworkProvider");
  }
  return context;
};
