import { useAuth } from "../context/AuthContext";
import { NavBar } from "./NavBar";
import { useNavigate } from "react-router-dom";
export function Home() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleClick = (item: string) => {
    navigate(item);
    // Lógica que se ejecutará al hacer clic en un botón
    console.log(`Haz clic en: ${item}`);
  };

  const inventoryFeatures2 = [
    {
      id: 1,
      nombre: "Registro de Productos",
      route: "/register",
    },
    {
      id: 2,
      nombre: "Entradas y Salidas",
      route: "/entradas-salidas",
    },
    {
      id: 3,
      nombre: "Registro de movimientos",
      route: "/register-movimientos",
    },
    {
      id: 4,
      nombre: "Reporte Total",
      route: "/Kardex",
    },
    {
      id: 5,
      nombre: "Control de Usuarios",
      route: "/control",
    },
  ];
  return (
    <>
      <NavBar handleLogout={handleLogout} user={user} />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-gray-200 p-12 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-blue-950">
            Funcionalidades de Inventario
          </h1>
          <div className="space-y-2">
            {inventoryFeatures2.map((feature, index) => (
              <button
                key={index}
                onClick={() => handleClick(feature.route)}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
              >
                {feature.nombre}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
