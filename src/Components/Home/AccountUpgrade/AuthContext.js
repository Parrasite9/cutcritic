import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUserUid, setCurrentUserUid] = useState(null);

  return (
    <AuthContext.Provider value={{ currentUserUid, setCurrentUserUid }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
