import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const Kardex: React.FC = () => {
  const [productos, setProductos] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [precioUnitario, setPrecioUnitario] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [kardex, setKardex] = useState<any>([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      const productosSnapshot = await getDocs(collection(db, "Productos"));
      const productosData: any = productosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(productosData);
    };

    obtenerProductos();
  }, []);

  useEffect(() => {
    const obtenerProductos = async () => {
      const productosSnapshot = await getDocs(collection(db, "Kardex"));
      const productosData: any = productosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setKardex(productosData);
    };

    obtenerProductos();
  }, []);

  useEffect(() => {
    const obtenerMovimientos = async () => {
      if (productoSeleccionado) {
        const productoActual: any = productos.filter(
          (x: any) => x.nombre === productoSeleccionado
        );
        const movimientosQuery = query(
          collection(db, "Movimiento"),
          where("Producto", "==", productoSeleccionado),
          where("Aprobacion", "==", true)
        );
        const movimientosSnapshot = await getDocs(movimientosQuery);
        const movimientosData: any = movimientosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (movimientosData) {
          setPrecioUnitario(productoActual[0].costo);
        }
        setMovimientos(movimientosData);
      }
    };

    obtenerMovimientos();
  }, [productoSeleccionado]);

  const handleProductoChange = async (productoId: string) => {
    setProductoSeleccionado(productoId);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline absolute top-4 left-4"
        onClick={() => history.back()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
      </button>
      <div className="container mx-auto p-4 text-black">
        <h1 className="text-2xl font-bold mb-4">Kardex</h1>
        <div className="mb-4">
          <h3>Cantidad total de productos: {kardex[0]?.totalProductos}</h3>
        </div>
        <div className="mb-4">
          <h3>Costo total del almacen: {kardex[0]?.costoProductos}</h3>
        </div>
        <div className="mb-4">
          <label
            htmlFor="producto"
            className="block text-sm font-semibold mb-1"
          >
            Selecciona un Producto
          </label>
          <select
            id="producto"
            name="producto"
            onChange={(e) => handleProductoChange(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="" disabled selected>
              Selecciona un producto
            </option>
            {productos.map((producto: any) => (
              <option key={producto.id} value={producto.name}>
                {producto.nombre}
              </option>
            ))}
          </select>
        </div>
        {productoSeleccionado && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Fecha</th>
                  <th className="py-2 px-4 border-b">Tipo de Movimiento</th>
                  <th className="py-2 px-4 border-b">Cantidad</th>
                  <th className="py-2 px-4 border-b">Usuario</th>
                  <th className="py-2 px-4 border-b">Precio del Producto</th>
                  <th className="py-2 px-4 border-b">Valor Total</th>
                  <th className="py-2 px-4 border-b">Motivo</th>
                </tr>
              </thead>
              <tbody>
                {movimientos.map((movimiento: any) => (
                  <tr key={movimiento.id} className="text-center">
                    <td className="py-2 px-4 border-b">{movimiento.Fecha}</td>
                    <td className="py-2 px-4 border-b">
                      {movimiento.Tipo_Movimiento}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {movimiento.Cantidad}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {movimiento.Usuario.nombre}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {precioUnitario && precioUnitario}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {precioUnitario && movimiento.Cantidad * precioUnitario}
                    </td>
                    <td className="py-2 px-4 border-b">{movimiento.Motivo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
export default Kardex;
