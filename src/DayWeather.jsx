/* eslint-disable react/prop-types */
import {
  Container,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { useEffect, useState } from "react";

function DayWeather({ data }) {
  const tempStats_f = {
    high: data.forecast.forecastday[0].day.maxtemp_f,
    low: data.forecast.forecastday[0].day.mintemp_f,
    avg: data.forecast.forecastday[0].day.avgtemp_f,
  };
  const tempStats_c = {
    high: data.forecast.forecastday[0].day.maxtemp_c,
    low: data.forecast.forecastday[0].day.mintemp_c,
    avg: data.forecast.forecastday[0].day.avgtemp_c,
  };

  const dayForecast = data.forecast.forecastday[0].day;

  const [tempStats, setTempStats] = useState(tempStats_f);
  const handleChange = (val) => {
    if (val == "c") {
      setTempStats(tempStats_c);
    } else {
      //farenheit by default
      setTempStats(tempStats_f);
    }
  };

  //Query for xs screens, so we can toggle button verticality
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mQuery = window.matchMedia("(max-width: 340px)");
    setIsSmallScreen(mQuery.matches);

    function updateIsSmallScreen(e) {
      setIsSmallScreen(e.matches);
    }
    mQuery.addEventListener("change", updateIsSmallScreen);

    return () => mQuery.removeEventListener("change", updateIsSmallScreen);
  }, []);

  function formatDate(localTimeString) {
    var options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Date(localTimeString).toLocaleDateString([], options);
  }

  return (
    <>
      <Container
        style={{ minWidth: "35vw" }}
        className="bg-info-subtle border rounded py-2"
      >
        <Row className="fs-5 pb-1">
          <Col xs={4} className="fw-semibold">
            Forecast:
          </Col>
          <Col className="text-center text-decoration-underline">
            {formatDate(data.forecast.forecastday[0].date)}
          </Col>
        </Row>
        <hr className="mt-1 mb-2" />
        <Row className="pb-1">
          <Col xs={3}>
            <div className="text-decoration-underline">High</div>
            <span className="fw-bold">{tempStats.high}°</span>
          </Col>
          <Col xs={3}>
            <div className="text-decoration-underline">Low</div>
            <span className="fw-bold">{tempStats.low}°</span>
          </Col>
          <Col xs={3}>
            <div className="text-decoration-underline">Avg</div>
            <span className="fw-bold">{tempStats.avg}°</span>
          </Col>
          <Col
            xs={3}
            className="toggle-button-container d-flex align-items-center ps-0"
          >
            <ToggleButtonGroup
              className="toggle-button-group"
              type="radio"
              name="dayTemps"
              defaultValue={"f"}
              vertical={isSmallScreen}
              onChange={handleChange}
            >
              <ToggleButton
                size="sm"
                variant="outline-info"
                id="dayTempsF"
                value={"f"}
              >
                °F
              </ToggleButton>
              <ToggleButton
                size="sm"
                variant="outline-info"
                id="dayTempsC"
                value={"c"}
              >
                °C
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
        </Row>
        <Row className="text-start">
          <Col xs={6}>
            Average Humidity:{" "}
            <span className="fw-bold">{dayForecast.avghumidity}%</span>
          </Col>
          <Col xs={6}>
            Chance of Rain:{" "}
            <span className="fw-bold">{dayForecast.daily_chance_of_rain}%</span>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DayWeather;
