import React, { createContext, useState } from "react";

const TokenContext = createContext({
  token: null,
  setTokens: (data) => {},
});

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState([]);

  const setTokens = (data) => {
    setToken(data);
  };

  return (
    <TokenContext.Provider value={{ token, setTokens }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContext;
