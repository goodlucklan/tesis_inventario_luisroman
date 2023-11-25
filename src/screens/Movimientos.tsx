// App.tsx
import React, { useState } from "react";
import MovimientosTable from "../components/MovimientosTable";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Movimientos: React.FC = () => {
  const [movimientosData, setMovimientosData] = useState([]);
  React.useEffect(() => {
    const obtenerProductos = async () => {
      const productosSnapshot = await getDocs(collection(db, "Movimiento"));
      const productosData: any = productosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMovimientosData(productosData);
    };

    obtenerProductos();
  }, []);

  return <MovimientosTable movimientos={movimientosData} />;
};

export default Movimientos;
