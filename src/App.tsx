import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { UnprotectedRoute } from "./components/UnprotectedRoute";
import { RotacionInventario } from "./screens/RotacionInventario";
function App() {
  return (
    <div className="bg-slate-300 text-white">
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <UnprotectedRoute>
                <Login />
              </UnprotectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/rotacion" element={<RotacionInventario />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
