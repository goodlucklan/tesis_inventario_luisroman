import { useAuth } from "../context/AuthContext";
import { NavBar } from "./NavBar";
export function Home() {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <>
      <NavBar handleLogout={handleLogout} user={user} />
      <div className="w-1/2 mx-auto mt-12 h-screen">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Rotacion de inventarios
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Exactitud del inventario
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Tasa de llenado de pedidos
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Stock promedio
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 text-sm leading-5 font-medium text-gray-900">
                1
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-500">
                29/10/2023
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-500">50%</td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-500">80%</td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-500">80%</td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-500">
                12.5
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm leading-5 font-medium text-gray-900">
                2
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-500">
                29/10/2023
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-500">60%</td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-500">77%</td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-500">80%</td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-500">12</td>
            </tr>
            {/* Agrega más filas según tus necesidades */}
          </tbody>
        </table>
      </div>
    </>
  );
}
