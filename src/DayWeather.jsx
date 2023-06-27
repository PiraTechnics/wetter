/* eslint-disable react/prop-types */
import {
  Container,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { useState } from "react";

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

  const [tempStats, setTempStats] = useState(tempStats_f);
  const handleChange = (val) => {
    if (val == "c") {
      setTempStats(tempStats_c);
    } else {
      //farenheit by default
      setTempStats(tempStats_f);
    }
  };

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
        <Row className="fs-5">
          <Col xs={4} className="fw-semibold">
            Forecast:
          </Col>
          <Col className="text-start text-decoration-underline">
            {formatDate(data.forecast.forecastday[0].date)}
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <span>High {tempStats.high}</span>
          </Col>
          <Col xs={3}>
            <span>Low {tempStats.low}</span>
          </Col>
          <Col xs={3}>
            <span>Avg {tempStats.avg}</span>
          </Col>
          <Col xs={3}>
            <ToggleButtonGroup
              type="radio"
              name="dayTemps"
              defaultValue={"f"}
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
      </Container>
    </>
  );
}

export default DayWeather;
