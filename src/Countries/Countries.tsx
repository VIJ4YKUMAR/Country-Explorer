import { useEffect, useState } from "react";
import CountryCard from "../Components/CountryCard";
import { Country } from "../types/countryCardType";
import { useQuery } from "@tanstack/react-query";

const API_URL = "https://restcountries.com/v3.1/all";

const Countries = () => {
  const [visibleCount, setVisibleCount] = useState(51);
  const [favorites, setFavorites] = useState<Country[]>([]);
  const increment = 30;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + increment);
  };

  const fetchCountries = async (): Promise<Country[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("failed to fetch countries");
    }
    return response.json();
  };

  const {
    isError,
    error,
    isLoading,
    data: allCountries = [],
  } = useQuery<Country[], Error>({
    queryKey: ["countries"],
    queryFn: async () => {
      const data = await fetchCountries();
      return data;
    },
  });

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleAddToFavorites = (country: Country) => {
    if (
      !favorites.some(
        (favorite) => favorite.name.common === country.name.common
      )
    ) {
      const updatedFavorites = [...favorites, country];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const handleRemoveFromFavorites = (country: Country) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.name.common !== country.name.common
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <p className="font-mono font-extrabold text-xl text-indigo-700">
        Loading...
      </p>
      <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
    </div>
  ) : (
    <>
      <div className="mb-5 font-mono">
        <p className="font-extralight text-center text-3xl">All Countries</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
        {allCountries.length > 0 ? (
          allCountries
            .slice(0, visibleCount)
            .map((country) => (
              <CountryCard
                key={country.name.common}
                isFavorite={favorites.some(
                  (fav) => fav.name.common === country.name.common
                )}
                onAddToFavorites={handleAddToFavorites}
                onRemoveFromFavorites={handleRemoveFromFavorites}
                data={country}
              />
            ))
        ) : (
          <div>No countries found</div>
        )}
      </div>
      {visibleCount < allCountries?.length && (
        <div className="flex flex-col items-center justify-center mt-10">
          <button
            onClick={handleShowMore}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Show More
          </button>
        </div>
      )}
    </>
  );
};

export default Countries;
