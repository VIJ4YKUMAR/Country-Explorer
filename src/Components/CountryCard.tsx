import Country from "../types/countryCardType";
import { Link } from "react-router-dom";

const CountryCard = ({ data }: { data?: Country }) => {
  const { name, flags, capital, region, languages } = data || {};

  const spokenLanguages = Object.values(languages || {});

  const countryCapital = Object.values(capital || []);

  return (
    <Link to={`/${name?.common}`}>
      <div className="flex items-center space-x-8 rounded-lg border-white/40 p-2 bg-white/30 backdrop-blur-md shadow-md hover:shadow-lg">
        <div className="w-1/3">
          <img className="rounded-lg w-full h-auto sm:max-h-24 object-cover" src={flags?.svg} alt="flag" />
        </div>
        <div className="font-mono">
          <p>{name?.common}</p>
          <p>Capital: {countryCapital[0]}</p>
          <p>Region: {region}</p>
          <p>Language:{spokenLanguages[0]}</p>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
