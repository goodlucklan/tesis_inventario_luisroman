// RegistroProducto.js
import React, { useState } from "react";

const RegistroProducto = () => {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [costoInicial, setCostoInicial] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para enviar los datos a tu servidor o realizar otras acciones
    console.log("Datos enviados:", { codigo, nombre, costoInicial, categoria });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Registro de Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="codigo"
            className="block text-sm font-medium text-gray-600"
          >
            Código:
          </label>
          <input
            type="text"
            id="codigo"
            name="codigo"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-600"
          >
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="costoInicial"
            className="block text-sm font-medium text-gray-600"
          >
            Costo Inicial:
          </label>
          <input
            type="text"
            id="costoInicial"
            name="costoInicial"
            value={costoInicial}
            onChange={(e) => setCostoInicial(e.target.value)}
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
          <input
            type="text"
            id="categoria"
            name="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
        >
          Registrar Producto
        </button>
      </form>
    </div>
  );
};
export default RegistroProducto;
