import React, { createContext, useState } from "react";

const AdminEmailContext = createContext();

// samaalatwi23@gmail.com
// ahmedaliahmedgenedy@gmail.com
export const AdminEmailProvider = ({ children }) => {
  const [adminEmail, setAdminEmail] = useState("ahmedaliahmedgenedy@gmail.com");

  return (
    <AdminEmailContext.Provider value={{ adminEmail, setAdminEmail }}>
      {children}
    </AdminEmailContext.Provider>
  );
};

export { AdminEmailContext };
