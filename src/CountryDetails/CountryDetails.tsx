import { Link, useLocation } from "react-router-dom";
import { Country } from "../types/countryCardType";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const CountryDetails = () => {
  const location = useLocation();
  const data = location?.state?.country as Country;

  const {
    area,
    capital,
    currencies,
    flag,
    continents,
    languages,
    name,
    population,
    region,
    capitalInfo,
    timezones,
    flags,
    unMember,
  } = data || {};

  const spokenLanguages = Object.values(languages);
  const capitalCoordinates = capitalInfo?.latlng || [];

  const Capitals = () => {
    return (
      <div className="flex md:text-2xl">
        <p className="mr-2">Capital:</p>
        {capital.length > 1 ? (
          capital.map((cap, index) => (
            <p key={cap}>
              {cap}
              {index === capital.length - 1 ? "" : ","}
            </p>
          ))
        ) : (
          <p>{capital[0]}</p>
        )}
      </div>
    );
  };

  const moneyAndSymbol = Object.values(currencies)[0];

  return data ? (
    <div className="w-full h-auto font-mono">
      <Link to="/all-countries" className="cursor-pointer">
        <button className="w-7 h-7">
          <ArrowLeftIcon />
        </button>
      </Link>
      <div className="flex gap-5 md:gap-20 mt-5 items-center">
        <img
          className="rounded-lg shadow-md w-1/3 object-cover"
          src={flags?.svg}
          alt={`${name?.common} flag`}
        />
        <div className="flex flex-col gap-y-2 md:text-2xl">
          <p className="font-bold md:font-extrabold font-mono text-xl md:text-6xl">
            {name?.common}
            {flag}
          </p>
          {unMember ? <p>Member of the United Nations</p> : ""}
        </div>
      </div>
      <div className=" flex flex-col gap-y-1">
        <div className="mt-10">
          <Capitals />
        </div>
        <div className="md:text-2xl">
          <p>Currency Name: {moneyAndSymbol.name}</p>
          <p>Currency Symbol: {moneyAndSymbol.symbol}</p>
        </div>
        <div className="flex flex-wrap md:text-2xl">
          <p className="mr-2">Languages:</p>
          {spokenLanguages.length > 1 ? (
            spokenLanguages.map((lang, index) => (
              <p key={lang}>
                {lang}
                {index === spokenLanguages.length - 1 ? "" : ", "}
              </p>
            ))
          ) : (
            <p>{spokenLanguages[0]}</p>
          )}
        </div>
        <div className="md:text-2xl mt-16">
          <p className="md:text-5xl mb-10">Geographical Information:</p>
          <p>Continent: {continents}</p>
          <p>Region: {region}</p>
          <p>Area: {area}</p>
          <p>Population: {population}</p>
          <p>
            Capital Info: {capitalCoordinates[0]}, {capitalCoordinates[1]}
            {`(lat, long)`}
          </p>
          <p>Time Zone: {timezones[0]}</p>
        </div>
      </div>
    </div>
  ) : (
    <p>No country data available!</p>
  );
};

export default CountryDetails;
