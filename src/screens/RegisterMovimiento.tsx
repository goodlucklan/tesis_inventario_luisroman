import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import toast, { Toaster } from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";

const RegisterMovimiento: React.FC = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [tipoMovimiento, setTipoMovimiento] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [locacion, setLocacion] = useState("");
  const [motivo, setMotivo] = useState("");
  const [dataProductos, setDataProductos] = useState<any>();
  const [isloading, setisLoading] = useState(false);

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
    console.log("productoId", productoId);
    const productoDocRef = doc(db, "Productos", productoId);
    const productoDoc = await getDoc(productoDocRef);
    if (productoDoc.exists()) {
      const productoData = productoDoc.data();
      setDataProductos({ productoId, ...productoData });
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
  const notify = () => toast("Movimiento registrado correctamente");
  const notify2 = () =>
    toast("No puedes sacar mas productos de los que existen registrados");

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setisLoading(true);
      const movimientoRef = collection(db, "Movimiento");
      const getCantidadProducto = parseInt(dataProductos.cantidad);
      if (
        tipoMovimiento === "salida" &&
        parseInt(cantidad) > getCantidadProducto
      ) {
        notify2();
        setisLoading(false);
        return;
      }
      const collectionRef = await collection(db, "Productos");
      const docRef = doc(collectionRef, dataProductos.productoId);
      await addDoc(movimientoRef, {
        Producto: productoSeleccionado,
        Tipo_Movimiento: tipoMovimiento,
        Cantidad: cantidad,
        Categoria: categoria,
        Locacion: locacion,
        Motivo: motivo,
        Aprobacion: false,
        Fecha: new Date().toDateString(),
      });

      await updateDoc(docRef, {
        cantidad: `${getCantidadProducto - parseInt(cantidad)}`,
      });

      setCantidad("");
      setCategoria("");
      setLocacion("");
      setProductoSeleccionado("");
      setTipoMovimiento("");
      setMotivo("");
      setisLoading(false);
      notify();
    } catch (error) {
      console.error("Error al agregar el producto a Firestore:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      {isloading ? (
        <div className="align-middle">
          <TailSpin color="blue" width={200} />
          <h3 className="text-xl font-bold mb-4 text-blue-950 text-center">
            Estamos registrando el movimiento
          </h3>
        </div>
      ) : (
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
                placeholder="Ingrese la cantidad"
                value={cantidad}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="motivo"
                className="block text-sm font-semibold mb-1"
              >
                Motivo
              </label>
              <input
                onChange={(e: any) => setMotivo(e.target.value)}
                type="text"
                id="motivo"
                name="cantidad"
                placeholder="Ingrese el motivo de entrada o salida"
                value={motivo}
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
                <option value="tienda">tienda</option>
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
      )}
    </div>
  );
};

export default RegisterMovimiento;
