import React, { useEffect, useState } from "react";
import "./Search.css";
import "../../App.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useData } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const { data } = useData();
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("Filter by region");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = data.filter(
      (item) =>
        item.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedRegion === "Filter by region" ||
          item.region === selectedRegion)
    );
    setFilteredCountries(filtered);
  }, [data, searchTerm, selectedRegion]);

  const handleCountryClick = (item) => {
    console.log(item);
    navigate(`/detail/${item}`);
  };

  const formatPopulation = (population) => {
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    setTimeout(() => {
      setLoadingCountries(false);
    }, 1000);
  }, []);

  return (
    <>
      <form id="form">
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <AiOutlineSearch className="search-icon" />

        <select
          className="select"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option>Filter by region</option>
          <option>Africa</option>
          <option>Americas</option>
          <option>Asia</option>
          <option>Europe</option>
          <option>Oceania</option>
        </select>
      </form>

      <div className="container main-container">
        {loadingCountries ? (
          <h1>Loading...</h1>
        ) : (
          filteredCountries.map((item, index) => (
            <article
              key={index}
              onClick={() => handleCountryClick(item.name.common)}
            >
              <div className="image">
                <img src={item.flags.png} alt={item.name.common} />
              </div>
              <div className="info">
                <h3>{item.name.common}</h3>
                <p>
                  <strong>Population:</strong>{" "}
                  {formatPopulation(item.population)}
                </p>
                <p>
                  <strong>Region: </strong>
                  {item.region}
                </p>
                <p>
                  <strong>Capital:</strong> {item.capital}
                </p>
              </div>
            </article>
          ))
        )}
      </div>
    </>
  );
};

export default Search;
