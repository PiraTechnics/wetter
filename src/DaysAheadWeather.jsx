/* eslint-disable react/prop-types */
import { Container, Row, Col, Image } from "react-bootstrap";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";

function DaysAheadWeather({ data, units }) {
  const days = data.forecast.forecastday.map((day) => (
    <Col key={day.date_epoch} style={{ maxWidth: "150px" }}>
      <Row>
        <Col className="fw-semibold text-decoration-underline">
          {new Date(day.date).toDateString()}
        </Col>
      </Row>
      <Row>
        <Col>
          <Image
            src={day.day.condition.icon}
            alt={day.day.condition.text}
            style={{ maxWidth: "64px" }}
          ></Image>
        </Col>
      </Row>
      <Row>
        <Col className="text-danger">
          <BsArrowUp />
          {day.day["maxtemp_" + units]}°
        </Col>
        <Col className="text-primary">
          <BsArrowDown />
          {day.day["mintemp_" + units]}°
        </Col>
      </Row>
    </Col>
  ));

  return (
    <>
      <Container fluid className="bg-info-subtle border rounded">
        <Row>
          <Col xs={12} className="fs-5 text-decoration-underline">
            Next {days.length} Days
          </Col>
        </Row>
        <Row className="justify-content-center mb-2">{days}</Row>
      </Container>
    </>
  );
}

export default DaysAheadWeather;
