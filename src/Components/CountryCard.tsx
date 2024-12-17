import CountryCardType from "../types/countryCardType";
import { Link } from "react-router-dom";

const CountryCard = (countryCardProps?: CountryCardType) => {
  const { data, isFavorite, onAddToFavorites, onRemoveFromFavorites } =
    countryCardProps || {};

  const { name, flags, capital, region, languages } = data || {};

  const spokenLanguages = Object.values(languages || {});

  const countryCapital = Object.values(capital || []);

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (data) {
      isFavorite ? onRemoveFromFavorites?.(data) : onAddToFavorites?.(data);
    }
  };

  return (
    <Link to={`/${name?.common}`}>
      <div className="flex items-center space-x-8 rounded-lg border-white/40 p-2 bg-white/30 backdrop-blur-md shadow-md hover:shadow-lg">
        <div className="w-1/3 shadow-md rounded-lg">
          <img
            className="rounded-lg w-full h-auto sm:max-h-24 object-cover"
            src={flags?.svg}
            alt="flag"
          />
        </div>
        <div className="font-mono">
          <p>{name?.common}</p>
          <p>Capital: {countryCapital[0]}</p>
          <p>Region: {region}</p>
          <p>Language:{spokenLanguages[0]}</p>
        </div>
        <button
          className={`self-end ${isFavorite ? "text-red-500" : "text-gray-500"}`}
          onClick={handleFavoriteClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isFavorite ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
      </div>
    </Link>
  );
};

export default CountryCard;
