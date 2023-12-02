import React, { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { TailSpin } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";

const RegistroForm: React.FC = () => {
  const [categoria, setCategoria] = useState<string>("");
  const [costo, setCosto] = useState<number | string>("");
  const [cantidad, setCantidad] = useState<number | string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");
  const [talla, setTalla] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
    });

    // La función de limpieza se ejecuta al desmontar el componente
    return () => unsubscribe();
  }, []);

  const notify = () => toast("Producto agregado correctamente");

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

  const handleCantidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCantidad(/^\d*\.?\d*$/.test(value) || value === "" ? value : costo);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const productosRef = collection(db, "Productos");
      await addDoc(productosRef, {
        categoria,
        costo,
        descripcion,
        nombre,
        talla,
        cantidad,
        usuario: {
          nombre: currentUser?.displayName,
          correo: currentUser?.email,
        },
      });
      setCategoria("");
      setCosto("");
      setDescripcion("");
      setNombre("");
      setTalla("");
      setCantidad("");
      setLoading(false);
      notify();
    } catch (error) {
      console.error("Error al agregar el producto a Firestore:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      {loading ? (
        <div className="align-middle">
          <TailSpin color="blue" width={200} />
          <h3 className="text-xl font-bold mb-4 text-blue-950 text-center">
            Estamos registrando el producto
          </h3>
        </div>
      ) : (
        <div className="w-full mx-auto pt-12 max-w-screen-lg shadow-xl">
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
          <form
            onSubmit={handleSubmit}
            className="w-full mx-auto  max-w-screen-lg bg-white shadow-md px-8 pb-8 py-6"
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nombre:
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
            <div className="mb-4">
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
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Costo unitario:
                <input
                  type="text"
                  value={costo}
                  onChange={handleCostoChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Cantidad:
                <input
                  type="text"
                  value={cantidad}
                  onChange={handleCantidadChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Descripción:
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>

            {categoria === "vestido" && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold">
                  Talla:
                  <input
                    type="text"
                    value={talla}
                    onChange={(e) => setTalla(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </label>
              </div>
            )}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4"
            >
              Registrar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegistroForm;
