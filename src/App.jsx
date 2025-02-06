import Login from "./pages/Login";
import { AdminEmailProvider } from "./utils/AdminEmailContext ";

function App() {
  return (
    <>
      <AdminEmailProvider>
        <Login />
      </AdminEmailProvider>
    </>
  );
}

export default App;
