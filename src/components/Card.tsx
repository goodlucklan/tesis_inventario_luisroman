import React from "react";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  goTo: (e: any) => void;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  buttonText,
  goTo,
}) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
      <img className="w-full" src={imageUrl} alt={`Imagen de ${title}`} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 py-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={goTo}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;
