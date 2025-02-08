import React, { createContext, useState } from "react";

const AdminEmailContext = createContext();

// samaalatwi23@gmail.com
// ga863410@gmail.com
export const AdminEmailProvider = ({ children }) => {
  const [adminEmail, setAdminEmail] = useState("ga863410@gmail.com");

  return (
    <AdminEmailContext.Provider value={{ adminEmail, setAdminEmail }}>
      {children}
    </AdminEmailContext.Provider>
  );
};

export { AdminEmailContext };
