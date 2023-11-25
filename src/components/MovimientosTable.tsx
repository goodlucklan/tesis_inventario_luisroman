// MovimientosTable.tsx
import React from "react";
interface Movimiento {
  id: string;
  Producto: string;
  Tipo_Movimiento: string;
  Cantidad: number;
  Categoria: string;
  Fecha: string;
  Locacion: string;
}

interface MovimientosTableProps {
  movimientos: Movimiento[];
}

const MovimientosTable: React.FC<MovimientosTableProps> = ({ movimientos }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto text-black overflow-x-auto">
        <h2 className="mt-8 text-2xl font-bold mb-4">Tabla de Movimientos</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Producto</th>
              <th className="py-2 px-4 border-b">Tipo de Movimiento</th>
              <th className="py-2 px-4 border-b">Cantidad</th>
              <th className="py-2 px-4 border-b">Categoría</th>
              <th className="py-2 px-4 border-b">Fecha</th>
              <th className="py-2 px-4 border-b">Locación</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.map((move) => (
              <tr key={move.id}>
                <td className="py-2 px-4 border-b">{move.Producto}</td>
                <td className="py-2 px-4 border-b">{move.Tipo_Movimiento}</td>
                <td className="py-2 px-4 border-b">{move.Cantidad}</td>
                <td className="py-2 px-4 border-b">{move.Categoria}</td>
                <td className="py-4 px-12 border-b">{move.Fecha}</td>
                <td className="py-2 px-4 border-b">{move.Locacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovimientosTable;
