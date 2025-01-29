import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FilesContextProvider } from "./context/filesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FilesContextProvider>
      <App />
    </FilesContextProvider>
  </StrictMode>
);
