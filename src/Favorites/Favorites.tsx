import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Store/Store";
import { removeFromFavorites } from "../Countries/countrySlice";
import CountryCard from "../Components/CountryCard";
import { Country } from "../types/countryCardType";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.countries.favorites
  );

  const handleRemoveFromFavorites = (country: Country) => {
    dispatch(removeFromFavorites(country));
  };

  return (
    <>
      <div className="mb-5 font-mono">
        <p className="font-extralight text-center text-3xl">Favorites</p>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {favorites.map((country) => (
            <CountryCard
              key={country.name.common}
              isFavorite={true}
              data={country}
              onRemoveFromFavorites={handleRemoveFromFavorites}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-[60vh] sm:h-screen font-mono text-lg text-gray-600">
          No favorites added yet
        </div>
      )}
    </>
  );
};

export default Favorites;
