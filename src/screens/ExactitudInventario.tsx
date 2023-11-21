// Pantalla.js
import React from "react";

const PantallaProducto: React.FC = () => {
  const data = [
    { fecha: "2023-10-27", detalle: "Entrada", producto: "Producto A" },
    { fecha: "2023-10-28", detalle: "Salida", producto: "Producto B" },
    { fecha: "2023-10-29", detalle: "Ajuste", producto: "Producto C" },
    // Agrega más datos según sea necesario
  ];

  const handleEdit = (producto: any) => {
    // Lógica para editar el producto
    console.log("Editar producto:", producto);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 text-black">
      <h2 className="text-2xl font-semibold mb-4">Tabla de Productos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Fecha</th>
              <th className="px-4 py-2 border-b">Detalle/Categoría</th>
              <th className="px-4 py-2 border-b">Producto</th>
              <th className="px-4 py-2 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((producto, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-b">{producto.fecha}</td>
                <td className="px-4 py-2 border-b">{producto.detalle}</td>
                <td className="px-4 py-2 border-b">{producto.producto}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                    onClick={() => handleEdit(producto)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PantallaProducto;
