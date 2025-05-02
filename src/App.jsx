import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./auth/useAuth";
import AutoLogoutHandler from "./auth/AutoLogoutHandler";
import AppRoutes from "./router/AppRoutes";

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <AutoLogoutHandler />
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>

      <Toaster />
    </>
  );
};

export default App;
