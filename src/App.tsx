import Home from "./Home/Home";
import Layout from "./Layout/Layout";
import Countries from "./Countries/Countries";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-countries" element={<Countries />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;
