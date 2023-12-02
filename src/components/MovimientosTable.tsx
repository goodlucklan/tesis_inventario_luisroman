// MovimientosTable.tsx
import React, { useEffect, useState } from "react";
import {
  doc,
  deleteDoc,
  collection,
  updateDoc,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { TailSpin } from "react-loader-spinner";
interface Movimiento {
  id: string;
  Producto: string;
  Tipo_Movimiento: string;
  Cantidad: string;
  Categoria: string;
  Fecha: string;
  Locacion: string;
  Aprobacion: false;
}

interface MovimientosTableProps {
  movimientos: Movimiento[];
}

const MovimientosTable: React.FC<MovimientosTableProps> = ({ movimientos }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
    });

    // La función de limpieza se ejecuta al desmontar el componente
    return () => unsubscribe();
  }, []);

  const updateMove = async (id: any, move: any) => {
    setIsLoading(true);
    const movimientoRef = collection(db, "Movimiento");
    const productosRef = collection(db, "Productos");
    const snapshot = await getDocs(productosRef);
    const elementosProductos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const docRef = doc(movimientoRef, id);
    const kardex = collection(db, "Kardex");
    const costoTotalProductos = elementosProductos.reduce(
      (acc, prod: any) => acc + parseInt(prod.costo) * parseInt(prod.cantidad),
      0
    );
    await addDoc(kardex, {
      totalProductos: elementosProductos.length,
      costoProductos: costoTotalProductos,
    });
    await updateDoc(docRef, {
      Aprobacion: true,
      Usuario: {
        nombre: currentUser?.displayName,
        correo: currentUser?.email,
      },
    });
    setIsLoading(false);
  };
  const deleteMove = async (id: any, cantidad: any, nombreProducto: any) => {
    try {
      setIsLoading(true);
      const q = await query(
        collection(db, "Productos"),
        where("nombre", "==", nombreProducto)
      );
      const querySnapshot = await getDocs(q);

      const productosEncontrados: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const collectionRef = await collection(db, "Productos");
      const docRef = doc(collectionRef, productosEncontrados[0].id);
      await updateDoc(docRef, {
        cantidad: `${
          parseInt(productosEncontrados[0]?.cantidad) + parseInt(cantidad)
        }`,
      });
      const movimientoRef = collection(db, "Movimiento");
      const docRef2 = doc(movimientoRef, id);
      await deleteDoc(docRef2);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al agregar el producto a Firestore:", error);
    }
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
      {isLoading ? (
        <div className="align-middle">
          <TailSpin color="blue" width={200} />
          <h3 className="text-xl font-bold mb-4 text-blue-950 text-center">
            Actualizando el movimiento
          </h3>
        </div>
      ) : (
        <div className="mx-auto text-black overflow-x-auto h-96 max-w-screen-lg">
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
                <th className="py-2 px-4 border-b">Aprobar movimiento</th>
                <th className="py-2 px-4 border-b">Eliminar movimiento</th>
              </tr>
            </thead>
            <tbody>
              {movimientos.map((move) => (
                <tr key={move.id} className="text-center">
                  <td className="py-2 px-4 border-b">{move.Producto}</td>
                  <td className="py-2 px-4 border-b">{move.Tipo_Movimiento}</td>
                  <td className="py-2 px-4 border-b">{move.Cantidad}</td>
                  <td className="py-2 px-4 border-b">{move.Categoria}</td>
                  <td className="py-4 px-12 border-b">{move.Fecha}</td>
                  <td className="py-2 px-4 border-b">{move.Locacion}</td>
                  <td className="py-2 px-4 border-b">
                    {move.Aprobacion ? (
                      <button
                        type="button"
                        disabled
                        className="focus:outline-none text-white bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                      >
                        Aprobado
                      </button>
                    ) : (
                      <button
                        onClick={() => updateMove(move.id, move)}
                        type="button"
                        className="focus:outline-none text-white bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                      >
                        Aprobar
                      </button>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      disabled={move.Aprobacion}
                      onClick={() =>
                        deleteMove(move.id, move.Cantidad, move.Producto)
                      }
                      type="button"
                      className="focus:outline-none text-white bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MovimientosTable;
