import { Container, Row, Col } from "react-bootstrap";
import CurrentWeather from "./CurrentWeather";
import DayWeather from "./DayWeather";
import HourWeather from "./HourWeather";
import DaysAheadWeather from "./DaysAheadWeather";

/* eslint-disable react/prop-types */
function Dashboard({ data, units }) {
  return (
    <Container fluid className="px-0">
      {data.location ? (
        <>
          <Row className="g-2 mb-2" style={{ minWidth: "250px" }}>
            <Col xs={12} sm={6}>
              <CurrentWeather data={data} units={units} />
            </Col>
            <Col xs={12} sm={6}>
              <DayWeather data={data} units={units} />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <HourWeather data={data} units={units} />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <DaysAheadWeather data={data} units={units} />
            </Col>
          </Row>
        </>
      ) : (
        <Row></Row>
      )}
    </Container>
  );
}

export default Dashboard;
