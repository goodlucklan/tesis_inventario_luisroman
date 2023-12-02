import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const Kardex: React.FC = () => {
  const [productos, setProductos] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [precioUnitario, setPrecioUnitario] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");

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
    const obtenerMovimientos = async () => {
      if (productoSeleccionado) {
        const productoActual: any = productos.filter(
          (x: any) => x.nombre === productoSeleccionado
        );
        console.log("productoActual", productoActual);
        const movimientosQuery = query(
          collection(db, "Movimiento"),
          where("Producto", "==", productoSeleccionado)
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
    console.log(precioUnitario);
  }, [productoSeleccionado]);

  const handleProductoChange = async (productoId: string) => {
    setProductoSeleccionado(productoId);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container mx-auto p-4 text-black">
        <h1 className="text-2xl font-bold mb-4">Historial de Movimientos</h1>
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
                  <th className="py-2 px-4 border-b">Precio del Producto</th>
                  <th className="py-2 px-4 border-b">Valor Total</th>
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
                      {precioUnitario && precioUnitario}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {precioUnitario && movimiento.Cantidad * precioUnitario}
                    </td>
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
