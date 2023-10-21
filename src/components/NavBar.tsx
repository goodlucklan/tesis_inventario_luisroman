import React from "react";

interface Props {
  user: any;
  handleLogout: () => void;
}
export const NavBar: React.FC<Props> = ({ user, handleLogout }) => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <a href="/" className="text-white text-xl font-bold">
            {`Bienvenido ${user?.displayName}`}
          </a>
          <ul>
            <li>
              <button
                className="bg-white text-blue-500 font-bold py-2 px-4 rounded"
                onClick={handleLogout}
              >
                Salir
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
