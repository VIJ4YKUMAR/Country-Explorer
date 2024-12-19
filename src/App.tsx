import Home from "./Home/Home";
import Layout from "./Layout/Layout";
import Countries from "./Countries/Countries";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favorites from "./Favorites/Favorites";
import CountryDetails from "./CountryDetails/CountryDetails";

function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-countries" element={<Countries />} />
          <Route path="/favorite-countries" element={<Favorites />} />
          <Route path="/country/:countryName" element={<CountryDetails />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;
