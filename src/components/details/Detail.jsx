import { useData } from "../../context/DataContext";
import { useParams, useNavigate } from "react-router-dom";
import "./Detail.css";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";

const Detail = () => {
  const { data } = useData();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formatPopulation = (population) => {
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleArrowClick = () => {
    window.history.back();
  };

  const handleBorderClick = (border) => {
    const borderCountry = data.find((country) => country.cca3 === border);
    const borderCommonName = borderCountry?.name.common || border;
    navigate(`/detail/${borderCommonName}`);
  };


  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
 

  return (
    <>
      <div className="detail-container">
        <div className="back" onClick={handleArrowClick}>
          <FaArrowLeft />
          <span>back</span>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          data &&
          data
            .filter((item) => item.name.common === id)
            .map((item, index) => (
              <article key={index} className="ct">
                <div className="image">
                  <img src={item.flags.png} alt={item.name.common} />
                </div>
                <div className="info-detail">
                  <div className="column">
                    <h2>{item.name.common}</h2>
                    <p>
                      <strong>Native Name:</strong> {item.name.common}
                    </p>
                    <p>
                      <strong>Population:</strong>{" "}
                      {formatPopulation(item.population)}
                    </p>
                    <p>
                      <strong>Region:</strong>
                      {item.region}
                    </p>
                    <p>
                      <strong>Sub Region: </strong>
                      {item.subregion}
                    </p>
                    <p>
                      <strong>Capital:</strong> {item.capital}
                    </p>
                  </div>
                  <div className="column">
                    <p>
                      <strong>Top Level Domain:</strong> {item.tld}
                    </p>
                    <p>
                      Languages:{" "}
                      {Object.values(item.languages).map((lang, langIndex) => (
                        <span key={langIndex}>
                          {lang}
                          {langIndex < Object.values(item.languages).length - 1
                            ? ", "
                            : ""}
                        </span>
                      ))}
                    </p>
                    <p>
                      Currencies:{" "}
                      {Object.values(item.currencies).map((curr, currIndex) => (
                        <span key={currIndex}>
                          {` " ${curr.symbol} "  ${curr.name}`}
                          {currIndex < Object.values(item.currencies).length - 1
                            ? ", "
                            : ""}
                        </span>
                      ))}
                    </p>

                    <p>
                      Borders:{" "}
                      {item.borders
                        ? Object.values(item.borders).map(
                            (border, borderIndex) => (
                              <span key={borderIndex}>
                                <button 
                                 style={{padding:"4px", borderRadius:"2px"}}
                                  onClick={() => handleBorderClick(border)}
                                >
                                 {data.find((country) => country.cca3 === border)?.name.common || border}
                                </button>
                                {borderIndex <
                                Object.values(item.borders).length - 1
                                  ? ", "
                                  : ""}
                              </span>
                            ) 
                          )
                        : ""}
                    </p>

                    <div>
                      maps:{" "}
                      {item.maps
                        ? Object.values(item.maps).map(
                            (map, mapIndex) => (
                              <span key={mapIndex}>
                                <a href={map} target="_blank" rel="noreferrer">
                                  {Object.values(item.maps).length > 1
                                    ? `map ${mapIndex + 1}`
                                    : "map"}
                                </a>
                                {mapIndex <
                                Object.values(item.maps).length - 1
                                  ? ", "
                                  : ""}
                              </span>
                            ) 
                          )
                        : ""}
                    </div>
                  </div>
                </div>
              </article>
            ))
        )}

      </div>
    </>
  );
};

export default Detail;
