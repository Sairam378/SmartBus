// src/UserContext.js
import React, { createContext, useState } from "react";

// Create the context
export const UserContext = createContext();

// Create the provider
export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState("");

  return (
    <UserContext.Provider value={{ userEmail, setUserEmail }}>
      {children}
    </UserContext.Provider>
  );
};