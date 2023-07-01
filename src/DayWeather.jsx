/* eslint-disable react/prop-types */
import { Container, Row, Col } from "react-bootstrap";

function DayWeather({ data, units }) {
  const tempStats = {
    high: data.forecast.forecastday[0].day["maxtemp_" + units],
    low: data.forecast.forecastday[0].day["mintemp_" + units],
    avg: data.forecast.forecastday[0].day["avgtemp_" + units],
  };

  const dayForecast = data.forecast.forecastday[0].day;

  function formatDate(dateString) {
    var options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    //split datestring into pieces because JS date is partcular
    const dateArr = dateString.split("-");
    return new Date(dateArr[0], dateArr[1], dateArr[2]).toLocaleDateString(
      "en-us",
      options
    );
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
          <Col xs={4}>
            <div className="text-decoration-underline">High</div>
            <span className="fw-bold">{tempStats.high}°</span>
          </Col>
          <Col xs={4}>
            <div className="text-decoration-underline">Low</div>
            <span className="fw-bold">{tempStats.low}°</span>
          </Col>
          <Col xs={4}>
            <div className="text-decoration-underline">Avg</div>
            <span className="fw-bold">{tempStats.avg}°</span>
          </Col>
          {/*           <Col
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
          </Col> */}
        </Row>
        <Row className="text-center">
          <Col xs={6}>
            <span className="text-decoration-underline">Humidity</span>
            <div className="fw-bold">{dayForecast.avghumidity}%</div>
          </Col>
          <Col xs={6}>
            <span className="text-decoration-underline">Precipitation</span>
            <div className="fw-bold">{dayForecast.daily_chance_of_rain}%</div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DayWeather;
