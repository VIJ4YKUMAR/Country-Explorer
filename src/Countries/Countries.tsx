import CountryCard from "../Components/CountryCard";
import Country from "../types/countryCardType";
import { useQuery } from "@tanstack/react-query";

const API_URL = "https://restcountries.com/v3.1/all";

const Countries = () => {
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
    data: allCountries,
  } = useQuery<Country[], Error>({
    queryKey: ["countries"],
    queryFn: async () => {
      const data = await fetchCountries();
      return data;
    },
  });

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <p className="font-mono font-extrabold text-xl text-indigo-700">Loading...</p>
      <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
    </div>
  ) : (
    <>
      <div className="mb-5 font-mono">
        <p className="font-extralight text-center text-3xl">All Countries</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
        {allCountries ? (
          allCountries.length > 0 ? (
            allCountries.map((country) => (
              <CountryCard key={country.name.common} data={country} />
            ))
          ) : (
            <div>No countries found</div>
          )
        ) : (
          <div>No data available</div>
        )}
      </div>
    </>
  );
};

export default Countries;
