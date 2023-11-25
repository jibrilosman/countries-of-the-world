import { useData } from "../../context/DataContext";
import { useParams } from "react-router-dom";
import "./Detail.css";
import { FaArrowLeft } from "react-icons/fa";

const Detail = () => {
  const { data } = useData();
  const { id } = useParams();

  const formatPopulation = (population) => {
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleArrowClick = () => {
    window.history.back();
  };

  return (
    <>
      <div className="detail-container">
        <div className="back" onClick={handleArrowClick}>
          <FaArrowLeft />
          <span>back</span>
        </div>

        {data &&
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
                      Borders:{" "}
                      {item.borders
                        ? Object.values(item.borders).map(
                            (border, borderIndex) => (
                              <span key={borderIndex}>
                                {border}
                                {borderIndex <
                                Object.values(item.borders).length - 1
                                  ? ", "
                                  : ""}
                              </span>
                            )
                          )
                        : ""}
                    </p>
                  </div>
                </div>
              </article>
            ))}
      </div>
    </>
  );
};

export default Detail;
