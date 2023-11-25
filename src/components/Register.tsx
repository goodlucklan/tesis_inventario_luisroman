import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
const RegistroForm: React.FC = () => {
  const [categoria, setCategoria] = useState<string>("");
  const [costo, setCosto] = useState<number | string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");
  const [talla, setTalla] = useState<string>("");

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoria = e.target.value;
    setCategoria(selectedCategoria);

    // Si la categoría seleccionada es "vestido", borramos la talla
    if (selectedCategoria === "vestido") {
      setTalla("");
    }
  };

  const handleCostoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCosto(/^\d*\.?\d*$/.test(value) || value === "" ? value : costo);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productosRef = collection(db, "Productos");
      const nuevoProductoRef = await addDoc(productosRef, {
        categoria,
        costo,
        descripcion,
        nombre,
        talla,
      });
      console.log("Producto agregado con ID:", nuevoProductoRef.id);
      setCategoria("");
      setCosto("");
      setDescripcion("");
      setNombre("");
      setTalla("");
    } catch (error) {
      console.error("Error al agregar el producto a Firestore:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Categoría:
          <select
            value={categoria}
            onChange={handleCategoriaChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Selecciona...</option>
            <option value="tela">Tela</option>
            <option value="vestido">Vestido</option>
          </select>
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Costo:
          <input
            type="text"
            value={costo}
            onChange={handleCostoChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Descripción:
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>

        {categoria === "vestido" && (
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Talla:
            <input
              type="text"
              value={talla}
              onChange={(e) => setTalla(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegistroForm;
