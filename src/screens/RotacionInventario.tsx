// VentaForm.js
import React, { useState } from "react";

export const VentaForm: React.FC = () => {
  const [producto, setProducto] = useState("");
  const [tipoMovimiento, setTipoMovimiento] = useState("");
  const [detalle, setDetalle] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para enviar los datos a tu servidor o realizar otras acciones
    console.log("Datos enviados:", {
      producto,
      tipoMovimiento,
      detalle,
      categoria,
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Registro de Venta</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="producto"
            className="block text-sm font-medium text-gray-600"
          >
            Producto:
          </label>
          <select
            id="producto"
            name="producto"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md text-black"
            required
          >
            {/* Opciones para el select de Producto */}
            <option value="producto1">Producto 1</option>
            <option value="producto2">Producto 2</option>
            <option value="producto3">Producto 3</option>
            {/* Agrega más opciones según sea necesario */}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="tipoMovimiento"
            className="block text-sm font-medium text-gray-600"
          >
            Tipo de Movimiento:
          </label>
          <select
            id="tipoMovimiento"
            name="tipoMovimiento"
            value={tipoMovimiento}
            onChange={(e) => setTipoMovimiento(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md text-black"
            required
          >
            {/* Opciones para el select de Tipo de Movimiento */}
            <option value="entrada">Entrada</option>
            <option value="salida">Salida</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="detalle"
            className="block text-sm font-medium text-gray-600"
          >
            Detalle:
          </label>
          <input
            type="text"
            id="detalle"
            name="detalle"
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="categoria"
            className="block text-sm font-medium text-gray-600"
          >
            Categoría:
          </label>
          <select
            id="categoria"
            name="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md text-black"
            required
          >
            {/* Opciones para el select de Categoría */}
            <option value="categoria1">Categoría 1</option>
            <option value="categoria2">Categoría 2</option>
            <option value="categoria3">Categoría 3</option>
            {/* Agrega más opciones según sea necesario */}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
        >
          Registrar Venta
        </button>
      </form>
    </div>
  );
};
