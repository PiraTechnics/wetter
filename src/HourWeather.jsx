/* eslint-disable react/prop-types */
import { Container, Row, Col, Image } from "react-bootstrap";

function HourWeather({ data, units }) {
  const hourlyForecast = data.forecast.forecastday[0].hour.concat(
    data.forecast.forecastday[1].hour
  );
  const currentTime = new Date();

  let forecastHours = [];
  hourlyForecast.forEach((hour) => {
    if (
      currentTime.getTime() < new Date(hour.time).getTime() &&
      forecastHours.length < 12
    ) {
      //Only add forecast hours for the future, max at 12
      forecastHours.push(hour);
    }
  });

  return (
    <>
      <Container fluid className="bg-info-subtle border rounded">
        <Row>
          <Col xs={12} className="fs-5 text-decoration-underline">
            12-Hour Forecast
          </Col>
          {forecastHours.map((hour, index) => (
            <Col xs={3} key={index} className="">
              <div className="fw-semibold pt-2">
                {new Date(hour.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <Image
                fluid
                src={hour.condition.icon}
                alt={hour.condition.text}
                style={{ maxWidth: "45px" }}
              ></Image>
              {hour["temp_" + units]}°
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default HourWeather;
