import { useAuth } from "../context/AuthContext";
import { NavBar } from "./NavBar";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
export function Home() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    navigate("/rotacion");
  };
  return (
    <>
      <NavBar handleLogout={handleLogout} user={user} />
      <div className="w-1/2 mx-auto mt-12 h-screen">
        <div className="flex flex-wrap justify-center h-auto">
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 p-4 bg-red-700">
            <Card
              title="Rotacion de inventarios"
              description="Rotacion de inventarios."
              imageUrl="https://elanalista.com/wp-content/uploads/2019/04/rotacion-inventarios-1024x576.jpg"
              buttonText="Registrar"
              goTo={handleSubmit}
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 p-4 bg-blue-700"></div>
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 p-4 bg-green-700"></div>
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 p-4 bg-purple-700"></div>
        </div>
      </div>
    </>
  );
}
