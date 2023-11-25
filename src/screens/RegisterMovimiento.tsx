import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const RegisterMovimiento: React.FC = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [tipoMovimiento, setTipoMovimiento] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [locacion, setLocacion] = useState("");

  // Obtener productos al cargar el componente
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

  // Manejar cambios en la selección de producto
  const handleProductoChange = async (productoId: string) => {
    const productoDocRef = doc(db, "Productos", productoId);
    const productoDoc = await getDoc(productoDocRef);
    if (productoDoc.exists()) {
      const productoData = productoDoc.data();
      setProductoSeleccionado(productoData.nombre);
      setCategoria(productoData.categoria);
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setTipoMovimiento(value);
  };
  const handleInputChange2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLocacion(value);
  };
  const handleCantidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCantidad(/^\d+$/.test(value) || value === "" ? value : cantidad);
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      productoSeleccionado,
      tipoMovimiento,
      cantidad,
      categoria,
      locacion,
    });
    try {
      const movimientoRef = collection(db, "Movimiento");
      await addDoc(movimientoRef, {
        Producto: productoSeleccionado,
        Tipo_Movimiento: tipoMovimiento,
        Cantidad: cantidad,
        Categoria: categoria,
        Locacion: locacion,
        Fecha: new Date().toDateString(),
      });
      setCantidad("");
      setCategoria("");
      setLocacion("");
      setProductoSeleccionado("");
      setTipoMovimiento("");
    } catch (error) {
      console.error("Error al agregar el producto a Firestore:", error);
    }

    // Aquí puedes hacer lo que necesites con los datos (enviar a Firebase, etc.)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container mx-auto p-4 text-black">
        <h1 className="text-2xl font-bold mb-4">Registro de Movimiento</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="producto"
              className="block text-sm font-semibold mb-1"
            >
              Producto
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
                <option key={producto.id} value={producto.id}>
                  {producto.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="tipoMovimiento"
              className="block text-sm font-semibold mb-1"
            >
              Tipo de Movimiento
            </label>
            <select
              id="tipoMovimiento"
              name="tipoMovimiento"
              value={tipoMovimiento}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Selecciona...</option>
              <option value="entrada">Entrada</option>
              <option value="salida">Salida</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="cantidad"
              className="block text-sm font-semibold mb-1"
            >
              Cantidad
            </label>
            <input
              onChange={handleCantidadChange}
              type="text"
              id="cantidad"
              name="cantidad"
              value={cantidad}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="categoria"
              className="block text-sm font-semibold mb-1"
            >
              Categoría
            </label>
            <input
              type="text"
              id="categoria"
              name="categoria"
              value={categoria}
              disabled
              className="w-full p-2 border rounded bg-gray-200"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="locacion"
              className="block text-sm font-semibold mb-1"
            >
              Locación
            </label>
            <select
              id="locacion"
              name="locacion"
              value={locacion}
              onChange={handleInputChange2}
              className="w-full p-2 border rounded"
            >
              <option value="" disabled selected>
                Selecciona una locación
              </option>
              <option value="bodega">bodega</option>
              <option value="almacen">almacen</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Registrar Movimiento
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterMovimiento;
