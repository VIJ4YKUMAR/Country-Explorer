import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../Countries/countrySlice";
import CountryCardType from "../types/countryCardType";
import { RootState } from "../Store/Store";
import { useNavigate } from "react-router-dom";

const MAX_FAVORITE_LIMIT = 5;

const CountryCard = (countryCardProps?: CountryCardType) => {
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.countries.favorites
  );

  const { data } = countryCardProps || {};
  const { name, flags, capital, region, languages } = data || {};
  const spokenLanguages = Object.values(languages || {});
  const countryCapital = Object.values(capital || []);

  const navigate = useNavigate();

  const isFavorite = favorites.some(
    (fav) => fav.name.common === data?.name.common
  );

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (data) {
      if (isFavorite) {
        dispatch(removeFromFavorites(data));
      } else {
        if (favorites?.length === MAX_FAVORITE_LIMIT) {
          return toast.error("maximum limit reached", {
            duration: 2000,
            position: "bottom-center",
            style: { background: "white" },
          });
        }
        dispatch(addToFavorites(data));
      }
    }
  };

  const handleCardClick = () => {
    navigate(`/country/${encodeURIComponent(data?.name?.common || "")}`, { state: { country: data } });
  };

  return (
    <div
      className="flex items-center justify-around space-x-8 rounded-lg border-white/40 p-2 bg-white/30 backdrop-blur-md shadow-md hover:shadow-lg cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="w-1/4 shadow-md rounded-lg">
        <img
          className="rounded-lg w-full h-auto sm:max-h-24 object-cover"
          src={flags?.svg}
          alt={`${name?.common} flag`}
        />
      </div>

      <div className="font-mono">
        <p>{name?.common}</p>
        <p>Capital: {countryCapital[0] || "N/A"}</p>
        <p>Region: {region || "N/A"}</p>
        <p>Language: {spokenLanguages[0] || "N/A"}</p>
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
      <Toaster />
    </div>
  );
};

export default CountryCard;
